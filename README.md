# Futbol Agenda - Sports Portal Template

A fast, modern, responsive football schedule and match portal designed for high SEO visibility, clean UI, and fast mobile performance.

## 🚀 Key Features

1. **Dark Mode UI**: Clean, sleek sports interface optimized for mobile and desktop.
2. **Dynamic Match Filter**: Filter by status (*Todos*, *En Vivo*, *Próximos*, *Finalizados*) and by leagues (*Champions League, LaLiga, Premier League, etc.*).
3. **Live Search**: Instant client-side search for team and league names.
4. **Broadcast Information Modal**: Shows legal TV and streaming rights holders (ESPN, Star+, DAZN, Movistar, etc.) for each fixture.
5. **SEO Architecture**:
   - Structured Semantic HTML5 tags (`<article>`, `<section>`, `<nav>`).
   - Rich Snippet ready metadata and OpenGraph tags.
   - FAQ Accordion and keyword-rich guide text at the bottom.

## 📂 Project Structure

```
football-portal/
├── index.html     # Main HTML document with SEO metadata & semantic structure
├── styles.css     # Responsive CSS styling with dark theme
├── app.js         # Interactive filtering, search, and modal handling
└── README.md      # Setup and expansion documentation
```

## 🌐 Connecting Live Sports APIs

To fetch live matches automatically instead of static data, you can integrate free football APIs into `app.js`:

1. **Football-Data.org (Free Tier)**:
   - Provides Premier League, Champions League, LaLiga schedules & scores.
   - Example endpoint: `https://api.football-data.org/v4/matches`
2. **API-Football (RapidAPI)**:
   - Full live coverage, lineups, statistics, and crests.

## 💡 SEO & Legal Monetization Strategy

- **Keyword Targeting**: Target search intent around *"partidos de hoy"*, *"horario y donde ver [Equipo A] vs [Equipo B]"*, *"canales de transmision"*.
- **Monetization**:
  - Google AdSense / Display Ad Networks (Clean content ensures approved ad accounts).
  - Affiliate partnerships with official sports streaming services (Disney+, DAZN, FuboTV, Paramount+).
  - Sports newsletter sponsorships.
