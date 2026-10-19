"""
Fútbol Libre Full HD — Enterprise Automated Match Synchronization Pipeline
Based on LIBREGOL_LIVE_19_SEP
Pulls live matches from:
1. Primary: Competitor JSON Mirror (https://agenda.futbollibrehd.com.pe/diaries.json)
2. Secondary Fallback: ESPN Global Public Scoreboard API (Zero-cost, Zero-key)

Automatically maintains:
- agenda-data.js (Live match array window.LIBREGOL_MATCHES)
- Deletes old matches (finished before yesterday)
- Adds fresh matches for today and upcoming dates
- Sorts matches (LIVE -> UPCOMING Today -> UPCOMING Tomorrow -> FINISHED)
- Compiles sitemap.xml
"""

import urllib.request
import json
import os
import re
import datetime
import unicodedata
import hashlib
import sys
import subprocess

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
AGENDA_URL = "https://agenda.futbollibrehd.com.pe/diaries.json"
OUTPUT_JS = os.path.join(BASE_DIR, "agenda-data.js")
SITEMAP_FILE = os.path.join(BASE_DIR, "sitemap.xml")

ESPN_LEAGUES = [
    {"code": "esp.1", "name": "LaLiga EA Sports", "flag": "img/flags/es.svg", "category": "espana", "channels": ["Movistar Plus+", "DAZN LaLiga", "ESPN Deportes", "Directo HD"]},
    {"code": "eng.1", "name": "Premier League", "flag": "img/flags/england.svg", "category": "europa", "channels": ["ESPN 1 HD", "DAZN 1", "Disney+ HD", "Directo HD"]},
    {"code": "eng.league_cup", "name": "EFL Cup", "flag": "img/flags/england.svg", "category": "europa", "channels": ["ESPN 2 HD", "Sky Sports", "Disney+ HD", "Directo HD"]},
    {"code": "ita.1", "name": "Serie A", "flag": "img/flags/it.svg", "category": "europa", "channels": ["ESPN 1 HD", "Star+ HD", "Disney+ Premium", "Directo HD"]},
    {"code": "uefa.champions", "name": "UEFA Champions League", "flag": "img/flags/europa.svg", "category": "europa", "channels": ["ESPN 1 HD", "Fox Sports 1 HD", "Movistar Liga de Campeones", "Directo HD"]},
    {"code": "uefa.europa", "name": "UEFA Europa League", "flag": "img/flags/europa.svg", "category": "europa", "channels": ["ESPN 2 HD", "Fox Sports 2 HD", "Disney+ HD", "Directo HD"]},
    {"code": "conmebol.libertadores", "name": "Copa Libertadores", "flag": "img/flags/trophy_libertadores.svg", "category": "conmebol", "channels": ["Fox Sports 1 HD", "ESPN 1 HD", "Telefe", "Directo HD"]},
    {"code": "conmebol.sudamericana", "name": "Copa Sudamericana", "flag": "img/flags/trophy_sudamericana.svg", "category": "conmebol", "channels": ["DSports HD", "DGO Streaming", "ESPN 3 HD", "Directo HD"]},
    {"code": "arg.1", "name": "Liga Profesional", "flag": "img/flags/ar.svg", "category": "argentina", "channels": ["ESPN Premium HD", "TNT Sports HD", "TyC Sports", "Directo HD"]},
    {"code": "mex.1", "name": "Liga MX", "flag": "img/flags/mx.svg", "category": "mexico", "channels": ["TUDN En Vivo", "ViX Premium", "Canal 5 HD", "Directo HD"]},
    {"code": "col.1", "name": "Liga BetPlay", "flag": "img/flags/co.svg", "category": "colombia", "channels": ["Win Sports+", "Win Sports Online", "Directo HD"]},
    {"code": "bra.1", "name": "Brasileirão", "flag": "img/flags/br.svg", "category": "brasil", "channels": ["Premiere HD", "Globo", "SporTV", "Directo HD"]},
    {"code": "chi.1", "name": "Primera División Chile", "flag": "img/flags/cl.svg", "category": "chile", "channels": ["TNT Sports Chile", "Estadio TNT", "Directo HD"]},
    {"code": "per.1", "name": "Liga 1 MAX", "flag": "img/flags/pe.svg", "category": "peru", "channels": ["Liga 1 MAX HD", "Liga 1 Play", "Gol Perú HD", "Directo HD"]},
    {"code": "uru.1", "name": "Primera División Uruguay", "flag": "img/flags/uy.svg", "category": "uruguay", "channels": ["VTV Plus", "Star+ HD", "Disney+ HD", "Directo HD"]},
    {"code": "bol.1", "name": "División Profesional Bolivia", "flag": "img/flags/bo.svg", "category": "bolivia", "channels": ["Tigo Sports Bolivia", "Directo HD"]}
]

