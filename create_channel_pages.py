import os

channels_data = [
    {
        "slug": "liga-1-max",
        "name": "Liga 1 MAX",
        "title": "LIGA 1 MAX en vivo por internet",
        "seo_h2": "Transmisión oficial de la Liga 1 Te Apuesto de Perú",
        "desc": "Sigue todos los partidos del fútbol profesional peruano en vivo por internet. Liga 1 MAX transmite en directo los encuentros de Alianza Lima, Universitario de Deportes, Sporting Cristal, Melgar y toda la fecha del torneo local con análisis previo y entrevistas exclusivas.",
        "leagues": "Liga 1 Perú, Torneo Apertura, Torneo Clausura, Copa Bicentenario.",
        "stream_url": "https://tvf90.com/2.php?stream=liga1max"
    },
    {
        "slug": "telemundo",
        "name": "Telemundo Deportes",
        "title": "TELEMUNDO en vivo por internet",
        "seo_h2": "Deportes en español, Premier League y eventos FIFA",
        "desc": "Telemundo Deportes ofrece cobertura en vivo en español de los mejores partidos de la Premier League inglesa, competencias de selecciones nacionales de la FIFA, resúmenes y programas de debate deportivo en alta definición.",
        "leagues": "Premier League, Torneos FIFA, Amistosos Internacionales, Juegos Olímpicos.",
        "stream_url": "https://tvf90.com/2.php?stream=telemundo"
    },
    {
        "slug": "dsports",
        "name": "DSports",
        "title": "DSPORTS en vivo por internet",
        "seo_h2": "DIRECTV Sports en directo: Copa Sudamericana y fútbol europeo",
        "desc": "DSports (DirecTV Sports) es la señal por excelencia para seguir en vivo la Copa Sudamericana, eliminatorias sudamericanas, LaLiga española, Copa del Rey y torneos internacionales con relatos en español neutro.",
        "leagues": "Copa Sudamericana, LaLiga, Copa del Rey, Eliminatorias CONMEBOL.",
        "stream_url": "https://tvf90.com/2.php?stream=dsports"
    },
    {
        "slug": "dsports-2",
        "name": "DSports 2",
        "title": "DSPORTS 2 en vivo por internet",
        "seo_h2": "Señal adicional con partidos simultáneos y torneos mundiales",
        "desc": "DSports 2 transmite en simultáneo los mejores encuentros deportivos del día. Es el canal ideal cuando hay múltiples partidos en el mismo horario por copas continentales, ligas europeas y eventos polideportivos.",
        "leagues": "Fútbol internacional en simultáneo, Baloncesto, Tenis, Mundiales juveniles.",
        "stream_url": "https://tvf90.com/2.php?stream=dsports2"
    },
    {
        "slug": "espn-1",
        "name": "ESPN 1",
        "title": "ESPN 1 en vivo por internet",
        "seo_h2": "UEFA Champions League, fútbol internacional y SportsCenter",
        "desc": "ESPN 1 es la señal deportiva líder del continente. Disfruta de la UEFA Champions League, la Serie A italiana, partidos estelares de la liga argentina y la cobertura periodística más completa en cada edición de SportsCenter.",
        "leagues": "UEFA Champions League, Serie A de Italia, Liga Profesional Argentina, FA Cup.",
        "stream_url": "https://tvf90.com/2.php?stream=espn"
    },
    {
        "slug": "espn-2",
        "name": "ESPN 2",
        "title": "ESPN 2 en vivo por internet",
        "seo_h2": "Premier League inglesa, LaLiga y torneos de clubes",
        "desc": "ESPN 2 ofrece la transmisión en directo de la Premier League de Inglaterra, clásicos del fútbol europeo, torneos de tenis Grand Slam y las competiciones más seguidas del planeta en calidad HD.",
        "leagues": "Premier League, LaLiga EA Sports, Eredivisie, Grand Slam de Tenis.",
        "stream_url": "https://tvf90.com/2.php?stream=espn2"
    },
    {
        "slug": "espn-3",
        "name": "ESPN 3",
        "title": "ESPN 3 en vivo por internet",
        "seo_h2": "Fútbol europeo alternativo, Fórmula 1 y deportes extremos",
        "desc": "ESPN 3 reúne partidos de la Bundesliga alemana, Ligue 1 de Francia, transmisiones de automovilismo de Fórmula 1 y eventos polideportivos internacionales durante todo el año.",
        "leagues": "Bundesliga, Ligue 1, Fórmula 1, Torneos internacionales de rugby y golf.",
        "stream_url": "https://tvf90.com/2.php?stream=espn3"
    },
    {
        "slug": "fox-sports",
        "name": "Fox Sports",
        "title": "FOX SPORTS en vivo por internet",
        "seo_h2": "Copa Libertadores de América y pasión deportiva",
        "desc": "Fox Sports es el hogar de la Copa Libertadores de América, con seguimiento a Boca Juniors, River Plate, Flamengo, Palmeiras y los mejores clubes del continente, además de programas de debate y automovilismo en vivo.",
        "leagues": "Copa Libertadores, Automovilismo, WWE, Fútbol continental sudamericano.",
        "stream_url": "https://tvf90.com/2.php?stream=foxsports"
    }
]

