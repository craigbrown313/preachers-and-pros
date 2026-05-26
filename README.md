# Preachers & Pros

A cinematic marketing site for **Preachers & Pros** — a documentary-style golf conversation series exploring pressure, identity, purpose, faith, leadership, and discipline on the golf course.

## Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) with file-based routing
- **Frontend**: React 19, TypeScript (strict)
- **Build**: Vite 7
- **Styling**: Tailwind CSS 4 + custom inline styles with CSS-in-JS via `<style>` injection
- **Deployment**: Netlify (with Netlify Forms)
- **Fonts**: Bebas Neue (display) + Manrope (body) via Google Fonts

## Getting Started

```bash
npm install
npm run dev        # Start dev server at http://localhost:3000
npm run build      # Production build
npm run preview    # Preview production build
```

For local Netlify feature emulation (forms, edge functions, etc.):

```bash
netlify dev        # Starts at http://localhost:8888
```

## Pages

| Route | Description |
|-------|-------------|
| Home | Hero, featured episodes, quote, stats, social links, merch teaser |
| Episodes | Full season one episode listing with descriptions |
| About | Mission statement, series pillars, CTA |
| Merch | Filterable apparel grid with category tabs |
| Watch | Featured video player, YouTube link, episode cards |
| Community | Social platform links, newsletter signup |
| Contact | AJAX contact form with inquiry type selection |

## Forms

Two Netlify Forms are active:
- **newsletter** — email subscription (Community page)
- **contact** — full inquiry form (Contact page)

Both submit via AJAX to `/__forms.html` as required for SSR/SPA apps on Netlify.