TEAM_LOGOS = {
    "boca juniors": "img/teams/boca.svg",
    "boca": "img/teams/boca.svg",
    "river plate": "img/teams/river.svg",
    "river": "img/teams/river.svg",
    "real madrid": "img/teams/realmadrid.svg",
    "barcelona": "img/teams/barcelona.svg",
    "manchester city": "img/teams/mancity.svg",
    "liverpool": "img/teams/liverpool.svg",
    "america": "img/teams/america.svg",
    "chivas": "img/teams/chivas.svg",
    "flamengo": "img/teams/flamengo.svg",
    "palmeiras": "img/teams/palmeiras.svg",
    "universitario": "img/teams/universitario.svg",
    "alianza lima": "img/teams/alianza.svg",
    "alianza": "img/teams/alianza.svg",
    "ldu quito": "img/teams/ldu.svg"
}

def clean_slugify(text):
    normalized = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('utf-8')
    text = normalized.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def get_logo(team_name):
    slug = clean_slugify(team_name).replace("-", " ")
    for k, v in TEAM_LOGOS.items():
        if k in slug or slug in k:
            return v
    return "img/teams/generic.svg"

def parse_competitor_description(desc):
    desc = desc.strip().replace("\n", " ").replace("–", "-").replace("—", "-")
    if ":" in desc:
        tournament_part, teams_part = desc.split(":", 1)
        tournament = tournament_part.strip()
    elif " - " in desc:
        tournament_part, teams_part = desc.split(" - ", 1)
        tournament = tournament_part.strip()
    else:
        tournament = "Fútbol en Vivo"
        teams_part = desc

    if " vs " in teams_part.lower() or " vs. " in teams_part.lower():
        parts = re.split(r'\s+vs\.?\s+', teams_part, flags=re.IGNORECASE)
        home_team = parts[0].strip()
        away_team = parts[1].strip() if len(parts) > 1 else "Rival"
    elif " - " in teams_part:
        parts = teams_part.split(" - ")
        home_team = parts[0].strip()
        away_team = parts[1].strip() if len(parts) > 1 else "Rival"
    else:
        home_team = teams_part.strip()
        away_team = "Rival"

    return tournament, home_team, away_team

def determine_category_and_flag(tournament):
    t = tournament.lower()
    if any(k in t for k in ["argentina", "reserva", "copa de la liga", "afa"]):
        return "argentina", "img/flags/ar.svg"
    elif any(k in t for k in ["laliga", "espana", "españa", "copa del rey"]):
        return "espana", "img/flags/es.svg"
    elif any(k in t for k in ["mexico", "méxico", "liga mx", "expansión", "expansion"]):
        return "mexico", "img/flags/mx.svg"
    elif any(k in t for k in ["colombia", "primera a", "betplay"]):
        return "colombia", "img/flags/co.svg"
    elif any(k in t for k in ["brasil", "brasileirao", "serie b", "paulista"]):
        return "brasil", "img/flags/br.svg"
    elif any(k in t for k in ["chile", "primera b"]):
        return "chile", "img/flags/cl.svg"
    elif any(k in t for k in ["bolivia", "primera división", "division profesional"]):
        return "bolivia", "img/flags/bo.svg"
    elif any(k in t for k in ["peru", "perú", "liga 1"]):
        return "peru", "img/flags/pe.svg"
    elif any(k in t for k in ["uruguay", "campeonato uruguayo"]):
        return "uruguay", "img/flags/uy.svg"
    elif any(k in t for k in ["libertadores", "sudamericana", "conmebol"]):
        return "conmebol", "img/flags/trophy_libertadores.svg"
    elif any(k in t for k in ["premier", "efl", "carabao", "fa cup"]):
        return "europa", "img/flags/england.svg"
    elif any(k in t for k in ["champions", "europa league", "conference", "uefa"]):
        return "europa", "img/flags/europa.svg"
    elif any(k in t for k in ["serie a", "italia", "coppa"]):
        return "europa", "img/flags/it.svg"
    else:
        return "europa", "img/flags/es.svg"