base_dir = r"C:\Users\HP\.gemini\antigravity\scratch\football-portal\canales"

for ch in channels_data:
    folder = os.path.join(base_dir, ch["slug"])
    os.makedirs(folder, exist_ok=True)
    file_path = os.path.join(folder, "index.html")
    
    # Generate other channels pills
    pills_html = []
    for other in channels_data:
        active_cls = " active" if other["slug"] == ch["slug"] else ""
        pills_html.append(f'<a href="../{other["slug"]}/index.html" class="channel-pill{active_cls}">{other["name"]}</a>')
    pills_str = "\n        ".join(pills_html)

    html_content = f"""<!DOCTYPE html>
<html lang="es">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{ch['title']} - Fútbol Libre TV</title>
  <meta name="description" content="Mira {ch['name']} en vivo y en directo por internet en calidad Full HD. Horarios, partidos del día y programación deportiva oficial.">
  
  <!-- Safe DMCA Protection: Do not index channel streams, concentrate 100% authority on Homepage -->
  <meta name="robots" content="noindex, follow">
  <link rel="canonical" href="https://futbollibrefullhd.org/">

  <link rel="icon" type="image/svg+xml" href="../../img/favicon.svg">
  <style>
    * {{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: Arial, Helvetica, sans-serif;
    }}
    body {{
      background-color: #ffffff;
      color: #1f2937;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }}
    header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1.5rem;
      background-color: #ffffff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
      position: sticky;
      top: 0;
      z-index: 50;
    }}
    .logo {{
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: #16a34a;
      font-size: 1.35rem;
      font-weight: 800;
    }}
    .ball-icon {{
      font-size: 1.4rem;
    }}
    .nav-back-home {{
      background-color: #16a34a;
      color: #ffffff;
      text-decoration: none;
      padding: 0.45rem 1rem;
      border-radius: 9999px;
      font-size: 0.88rem;
      font-weight: 700;
      transition: background 0.2s;
    }}
    .nav-back-home:hover {{
      background-color: #15803d;
    }}
    main {{
      max-width: 860px;
      width: 92%;
      margin: 1.5rem auto 3rem;
      flex: 1;
    }}
    .channel-header-title {{
      color: #16a34a;
      font-size: 1.65rem;
      font-weight: 800;
      margin-bottom: 1.25rem;
      text-align: center;
      letter-spacing: -0.3px;
    }}
    /* Video player matching Image 3 */
    .player-box {{
      width: 100%;
      background: #000000;
      border-radius: 10px;
      overflow: hidden;
      aspect-ratio: 16 / 9;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
      position: relative;
    }}
    iframe {{
      width: 100%;
      height: 100%;
      border: none;
      display: block;
    }}
    .btn-reload-channel {{
      width: 100%;
      background-color: #16a34a;
      color: #ffffff;
      font-size: 1rem;
      font-weight: 700;
      padding: 0.75rem 1rem;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      margin-top: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: background-color 0.2s;
    }}
    .btn-reload-channel:hover {{
      background-color: #15803d;
    }}
    /* Channel Switcher Pills */
    .channels-bar-wrap {{
      margin: 1.75rem 0 1rem;
    }}
    .channels-bar-title {{
      font-size: 1rem;
      font-weight: 700;
      color: #374151;
      margin-bottom: 0.6rem;
    }}
    .channels-pills-row {{
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }}
    .channel-pill {{
      background: #f3f4f6;
      color: #4b5563;
      text-decoration: none;
      font-size: 0.85rem;
      font-weight: 600;
      padding: 6px 14px;
      border-radius: 9999px;
      transition: all 0.2s;
    }}
    .channel-pill:hover {{
      background: #e5e7eb;
      color: #16a34a;
    }}
    .channel-pill.active {{
      background: #16a34a;
      color: #ffffff;
    }}
    /* Editorial Guide */
    .editorial-section {{
      margin-top: 2rem;
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 1.5rem;
      line-height: 1.6;
    }}
    .editorial-section h2 {{
      color: #111827;
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
    }}
    .editorial-section p {{
      color: #4b5563;
      font-size: 0.95rem;
      margin-bottom: 0.85rem;
    }}
    .editorial-section ul {{
      margin-left: 1.25rem;
      color: #4b5563;
      font-size: 0.92rem;
    }}
    .editorial-section li {{
      margin-bottom: 0.4rem;
    }}
    footer {{
      min-height: 2.75rem;
      background-color: #1f2937;
      color: #9ca3af;
      padding: 0.85rem 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: auto;
      border-top: 1px solid #374151;
    }}
    .footer-inner {{
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.88rem;
      color: #9ca3af;
      flex-wrap: wrap;
      justify-content: center;
    }}
    .footer-title {{
      font-weight: 700;
      color: #f3f4f6;
      letter-spacing: -0.2px;
    }}
    .footer-sep {{
      color: #4b5563;
    }}
    .footer-tagline {{
      color: #9ca3af;
      font-weight: 500;
    }}
  </style>
</head>
<body>
  <header>
    <a href="../../index.html" class="logo" aria-label="Inicio Fútbol Libre">
      <span class="ball-icon">⚽</span>
      <span>Fútbol Libre</span>
    </a>
    <a href="../../index.html" class="nav-back-home">&#8592; Ver Agenda de Hoy</a>
  </header>

  <main>
    <h1 class="channel-header-title">{ch['title']}</h1>

    <div class="player-box">
      <iframe id="channelPlayer" src="{ch['stream_url']}" allow="autoplay; fullscreen" allowfullscreen></iframe>
    </div>

    <button type="button" class="btn-reload-channel" onclick="reloadChannel()">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
      </svg>
      Recargar canal
    </button>

    <div class="channels-bar-wrap">
      <p class="channels-bar-title">Cambiar a otro canal deportivo en vivo:</p>
      <div class="channels-pills-row">
        {pills_str}
      </div>
    </div>

    <section class="editorial-section">
      <h2>{ch['seo_h2']}</h2>
      <p>{ch['desc']}</p>
      <p><strong>Competiciones y torneos habituales:</strong></p>
      <ul>
        <li>{ch['leagues']}</li>
        <li>Transmisión 24/7 en alta definición con compatibilidad móvil y Smart TV.</li>
        <li>Información oficial de la fecha deportiva y enlaces actualizados.</li>
      </ul>
    </section>
  </main>

  <footer>
    <div class="footer-inner">
      <span class="footer-title">Fútbol Libre TV 2026</span>
      <span class="footer-sep">•</span>
      <span class="footer-tagline">Agenda Deportiva Oficial & Guía de Canales HD</span>
    </div>
  </footer>

  <script>
    function reloadChannel() {{
      const frame = document.getElementById('channelPlayer');
      if (frame) {{
        const src = frame.src;
        frame.src = 'about:blank';
        setTimeout(() => {{
          frame.src = src;
        }}, 200);
      }}
    }}
  </script>
</body>
</html>
"""
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"Created: {file_path}")

print("All 8 channel pages created successfully!")
