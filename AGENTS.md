# AGENTS.md

## Project Overview

**Preachers & Pros** is a cinematic marketing site for a golf conversation series. Built on TanStack Start (SSR React meta-framework) and deployed on Netlify.

## Directory Structure

```
src/
  components/
    PreachersApp.tsx     # Entire site: all pages, nav, footer, SVG assets, forms
  routes/
    __root.tsx           # HTML shell (title, meta, body wrapper)
    index.tsx            # Single route — mounts PreachersApp
  styles.css             # Minimal Tailwind import + body reset
public/
  __forms.html           # Static form skeleton for Netlify Forms detection
  favicon.ico
netlify.toml             # Build config: vite build, publish dist/client
```

## Architecture Decisions

### Single-component SPA routing
All seven pages (HOME, EPISODES, ABOUT, MERCH, WATCH, COMMUNITY, CONTACT) are rendered by `PreachersApp.tsx` using `useState` for page switching rather than TanStack Router file-based routes. This keeps the entire site in one file for easy editing and avoids unnecessary route splitting for a content-light marketing site.

### Styling approach
The site uses injected `<style>` blocks (via a `GlobalStyle` component) for global CSS classes (`.bebas`, `.btn-primary`, `.episode-card`, etc.) combined with inline `style` props for component-level layout. Tailwind is imported but minimally used — the design system is self-contained in the `C` constants object and the GlobalStyle component.

### SVG-only visuals
All imagery (hero scene, episode thumbnails, merchandise illustrations) is rendered as inline SVG — no external image files required. This keeps the repo lightweight and avoids broken images.

### Netlify Forms (AJAX)
Because TanStack Start is an SSR framework, the Netlify build bot cannot detect client-rendered forms. The solution:
1. `public/__forms.html` — static skeleton registering both forms at build time
2. Forms submit via `fetch('/__forms.html', { method: 'POST', ... })` (NOT `/`) to bypass the SSR catch-all function
3. Honeypot `bot-field` inputs added to both forms for spam protection

## Coding Conventions

- **TypeScript strict mode** — all props typed explicitly
- **No external state library** — `useState`/`useRef` only
- **`useFadeIn` hook** — IntersectionObserver-based scroll animation, reused across sections
- **Design tokens** — colors live in the `C` constant at the top of `PreachersApp.tsx`
- **Component naming** — page components suffixed with `Page` (e.g. `HomePage`, `MerchPage`)

## Key Concepts

### File-Based Routing (TanStack Router)
Routes are defined by files in `src/routes/`:
- `__root.tsx` - HTML shell wrapping all pages
- `index.tsx` - Route for `/` — renders the full `PreachersApp` SPA

### Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite plugins: TanStack Start, Netlify, Tailwind |
| `tsconfig.json` | TypeScript config with `@/*` path alias for `src/*` |
| `netlify.toml` | Build command, output directory, dev server settings |
| `styles.css` | Tailwind import + minimal body reset |

## Development Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
netlify dev      # Local Netlify emulation (port 8888, includes forms)
```

## Adding Content

- **New episode**: Add to the `episodes` arrays in `HomePage` and `EpisodesPage`
- **New merch item**: Add to the `products` array in `MerchPage`
- **New page**: Add page name to `pages` array, add a `case` in `renderPage()`, create a new page component

## Environment Variables

No environment variables required for the base site.