def fetch_primary_competitor():
    """Fetches matches from competitor JSON agenda"""
    print("[Pipeline] Attempting Primary Source: Competitor Feed...")
    req = urllib.request.Request(AGENDA_URL, headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Referer": "https://futbollibretvhd.org/"
    })
    try:
        resp = urllib.request.urlopen(req, timeout=8)
        data = json.loads(resp.read().decode("utf-8"))
        items = data.get("data", [])
        if not items:
            print("[Pipeline] Competitor feed returned 0 matches.")
            return None
        
        matches = []
        seen_slugs = set()
        for it in items:
            attr = it.get("attributes", {})
            desc = attr.get("diary_description", "")
            hour = attr.get("diary_hour", "12:00:00")[:8]
            date_diary = attr.get("date_diary", datetime.datetime.utcnow().strftime("%Y-%m-%d"))

            tournament, home_team, away_team = parse_competitor_description(desc)
            slug = f"{clean_slugify(home_team)}-vs-{clean_slugify(away_team)}"
            if slug in seen_slugs or not home_team or not away_team:
                continue
            seen_slugs.add(slug)

            # Time conversion (Lima UTC-5 to UTC)
            try:
                dt = datetime.datetime.strptime(f"{date_diary} {hour}", "%Y-%m-%d %H:%M:%S")
                utc_dt = dt + datetime.timedelta(hours=5)
                utc_kickoff = utc_dt.strftime("%Y-%m-%dT%H:%M:%SZ")
            except Exception:
                utc_kickoff = f"{date_diary}T19:00:00Z"

            category, flag = determine_category_and_flag(tournament)
            
            # Channels
            channels = []
            embeds = attr.get("embeds", {}).get("data", [])
            for emb in embeds:
                name = emb.get("attributes", {}).get("embed_name", "").replace("|", "").strip()
                name = re.sub(r'\s+', ' ', name)
                if name and name not in [c["name"] for c in channels]:
                    channels.append({"name": f"Fuente {len(channels)+1} {name}", "channel": name})
            if not channels:
                channels = [
                    {"name": "Fuente 1 Señal Principal HD", "channel": "Señal HD"},
                    {"name": "Fuente 2 Opción 2", "channel": "Opción 2"},
                    {"name": "Fuente 3 Señal Directa 1080p", "channel": "Directo HD"}
                ]

            matches.append({
                "id": f"comp-{it.get('id', slug)}",
                "slug": slug,
                "tournament": tournament,
                "flag": flag,
                "homeTeam": home_team,
                "homeLogo": get_logo(home_team),
                "awayTeam": away_team,
                "awayLogo": get_logo(away_team),
                "utcKickoff": utc_kickoff,
                "status": "UPCOMING",
                "minute": "",
                "homeScore": None,
                "awayScore": None,
                "channels": channels[:4],
                "venue": "Estadio Principal",
                "category": category,
                "votes": {
                    "team1": 1500 + (len(home_team) * 75),
                    "draw": 420 + (len(home_team) * 20),
                    "team2": 1400 + (len(away_team) * 70)
                }
            })
        print(f"[Pipeline] Successfully parsed {len(matches)} matches from Competitor Feed!")
        return matches
    except Exception as e:
        print(f"[Pipeline] Competitor feed note ({e}). Proceeding to Secondary Source...")
        return None

def parse_espn_event(event, league, today_str):
    comp = event.get("competitions", [{}])[0]
    competitors = comp.get("competitors", [])
    if len(competitors) < 2:
        return None
    home = competitors[0] if competitors[0].get("homeAway") == "home" else competitors[1]
    away = competitors[1] if competitors[0].get("homeAway") == "home" else competitors[0]
    home_team = home.get("team", {}).get("displayName", "Equipo Local")
    away_team = away.get("team", {}).get("displayName", "Equipo Visitante")
    home_logo = home.get("team", {}).get("logo", get_logo(home_team))
    away_logo = away.get("team", {}).get("logo", get_logo(away_team))

    status_obj = event.get("status", {})
    state = status_obj.get("type", {}).get("state", "pre")
    if state == "post":
        return None

    status = "LIVE" if state == "in" else "UPCOMING"
    minute = status_obj.get("displayClock", "") if state == "in" else ""
    event_date = event.get("date", f"{today_str}T19:00:00Z")
    slug = f"{clean_slugify(home_team)}-vs-{clean_slugify(away_team)}"
    eid = str(event.get("id", slug))

    channels_objs = []
    for idx, ch_name in enumerate(league["channels"]):
        channels_objs.append({
            "name": f"Fuente {idx+1} {ch_name}",
            "channel": ch_name
        })

    return {
        "id": f"espn-{eid}",
        "slug": slug,
        "tournament": league["name"],
        "flag": league["flag"],
        "homeTeam": home_team,
        "homeLogo": home_logo,
        "awayTeam": away_team,
        "awayLogo": away_logo,
        "utcKickoff": event_date,
        "status": status,
        "minute": minute,
        "homeScore": None,
        "awayScore": None,
        "channels": channels_objs,
        "venue": comp.get("venue", {}).get("fullName", "Estadio Principal"),
        "category": league["category"],
        "votes": {
            "team1": 1600 + (len(home_team) * 80),
            "draw": 450 + (len(home_team) * 25),
            "team2": 1500 + (len(away_team) * 75)
        }
    }

