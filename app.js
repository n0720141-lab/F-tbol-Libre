/**
 * Fútbol Libre Full HD - Official App Engine
 * Domain: https://futbollibrefullhd.online/
 * Authentic Sports Streaming Display based on LIBREGOL_LIVE_19_SEP
 * Zero External Redirects • High-Definition Match & Channel Frames
 */

document.addEventListener("DOMContentLoaded", function () {
  // =====================================================
  // 1. Mobile Menu Drawer Toggle
  // =====================================================
  const menuToggle = document.getElementById("menu-toggle");
  const menuClose = document.getElementById("menu-close");
  const menuModal = document.getElementById("menu-modal");

  if (menuToggle && menuModal && menuClose) {
    menuToggle.addEventListener("click", () => {
      menuModal.classList.add("active");
    });

    menuClose.addEventListener("click", () => {
      menuModal.classList.remove("active");
    });

    menuModal.addEventListener("click", (e) => {
      if (e.target === menuModal) {
        menuModal.classList.remove("active");
      }
    });
  }

  // =====================================================
  // 2. Team Crests & Channel Brand Assets (Local SVGs)
  // =====================================================
  const TEAM_CRESTS = {
    "boca juniors": "img/teams/boca.svg",
    "boca": "img/teams/boca.svg",
    "river plate": "img/teams/river.svg",
    "river": "img/teams/river.svg",
    "real madrid": "img/teams/realmadrid.svg",
    "barcelona": "img/teams/barcelona.svg",
    "barcelona sc": "img/teams/barcelona.svg",
    "manchester city": "img/teams/mancity.svg",
    "liverpool": "img/teams/liverpool.svg",
    "américa": "img/teams/america.svg",
    "america": "img/teams/america.svg",
    "guadalajara": "img/teams/chivas.svg",
    "chivas": "img/teams/chivas.svg",
    "flamengo": "img/teams/flamengo.svg",
    "palmeiras": "img/teams/palmeiras.svg",
    "universitario": "img/teams/universitario.svg",
    "alianza lima": "img/teams/alianza.svg",
    "alianza": "img/teams/alianza.svg",
    "ldu quito": "img/teams/ldu.svg",
    "ldu": "img/teams/ldu.svg",
    "default": "img/teams/generic.svg"
  };

  const CHANNEL_LOGOS = {
    "liga 1 max": "img/channels/liga1max.svg",
    "telemundo": "img/channels/telemundo.svg",
    "dsports": "img/channels/dsports.svg",
    "dsports 2": "img/channels/dsports2.svg",
    "espn 1": "img/channels/espn1.svg",
    "espn 2": "img/channels/espn2.svg",
    "espn 3": "img/channels/espn3.svg",
    "espn": "img/channels/espn1.svg",
    "fox sports": "img/channels/foxsports.svg"
  };

  const CHANNEL_DESCRIPTIONS = {
    "espn": "ESPN es la señal deportiva líder internacional. Disfruta de la cobertura en vivo y en directo de la UEFA Champions League, torneos sudamericanos, Liga Profesional y las principales disciplinas del deporte mundial en calidad 1080p HD sin cortes.",
    "fox sports": "Fox Sports ofrece transmisiones deportivas de alta emoción: fútbol continental, Copa Libertadores, automovilismo y análisis deportivo minuto a minuto por internet.",
    "dsports": "DSports (DirecTV Sports) es la señal exclusiva para seguir los torneos continentales, clasificatorias de selecciones y competiciones de máxima categoría en alta definición.",
    "liga 1 max": "Liga 1 MAX es el canal oficial del fútbol profesional peruano, con transmisión de todos los partidos de la fecha en directo, previas y resúmenes completos.",
    "telemundo": "Telemundo Deportes brinda transmisiones oficiales en español, resúmenes, torneos de la FIFA y eventos internacionales en alta resolución."
  };

  const CHANNEL_STREAMS = {
    "espn 1 hd": [
      { name: "Fuente 1 ESPN 1 HD", channel: "ESPN 1 HD" },
      { name: "Fuente 2 ESPN Premium HD", channel: "ESPN Premium HD" },
      { name: "Fuente 3 Star+ / Disney+ Premium", channel: "Disney+ HD" },
      { name: "Fuente 4 Señal Móvil 720p", channel: "ESPN Móvil" }
    ],
    "espn 2 hd": [
      { name: "Fuente 1 ESPN 2 HD", channel: "ESPN 2 HD" },
      { name: "Fuente 2 ESPN Internacional", channel: "ESPN Internacional" },
      { name: "Fuente 3 Star+ / Disney+ HD", channel: "Disney+ HD" },
      { name: "Fuente 4 Señal Móvil 720p", channel: "ESPN 2 Móvil" }
    ],
    "espn 3 hd": [
      { name: "Fuente 1 ESPN 3 HD", channel: "ESPN 3 HD" },
      { name: "Fuente 2 ESPN Extra HD", channel: "ESPN Extra HD" },
      { name: "Fuente 3 Disney+ Premium", channel: "Disney+ HD" },
      { name: "Fuente 4 Señal Móvil 720p", channel: "ESPN 3 Móvil" }
    ],
    "fox sports 1 hd": [
      { name: "Fuente 1 Fox Sports 1 HD", channel: "Fox Sports 1 HD" },
      { name: "Fuente 2 Fox Sports Premium", channel: "Fox Sports Premium" },
      { name: "Fuente 3 Fox Sports Cono Sur", channel: "Fox Sports HD" },
      { name: "Fuente 4 Señal Directa Móvil", channel: "Fox Sports Móvil" }
    ],
    "fox sports 2 hd": [
      { name: "Fuente 1 Fox Sports 2 HD", channel: "Fox Sports 2 HD" },
      { name: "Fuente 2 Fox Sports 1 HD", channel: "Fox Sports 1 HD" },
      { name: "Fuente 3 Fox Sports Premium", channel: "Fox Sports Premium" },
      { name: "Fuente 4 Señal Directa Móvil", channel: "Fox Sports Móvil" }
    ],
    "fox sports 3 hd": [
      { name: "Fuente 1 Fox Sports 3 HD", channel: "Fox Sports 3 HD" },
      { name: "Fuente 2 Fox Sports 2 HD", channel: "Fox Sports 2 HD" },
      { name: "Fuente 3 Fox Sports 1 HD", channel: "Fox Sports 1 HD" },
      { name: "Fuente 4 Señal Directa Móvil", channel: "Fox Sports Móvil" }
    ],
    "dsports hd": [
      { name: "Fuente 1 DSports HD", channel: "DSports HD" },
      { name: "Fuente 2 DSports 2 HD", channel: "DSports 2 HD" },
      { name: "Fuente 3 DGO Streaming HD", channel: "DGO HD" },
      { name: "Fuente 4 DSports Plus Móvil", channel: "DSports Móvil" }
    ],
    "dsports 2 hd": [
      { name: "Fuente 1 DSports 2 HD", channel: "DSports 2 HD" },
      { name: "Fuente 2 DSports HD", channel: "DSports HD" },
      { name: "Fuente 3 DGO Streaming HD", channel: "DGO HD" },
      { name: "Fuente 4 DSports Plus Móvil", channel: "DSports Móvil" }
    ],
    "liga 1 max hd": [
      { name: "Fuente 1 Liga 1 MAX HD", channel: "Liga 1 MAX HD" },
      { name: "Fuente 2 Liga 1 Play HD", channel: "Liga 1 Play" },
      { name: "Fuente 3 Gol Perú HD", channel: "Gol Perú" },
      { name: "Fuente 4 Señal Móvil 720p", channel: "Liga 1 Móvil" }
    ],
    "telemundo hd": [
      { name: "Fuente 1 Telemundo Deportes HD", channel: "Telemundo Deportes" },
      { name: "Fuente 2 TUDN En Vivo HD", channel: "TUDN HD" },
      { name: "Fuente 3 Univisión Deportes", channel: "Univisión" },
      { name: "Fuente 4 Peacock Deportes 1080p", channel: "Peacock HD" }
    ]
  };

  function getTeamCrest(name) {
    if (!name) return TEAM_CRESTS["default"];
    const lower = name.toLowerCase().trim();
    for (const [key, path] of Object.entries(TEAM_CRESTS)) {
      if (lower.includes(key)) return path;
    }
    return TEAM_CRESTS["default"];
  }

  function getChannelLogo(name) {
    if (!name) return null;
    const lower = name.toLowerCase();
    for (const [key, path] of Object.entries(CHANNEL_LOGOS)) {
      if (lower.includes(key)) return path;
    }
    return null;
  }

  function getChannelDescription(name) {
    if (!name) return CHANNEL_DESCRIPTIONS["espn"];
    const lower = name.toLowerCase();
    for (const [key, desc] of Object.entries(CHANNEL_DESCRIPTIONS)) {
      if (lower.includes(key)) return desc;
    }
    return CHANNEL_DESCRIPTIONS["espn"];
  }

  // =====================================================
  // 3. View Switcher Controller & Elements
  // =====================================================
  const homeView = document.getElementById("home-view");
  const playerView = document.getElementById("player-view");
  const btnBackToHome = document.getElementById("btnBackToHome");
  const watchHeading = document.getElementById("watchHeading");
  const watchSubtitle = document.getElementById("watchSubtitle");

  // Stream Player Wrapper Elements (From LIBREGOL_LIVE_19_SEP)
  const streamPlayerWrapper = document.getElementById("streamPlayerWrapper");
  const videoDisplayFrame = document.getElementById("videoDisplayFrame");
  const screenConnecting = document.getElementById("screenConnecting");
  const screenPlaying = document.getElementById("screenPlaying");
  const btnPlayPause = document.getElementById("btnPlayPause");
  const btnVolume = document.getElementById("btnVolume");
  const btnFullscreen = document.getElementById("btnFullscreen");
  const ctrlTime = document.getElementById("ctrlTime");
  const streamStatusText = document.getElementById("streamStatusText");
  const btnStreamReload = document.getElementById("btnStreamReload");
  const streamSourcesRow = document.getElementById("streamSourcesRow");
  const infoSectionTitle = document.getElementById("infoSectionTitle");
  const infoSectionText = document.getElementById("infoSectionText");

  let activeSourceName = "Fuente 1 HD";
  let isConnectingStream = false;
  let matchClockSeconds = 0;
  let clockTickerInterval = null;

  // Stream Connection State Machine (Exact match to LIBREGOL_LIVE_19_SEP)
  function showConnectingState(durationMs, nextName) {
    if (isConnectingStream) return;
    isConnectingStream = true;

    if (screenConnecting) screenConnecting.style.display = "flex";
    if (screenPlaying) screenPlaying.style.display = "none";
    if (btnStreamReload) btnStreamReload.classList.add("spinning");

    setTimeout(() => {
      if (nextName) {
        activeSourceName = nextName;
      }
      if (streamStatusText) {
        streamStatusText.textContent = activeSourceName + " · conectado";
      }
      if (screenPlaying) {
        screenPlaying.style.backgroundImage = "";
        screenPlaying.style.display = "flex";
      }
      if (screenConnecting) {
        screenConnecting.style.display = "none";
      }
      if (btnStreamReload) {
        btnStreamReload.classList.remove("spinning");
      }
      isConnectingStream = false;
    }, durationMs);
  }

  function triggerReload() {
    showConnectingState(2000, activeSourceName);
  }

  if (btnStreamReload) {
    btnStreamReload.addEventListener("click", (e) => {
      e.stopPropagation();
      triggerReload();
    });
  }

  function handleStreamClick() {
    if (!isConnectingStream) {
      showConnectingState(1600, activeSourceName);
    }
  }

  if (videoDisplayFrame) {
    videoDisplayFrame.addEventListener("click", handleStreamClick);
  }

  function togglePlayPause() {
    handleStreamClick();
  }

  if (btnPlayPause) {
    btnPlayPause.addEventListener("click", (e) => {
      e.stopPropagation();
      togglePlayPause();
    });
  }

  function toggleMute() {
    if (btnVolume) {
      btnVolume.classList.toggle("muted");
    }
  }

  if (btnVolume) {
    btnVolume.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMute();
    });
  }

  function toggleFullscreen() {
    const frame = streamPlayerWrapper || document.querySelector(".stream-player-wrapper");
    if (!frame) return;
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      if (frame.requestFullscreen) {
        frame.requestFullscreen();
      } else if (frame.webkitRequestFullscreen) {
        frame.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  if (btnFullscreen) {
    btnFullscreen.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFullscreen();
    });
  }

  // Running Match Clocks (Second ticker starting at 0:00)
  function startClocks() {
    matchClockSeconds = 0;
    if (ctrlTime) ctrlTime.textContent = "0:00";

    if (clockTickerInterval) clearInterval(clockTickerInterval);
    clockTickerInterval = setInterval(() => {
      matchClockSeconds++;
      const m = Math.floor(matchClockSeconds / 60);
      const s = matchClockSeconds % 60;
      if (ctrlTime) ctrlTime.textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
    }, 1000);
  }

  // =====================================================
  // 4. Show Player View (Dedicated view matching user screenshot)
  // =====================================================
  function showPlayerView(title, channelName, matchTitle, customSignals = null, matchDetails = null) {
    if (!homeView || !playerView) return;

    // 1. Hide the entire home view
    homeView.style.display = "none";

    // 2. Display the dedicated player view
    playerView.style.display = "block";
    const smartOverlay = document.getElementById("playSmartOverlay");
    if (smartOverlay) {
      smartOverlay.style.display = "flex";
      smartOverlay.style.opacity = "1";
    }

    // 3. Setup Title & Subtitle (Exact format from user screenshot: Title + Región)
    const isMatch = !!matchTitle;
    if (isMatch) {
      const parts = matchTitle.split(" - ");
      const teamsPart = parts[0] || matchTitle;
      watchHeading.textContent = `${teamsPart} en VIVO`;
      watchSubtitle.textContent = `Región: Sudamérica 🌎 • Señal Deportiva Oficial`;
    } else {
      watchHeading.textContent = `${channelName} en vivo online`;
      watchSubtitle.textContent = `Región: Sudamérica 🌎 • Señal Deportiva Oficial`;
    }
    startClocks();

    // 4. Update Status Bar
    activeSourceName = `Fuente 1 ${channelName}`;
    if (streamStatusText) streamStatusText.textContent = `${activeSourceName} · conectado`;

    // 5. Update SEO information block
    if (infoSectionTitle) {
      infoSectionTitle.textContent = isMatch ? `Acerca de ${watchHeading.textContent}` : `Sobre ${channelName}`;
    }
    if (infoSectionText) {
      infoSectionText.textContent = getChannelDescription(channelName);
    }

    // 6. Build Signals List (Matching LIBREGOL_LIVE_19_SEP)
    let signals = customSignals;
    if (!signals || signals.length === 0) {
      const normKey = channelName.toLowerCase().trim();
      signals = CHANNEL_STREAMS[normKey] || [
        { name: "Fuente 1 " + channelName, channel: channelName },
        { name: "Fuente 2 Señal Alternativa Full HD", channel: channelName },
        { name: "Fuente 3 Star+ / Disney+ Premium", channel: channelName },
        { name: "Fuente 4 Cobertura Internacional HD", channel: channelName }
      ];
    }

    // 7. Generate Source Switcher Pills (Fuente 1, Fuente 2, etc.)
    if (streamSourcesRow) {
      const allPills = [
        { id: "auto", name: "Automático", label: "Automático" },
        ...signals.map((sig, idx) => ({
          id: `f${idx + 1}`,
          name: sig.name,
          label: sig.name.toUpperCase(),
          channel: sig.channel || channelName
        }))
      ];

      streamSourcesRow.innerHTML = allPills.map((pill, idx) => `
        <button type="button" class="source-pill-btn ${idx === 1 ? 'active' : ''}" data-source-id="${pill.id}" data-name="${pill.name}" data-channel="${pill.channel || channelName}">
          ${pill.label}
        </button>
      `).join('');

      const sourceBtns = streamSourcesRow.querySelectorAll(".source-pill-btn");
      sourceBtns.forEach(btn => {
        btn.addEventListener("click", function () {
          sourceBtns.forEach(b => b.classList.remove("active"));
          this.classList.add("active");
          const sName = this.dataset.name;

          // Connect stream with smooth feedback
          showConnectingState(1800, sName);
        });
      });
    }

    // 8. Start with Conectando... state (Exact match to LIBREGOL_LIVE_19_SEP)
    showConnectingState(2000, activeSourceName);

    // 9. Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showHomeView() {
    if (!homeView || !playerView) return;
    if (clockTickerInterval) clearInterval(clockTickerInterval);

    playerView.style.display = "none";
    homeView.style.display = "block";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Back button handler
  if (btnBackToHome) {
    btnBackToHome.addEventListener("click", showHomeView);
  }

  // Header Logo click returns to home view
  const logoLink = document.querySelector(".logo");
  if (logoLink) {
    logoLink.addEventListener("click", function (e) {
      if (playerView && playerView.style.display !== "none") {
        e.preventDefault();
        showHomeView();
      }
    });
  }

  // Quick switch channel pills inside player view
  document.querySelectorAll(".watch-ch-pill").forEach(pill => {
    pill.addEventListener("click", function () {
      document.querySelectorAll(".watch-ch-pill").forEach(p => p.classList.remove("active"));
      this.classList.add("active");
      const channel = this.dataset.channel;
      const title = this.dataset.title;
      showPlayerView(title, channel);
    });
  });

  // =====================================================
  // 5. Fan Prediction Voting Engine (From LIBREGOL_LIVE_19_SEP)
  // =====================================================
  const VOTE_STORAGE_KEY = "libregol_fan_vote_";

  function getStoredVote(matchId) {
    try {
      return localStorage.getItem(VOTE_STORAGE_KEY + matchId);
    } catch (e) {
      return null;
    }
  }

  function setStoredVote(matchId, choice) {
    try {
      localStorage.setItem(VOTE_STORAGE_KEY + matchId, choice);
    } catch (e) {
      console.warn("LocalStorage unavailable", e);
    }
  }

  function calculatePercentages(votes) {
    const v1 = (votes && votes.team1) || 0;
    const vDraw = (votes && votes.draw) || 0;
    const v2 = (votes && votes.team2) || 0;
    const total = v1 + vDraw + v2;
    if (total === 0) {
      return { team1: 33, draw: 34, team2: 33, total: 0 };
    }
    const p1 = Math.round((v1 / total) * 100);
    const pDraw = Math.round((vDraw / total) * 100);
    const p2 = 100 - (p1 + pDraw);
    return { team1: p1, draw: pDraw, team2: p2, total: total };
  }

  // =====================================================
  // 4. Automatic Local Timezone Engine (From LIBREGOL_LIVE_19_SEP)
  // Automatically detects user's country/city and adapts all match timings!
  // =====================================================
  let detectedUserTz = "auto";
  let detectedCountryCity = "Tu País";
  try {
    detectedUserTz = Intl.DateTimeFormat().resolvedOptions().timeZone || "auto";
    if (detectedUserTz && detectedUserTz !== "auto") {
      const tzMap = {
        "Europe/Madrid": "España (Madrid)",
        "America/Argentina/Buenos_Aires": "Argentina (Buenos Aires)",
        "America/Argentina/Cordoba": "Argentina",
        "America/Mexico_City": "México (CDMX)",
        "America/Monterrey": "México (Monterrey)",
        "America/Tijuana": "México (Tijuana)",
        "America/Bogota": "Colombia (Bogotá)",
        "America/Lima": "Perú (Lima)",
        "America/Santiago": "Chile (Santiago)",
        "America/Montevideo": "Uruguay (Montevideo)",
        "America/Guayaquil": "Ecuador (Guayaquil)",
        "America/La_Paz": "Bolivia (La Paz)",
        "America/Asuncion": "Paraguay (Asunción)",
        "America/Caracas": "Venezuela (Caracas)",
        "America/New_York": "EE.UU. (Este)",
        "America/Chicago": "EE.UU. (Centro)",
        "America/Los_Angeles": "EE.UU. (Pacífico)",
        "Asia/Karachi": "Pakistán (PKT)"
      };
      if (tzMap[detectedUserTz]) {
        detectedCountryCity = tzMap[detectedUserTz];
      } else {
        const parts = detectedUserTz.split("/");
        detectedCountryCity = parts[parts.length - 1].replace(/_/g, " ");
      }
    }
  } catch (e) {
    detectedUserTz = "auto";
  }

  function updateTzBadge() {
    const badgeEl = document.getElementById("tzBadgeText");
    if (badgeEl) {
      badgeEl.textContent = `Horarios adaptados a tu país: ${detectedCountryCity}`;
    }
  }
  updateTzBadge();

  function formatMatchTime(utcIso) {
    if (!utcIso) return "";
    const date = new Date(utcIso);
    if (isNaN(date.getTime())) return "";
    try {
      return new Intl.DateTimeFormat("es", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      }).format(date);
    } catch (e) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
  }

  const todayIso = new Date().toISOString().slice(0, 10);
  const defaultFallbackMatches = [
    {
      id: "boca-river",
      category: "argentina",
      utcKickoff: `${todayIso}T19:00:00Z`,
      time: "16:00 hs",
      flag: "img/flags/ar.svg",
      title: "Boca Juniors vs River Plate - Liga Profesional Argentina",
      homeTeam: "Boca Juniors",
      awayTeam: "River Plate",
      votes: { team1: 520, draw: 140, team2: 480 },
      channels: [
        { name: "Fuente 1 ESPN Premium HD", channel: "ESPN Premium HD" },
        { name: "Fuente 2 TNT Sports HD", channel: "TNT Sports HD" },
        { name: "Fuente 3 TyC Sports", channel: "TyC Sports" },
        { name: "Fuente 4 Directo 1080p HD", channel: "Directo HD" }
      ]
    },
    {
      id: "real-barca",
      category: "espana",
      utcKickoff: `${todayIso}T20:00:00Z`,
      time: "17:00 hs",
      flag: "img/flags/es.svg",
      title: "Real Madrid vs Barcelona - LaLiga EA Sports",
      homeTeam: "Real Madrid",
      awayTeam: "Barcelona",
      votes: { team1: 640, draw: 190, team2: 590 },
      channels: [
        { name: "Fuente 1 DSports HD", channel: "DSports HD" },
        { name: "Fuente 2 Movistar LaLiga HD", channel: "Movistar LaLiga" },
        { name: "Fuente 3 ESPN Deportes", channel: "ESPN Deportes" },
        { name: "Fuente 4 Directo 1080p HD", channel: "Directo HD" }
      ]
    },
    {
      id: "mancity-liverpool",
      category: "europa",
      utcKickoff: `${todayIso}T21:00:00Z`,
      time: "18:00 hs",
      flag: "img/flags/england.svg",
      title: "Manchester City vs Liverpool - Premier League",
      homeTeam: "Man City",
      awayTeam: "Liverpool",
      votes: { team1: 410, draw: 220, team2: 430 },
      channels: [
        { name: "Fuente 1 ESPN 1 HD", channel: "ESPN 1 HD" },
        { name: "Fuente 2 Disney+ Premium HD", channel: "Disney+ HD" },
        { name: "Fuente 3 DAZN 1 HD", channel: "DAZN 1" },
        { name: "Fuente 4 Directo 1080p HD", channel: "Directo HD" }
      ]
    }
  ];

  // Initialize matches from agenda-data.js (LIBREGOL_MATCHES) if present, else fallback
  let agendaData = (window.LIBREGOL_MATCHES && window.LIBREGOL_MATCHES.length > 0)
    ? window.LIBREGOL_MATCHES
    : defaultFallbackMatches;

  // Agenda Controller
  let openMatchId = null;
  const menuContainer = document.getElementById("menu");

  function getMatchTimeDisplay(item) {
    if (item.utcKickoff) {
      const formatted = formatMatchTime(item.utcKickoff);
      if (formatted) {
        return `<span class="agenda-time">${formatted} hs</span>`;
      }
    }
    return `<span class="agenda-time">${item.time || "19:00 hs"}</span>`;
  }

  function getMatchTitleDisplay(item) {
    if (item.title) return item.title;
    return `${item.tournament || 'Fútbol'}: ${item.homeTeam} vs ${item.awayTeam}`;
  }

  function getMatchFlag(item) {
    if (item.flag && item.flag.endsWith(".svg")) return item.flag;
    const cat = (item.category || "").toLowerCase();
    const flagMap = {
      argentina: "img/flags/ar.svg",
      espana: "img/flags/es.svg",
      mexico: "img/flags/mx.svg",
      colombia: "img/flags/co.svg",
      brasil: "img/flags/br.svg",
      chile: "img/flags/cl.svg",
      peru: "img/flags/pe.svg",
      uruguay: "img/flags/uy.svg",
      bolivia: "img/flags/bo.svg",
      europa: "img/flags/europa.svg",
      conmebol: "img/flags/trophy_libertadores.svg"
    };
    return flagMap[cat] || (item.flag || "img/flags/es.svg");
  }

  function getMatchChannels(item) {
    if (!item.channels || item.channels.length === 0) {
      return [
        { name: "Fuente 1 Señal Principal HD", channel: "Señal Principal HD" },
        { name: "Fuente 2 Opción 2", channel: "Opción 2" },
        { name: "Fuente 3 Directo 1080p", channel: "Directo HD" }
      ];
    }
    return item.channels.map((ch, idx) => {
      if (typeof ch === "string") {
        return { name: `Fuente ${idx + 1} ${ch}`, channel: ch };
      }
      return ch;
    });
  }

  // Voting action
  function handleVote(matchId, choice) {
    const existing = getStoredVote(matchId);
    if (existing) {
      alert("¡Ya has registrado tu pronóstico para este partido!");
      return;
    }

    const match = agendaData.find(m => m.id === matchId);
    if (!match) return;

    if (!match.votes) {
      match.votes = { team1: 100, draw: 50, team2: 100 };
    }
    match.votes[choice] = (match.votes[choice] || 0) + 1;
    setStoredVote(matchId, choice);
    renderAgenda();
  }

  // Render Agenda Items
  function renderAgenda() {
    if (!menuContainer) return;

    menuContainer.innerHTML = agendaData.map((item) => {
      const userVote = getStoredVote(item.id);
      const perc = calculatePercentages(item.votes);
      const isOpen = openMatchId === item.id;
      const channelsList = getMatchChannels(item);
      const matchTitle = getMatchTitleDisplay(item);
      const flagSrc = getMatchFlag(item);

      return `
        <li class="agenda-item ${isOpen ? 'open' : ''}" data-id="${item.id}">
          <div class="agenda-head">
            ${getMatchTimeDisplay(item)}
            <img src="${flagSrc}" alt="Bandera" class="agenda-flag" onerror="this.style.display='none'">
            <span class="agenda-title">
              ${matchTitle}
            </span>
            <span class="agenda-arrow">${isOpen ? '&#9652;' : '&#9662;'}</span>
          </div>

          <ul class="agenda-submenu" style="display: ${isOpen ? 'block' : 'none'};">
            <!-- Official Signals List -->
            <div style="margin-bottom: 0.85rem;">
              <span style="font-size: 0.775rem; font-weight: 700; text-transform: uppercase; color: #64748b; display: block; margin-bottom: 0.45rem;">
                📺 Canales Oficiales de Transmisión:
              </span>
              ${channelsList.map((ch) => `
                <li class="agenda-option">
                  <a href="#player" class="agenda-link" data-match-id="${item.id}" data-match="${matchTitle}" data-channel="${ch.name}">
                    <span class="play-icon">&#9654;</span>
                    <span>${ch.name}</span>
                  </a>
                </li>
              `).join('')}
            </div>

            <!-- Community Prediction Voting Poll (From LIBREGOL_LIVE_19_SEP) -->
            <div class="row-voting" data-match-voting="${item.id}">
              <div class="voting-header-row">
                <span>🗳️ Pronóstico de los aficionados</span>
                <span class="total-votes-count">${perc.total.toLocaleString()} votos</span>
              </div>
              <div class="vote-pills-row">
                <button type="button" class="vote-pill ${userVote === 'team1' ? 'voted' : ''}" data-match-id="${item.id}" data-choice="team1">
                  <span>${item.homeTeam || 'Local'}</span>
                  <span class="perc-team1" style="font-size: 0.75rem; color: #16a34a;">${perc.team1}%</span>
                </button>
                <button type="button" class="vote-pill ${userVote === 'draw' ? 'voted' : ''}" data-match-id="${item.id}" data-choice="draw">
                  <span>Empate</span>
                  <span class="perc-draw" style="font-size: 0.75rem; color: #64748b;">${perc.draw}%</span>
                </button>
                <button type="button" class="vote-pill ${userVote === 'team2' ? 'voted' : ''}" data-match-id="${item.id}" data-choice="team2">
                  <span>${item.awayTeam || 'Visitante'}</span>
                  <span class="perc-team2" style="font-size: 0.75rem; color: #2563eb;">${perc.team2}%</span>
                </button>
              </div>
              <div class="vote-bar-container">
                <div class="vote-bar-team1" style="width: ${perc.team1}%;"></div>
                <div class="vote-bar-draw" style="width: ${perc.draw}%;"></div>
                <div class="vote-bar-team2" style="width: ${perc.team2}%;"></div>
              </div>
              <div class="vote-feedback-msg" style="display: ${userVote ? 'block' : 'none'};">
                ${userVote ? `✓ Tu pronóstico registrado: <strong>${userVote === 'team1' ? (item.homeTeam || 'Local') : (userVote === 'team2' ? (item.awayTeam || 'Visitante') : 'Empate')}</strong>` : ''}
              </div>
            </div>
          </ul>
        </li>
      `;
    }).join('');

    injectSportsEventsSchema(agendaData);
  }

  // Dynamic SportsEvent & BroadcastEvent Schema Injector for Google Live Match Snippets
  function injectSportsEventsSchema(matchesList) {
    if (!matchesList || matchesList.length === 0) return;
    try {
      const existing = document.getElementById("dynamicSportsEventSchema");
      if (existing) existing.remove();

      const sportsEvents = matchesList.slice(0, 10).map((m, idx) => {
        const home = m.homeTeam || "Equipo Local";
        const away = m.awayTeam || "Equipo Visitante";
        const title = m.title || `${home} vs ${away}`;
        const startDate = m.utcKickoff || new Date().toISOString();
        
        return {
          "@type": "SportsEvent",
          "@id": `https://futbollibrefullhd.online/#event-${m.id || idx}`,
          "name": title,
          "description": `Partido en directo de ${title}. Transmisión oficial en vivo con Fútbol Libre TV y Pelota Libre.`,
          "sport": "Soccer",
          "startDate": startDate,
          "homeTeam": {
            "@type": "SportsTeam",
            "name": home
          },
          "awayTeam": {
            "@type": "SportsTeam",
            "name": away
          },
          "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
          "location": {
            "@type": "VirtualLocation",
            "url": "https://futbollibrefullhd.online/"
          },
          "publication": {
            "@type": "BroadcastEvent",
            "name": `Transmisión oficial: ${title}`,
            "isLiveBroadcast": true,
            "startDate": startDate,
            "videoFormat": "HD"
          }
        };
      });

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "dynamicSportsEventSchema";
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@graph": sportsEvents
      });
      document.head.appendChild(script);
    } catch (e) {
      // Graceful fallback
    }
  }

  // Initial render of agenda
  renderAgenda();

  // Agenda Delegation Click Handler (Handles Accordion, Channel Open, and Fan Voting)
  if (menuContainer) {
    menuContainer.addEventListener("click", function (e) {
      // 1. Voting pill click
      const votePill = e.target.closest(".vote-pill");
      if (votePill) {
        e.stopPropagation();
        const mId = votePill.dataset.matchId;
        const choice = votePill.dataset.choice;
        handleVote(mId, choice);
        return;
      }

      // 2. Channel link click
      const channelLink = e.target.closest(".agenda-link");
      if (channelLink) {
        e.preventDefault();
        const matchId = channelLink.dataset.matchId;
        const matchTitle = channelLink.dataset.match;
        const channelName = channelLink.dataset.channel;
        const matchObj = agendaData.find(m => m.id === matchId);
        const signalsList = matchObj ? getMatchChannels(matchObj) : null;

        showPlayerView(matchTitle, channelName, matchTitle, signalsList, matchObj);
        return;
      }

      // 3. Accordion toggle click
      const head = e.target.closest(".agenda-head");
      if (head) {
        const item = head.closest(".agenda-item");
        const mId = item.dataset.id;
        openMatchId = openMatchId === mId ? null : mId;
        renderAgenda();
      }
    });
  }

  // =====================================================
  // 5. Dynamic Client-Side Auto-Sync Engine (From LIBREGOL_LIVE_19_SEP)
  // Automatically adds new matches, updates live scores/minutes,
  // and deletes old matches finished before yesterday.
  // =====================================================
  async function syncLiveMatchesFeed() {
    const espnLeagues = [
      { code: 'arg.1', name: 'Liga Profesional', flag: 'img/flags/ar.svg', category: 'argentina', channels: ['ESPN Premium HD', 'TNT Sports HD', 'TyC Sports', 'Directo HD'] },
      { code: 'mex.1', name: 'Liga MX', flag: 'img/flags/mx.svg', category: 'mexico', channels: ['TUDN En Vivo', 'ViX Premium', 'Canal 5 HD', 'Directo HD'] },
      { code: 'col.1', name: 'Liga BetPlay', flag: 'img/flags/co.svg', category: 'colombia', channels: ['Win Sports+', 'Win Sports Online', 'Directo HD'] },
      { code: 'esp.1', name: 'LaLiga EA Sports', flag: 'img/flags/es.svg', category: 'espana', channels: ['Movistar Plus+', 'DAZN LaLiga', 'ESPN Deportes', 'Directo HD'] },
      { code: 'ita.1', name: 'Serie A', flag: 'img/flags/it.svg', category: 'europa', channels: ['ESPN 1 HD', 'Disney+ Premium', 'Directo HD'] },
      { code: 'eng.1', name: 'Premier League', flag: 'img/flags/england.svg', category: 'europa', channels: ['ESPN 1 HD', 'DAZN 1', 'Disney+ HD', 'Directo HD'] },
      { code: 'uefa.champions', name: 'Champions League', flag: 'img/flags/europa.svg', category: 'europa', channels: ['ESPN 1 HD', 'Fox Sports 1 HD', 'Movistar+', 'Directo HD'] },
      { code: 'conmebol.libertadores', name: 'Copa Libertadores', flag: 'img/flags/trophy_libertadores.svg', category: 'conmebol', channels: ['Fox Sports 1 HD', 'ESPN 1 HD', 'Disney+', 'Directo HD'] },
      { code: 'chi.1', name: 'Primera División Chile', flag: 'img/flags/cl.svg', category: 'chile', channels: ['TNT Sports Chile', 'Estadio TNT', 'Directo HD'] },
      { code: 'per.1', name: 'Liga 1 MAX', flag: 'img/flags/pe.svg', category: 'peru', channels: ['Liga 1 MAX HD', 'Liga 1 Play', 'Directo HD'] },
      { code: 'bra.1', name: 'Brasileirão', flag: 'img/flags/br.svg', category: 'brasil', channels: ['Premiere HD', 'Globo', 'SporTV', 'Directo HD'] }
    ];

    function slugify(s) {
      return (s || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }

    try {
      const todayParam = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      const fetchPromises = espnLeagues.map(async (lg) => {
        try {
          let resp = await fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/${lg.code}/scoreboard?dates=${todayParam}`, {
            headers: { "Accept": "application/json" }
          });
          let json = resp.ok ? await resp.json() : null;
          let events = (json && json.events) || [];
          if (events.length === 0) {
            resp = await fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/${lg.code}/scoreboard`, {
              headers: { "Accept": "application/json" }
            });
            json = resp.ok ? await resp.json() : null;
            events = (json && json.events) || [];
          }
          return events.map(ev => {
            const comp = (ev.competitions && ev.competitions[0]) || {};
            const comps = comp.competitors || [];
            if (comps.length < 2) return null;
            const home = comps[0].homeAway === 'home' ? comps[0] : comps[1];
            const away = comps[0].homeAway === 'home' ? comps[1] : comps[0];
            const statusObj = ev.status || {};
            const state = (statusObj.type && statusObj.type.state) || 'pre';
            
            // Exclude finished matches completely (streaming users only want live & upcoming games)
            if (state === 'post') return null;

            const status = state === 'in' ? 'LIVE' : 'UPCOMING';
            const minute = state === 'in' ? (statusObj.displayClock || '') : '';
            const homeTeam = (home.team && home.team.displayName) || 'Equipo Local';
            const awayTeam = (away.team && away.team.displayName) || 'Equipo Visitante';
            const homeLogo = (home.team && home.team.logo) || 'img/teams/generic.svg';
            const awayLogo = (away.team && away.team.logo) || 'img/teams/generic.svg';
            const slug = slugify(homeTeam) + '-vs-' + slugify(awayTeam);

            const channelsObjs = lg.channels.map((ch, idx) => ({
              name: `Fuente ${idx + 1} ${ch}`,
              channel: ch
            }));

            return {
              id: `espn-${ev.id || slug}`,
              slug: slug,
              tournament: lg.name,
              flag: lg.flag,
              homeTeam: homeTeam,
              homeLogo: homeLogo,
              awayTeam: awayTeam,
              awayLogo: awayLogo,
              utcKickoff: ev.date || new Date().toISOString(),
              status: status,
              minute: minute,
              homeScore: null,
              awayScore: null,
              channels: channelsObjs,
              venue: (comp.venue && comp.venue.fullName) || 'Estadio Principal',
              category: lg.category,
              votes: {
                team1: 1500 + (homeTeam.length * 75),
                draw: 420 + (homeTeam.length * 20),
                team2: 1400 + (awayTeam.length * 70)
              }
            };
          }).filter(Boolean);
        } catch (e) {
          return [];
        }
      });

      const results = await Promise.all(fetchPromises);
      const flattened = results.flat();
      if (flattened.length === 0) return;

      // Keep only active and upcoming matches (no finished matches or scores)
      const freshMatches = flattened.filter(m => m.status === 'LIVE' || m.status === 'UPCOMING');

      // Sort: LIVE first -> UPCOMING chronologically
      freshMatches.sort((a, b) => {
        function rank(m) {
          if (m.status === 'LIVE') return 0;
          return 1;
        }
        const diff = rank(a) - rank(b);
        if (diff !== 0) return diff;
        return (a.utcKickoff || "").localeCompare(b.utcKickoff || "");
      });

      if (freshMatches.length > 0) {
        agendaData = freshMatches;
        window.LIBREGOL_MATCHES = freshMatches;
        renderAgenda();
        console.log(`[Fútbol Libre Full HD] Live real-time sync active: ${freshMatches.length} matches.`);
      }
    } catch (err) {
      console.warn("[Fútbol Libre Full HD] Live background sync note:", err.message);
    }
  }

  // Trigger client-side real-time sync on load and every 3 minutes
  syncLiveMatchesFeed();
  setInterval(syncLiveMatchesFeed, 180000);

  // =====================================================
  // 6. Channel Cards & Navbar Click Handlers
  // =====================================================
  document.querySelectorAll(".nav-channel-btn, .modal-channel-btn").forEach(btn => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const channel = this.dataset.channel || this.textContent.trim();
      const title = this.dataset.title || `${channel} en Vivo`;
      if (menuModal) menuModal.classList.remove("active");
      showPlayerView(title, channel);
    });
  });

  document.querySelectorAll(".watch-channel-card").forEach(btn => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const channel = this.dataset.channel;
      const title = this.dataset.title;
      showPlayerView(title, channel);
    });
  });

});