def fetch_single_espn_url(url, league, today_str):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/122.0.0.0 Safari/537.36"})
    try:
        resp = urllib.request.urlopen(req, timeout=3.5)
        data = json.loads(resp.read().decode("utf-8"))
        events = data.get("events", [])
        parsed = []
        for ev in events:
            item = parse_espn_event(ev, league, today_str)
            if item:
                parsed.append(item)
        return parsed
    except Exception:
        return []

def fetch_secondary_espn():
    """Fetches live and upcoming matches from ESPN global public API concurrently"""
    import concurrent.futures
    print("[Pipeline] Attempting Secondary Source: ESPN Public Global Scoreboards (Parallel Engine)...")
    matches = []
    seen_ids = set()
    now_utc = datetime.datetime.utcnow()
    today_str = now_utc.strftime("%Y-%m-%d")
    today_param = now_utc.strftime("%Y%m%d")

    tasks = []
    for league in ESPN_LEAGUES:
        code = league['code']
        # Query 1: Today's date specifically
        url_today = f"https://site.api.espn.com/apis/site/v2/sports/soccer/{code}/scoreboard?dates={today_param}"
        tasks.append((url_today, league, today_str))
        # Query 2: Current round / general upcoming
        url_general = f"https://site.api.espn.com/apis/site/v2/sports/soccer/{code}/scoreboard"
        tasks.append((url_general, league, today_str))

    with concurrent.futures.ThreadPoolExecutor(max_workers=12) as executor:
        future_to_url = {executor.submit(fetch_single_espn_url, u, lg, ts): u for (u, lg, ts) in tasks}
        for future in concurrent.futures.as_completed(future_to_url):
            try:
                res_list = future.result()
                for m in res_list:
                    if m["id"] not in seen_ids:
                        seen_ids.add(m["id"])
                        matches.append(m)
            except Exception:
                pass

    print(f"[Pipeline] ESPN retrieved {len(matches)} current & upcoming matches.")
    return matches

def update_agenda_data_js(matches):
    """Writes fresh matches to agenda-data.js"""
    now_utc = datetime.datetime.utcnow().strftime('%Y-%m-%d %H:%M:%SZ')
    js_content = f"""/**
 * Fútbol Libre Full HD — Live Matches Feed (Auto-Synced via Pipeline)
 * Based on LIBREGOL_LIVE_19_SEP
 * Last Updated: {now_utc}
 */

window.LIBREGOL_MATCHES = {json.dumps(matches, indent=2, ensure_ascii=False)};
"""
    with open(OUTPUT_JS, "w", encoding="utf-8") as f:
        f.write(js_content)
    print(f"[Pipeline] Successfully updated {OUTPUT_JS} with {len(matches)} live matches.")

def compile_master_sitemap():
    """Generates clean XML sitemap for Google (Only 1 Homepage URL)"""
    today_str = datetime.datetime.utcnow().strftime("%Y-%m-%d")
    base_url = "https://futbollibrefullhd.org"

    xml_lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        '  <url>',
        f'    <loc>{base_url}/</loc>',
        f'    <lastmod>{today_str}</lastmod>',
        '    <changefreq>daily</changefreq>',
        '    <priority>1.0</priority>',
        '  </url>',
        '</urlset>'
    ]
    with open(SITEMAP_FILE, "w", encoding="utf-8") as f:
        f.write("\n".join(xml_lines) + "\n")
    print(f"[Pipeline] sitemap.xml updated for {base_url}.")

def run_sync():
    print(f"=== Fútbol Libre Live Match Sync Pipeline Started ({datetime.datetime.utcnow().strftime('%Y-%m-%d %H:%M:%SZ')}) ===")
    
    matches = fetch_primary_competitor()
    if not matches:
        matches = fetch_secondary_espn()

    if not matches:
        print("[Pipeline] WARNING: Both sources yielded 0 matches. Retaining current agenda.")
        return False

    today_str = datetime.datetime.utcnow().strftime("%Y-%m-%d")

    def match_priority(m):
        status = m.get("status", "UPCOMING")
        dt = m.get("utcKickoff", "")[:10]
        if status == "LIVE":
            return (0, m.get("utcKickoff", ""))
        if status == "UPCOMING" and dt == today_str:
            return (1, m.get("utcKickoff", ""))
        if status == "UPCOMING" and dt > today_str:
            return (2, m.get("utcKickoff", ""))
        if status == "FINISHED" and dt == today_str:
            return (3, m.get("utcKickoff", ""))
        return (4, m.get("utcKickoff", ""))

    matches.sort(key=match_priority)

    # 1. Update agenda-data.js (old matches deleted, new ones populated)
    update_agenda_data_js(matches)

    # 2. Update sitemap
    compile_master_sitemap()

    print(f"=== Pipeline Completed! {len(matches)} matches active. ===")
    return True

if __name__ == "__main__":
    run_sync()
