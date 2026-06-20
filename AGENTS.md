# Agent maintainer guide (Cursor / Claude)

This repository is intended to be updated primarily by coding agents. Use this file as the **source of truth for invariants and gotchas**; keep it accurate when you change behavior.

## Verify before finishing a task

Run, in order:

```sh
npm run lint && npm run format:check && npm run typecheck && npm run build
```

Fix failures before handing work back. Prefer **`npm run format`** (or editor format-on-save) over manual whitespace edits.

## Product intent (do not regress without explicit ask)

- **Site:** static marketing site for **Women’s Health Duo** — Dr. Charmi Shah (OB-GYN / IVF / laparoscopy) and Dr. Zalak Shah (women’s health physio / STOTT Pilates).
- **Canonical host:** `https://womenshealthduo.com` (no trailing slash in env and defaults).
- **Social links in code:** **Instagram, YouTube, WhatsApp only** — do **not** add Twitter/X profile URLs to `CONTACT` or JSON-LD `sameAs`. (HTML may still use generic `twitter:card` meta for link previews; that is not an X account link.)
- **No Lovable/Uber** vendor scripts or hosted runtime — standard Vite + React bundle only.

## Where truth lives (edit in the right place)

| Concern                                                          | Location                                                                                 | Notes                                                                                                                                                                                                                         |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Default title, description, keywords, **CONTACT**, OG image path | [`src/config/site.defaults.ts`](src/config/site.defaults.ts)                             | Imported by Node at build time — **must not** use `import.meta` here.                                                                                                                                                         |
| Runtime canonical URL in the app                                 | [`src/config/site.ts`](src/config/site.ts)                                               | Uses `import.meta.env.VITE_SITE_URL` with fallback to `SITE_DEFAULT_URL`.                                                                                                                                                     |
| HTML `<head>` placeholders, canonical, OG                        | [`index.html`](index.html)                                                               | Tokens like `@@SEO_SITE_URL@@` are replaced at build by Vite (see below).                                                                                                                                                     |
| `robots.txt` + `sitemap.xml` in `dist/`                          | [`vite.config.ts`](vite.config.ts)                                                       | Written in `closeBundle` from resolved `VITE_SITE_URL` / default. URLs must stay consistent with `site.ts`.                                                                                                                   |
| Schema.org JSON-LD                                               | [`src/components/seo/JsonLd.tsx`](src/components/seo/JsonLd.tsx)                         | Keep physician names, specialties, and `sameAs` aligned with `site.defaults` and visible page copy.                                                                                                                           |
| Crawler hint file                                                | [`public/llms.txt`](public/llms.txt)                                                     | Shipped as static asset.                                                                                                                                                                                                      |
| GitHub Pages deploy                                              | [`.github/workflows/deploy-github-pages.yml`](.github/workflows/deploy-github-pages.yml) | **`configure-pages`**, **`npm run build`**, verify **`dist/`** (incl. **`.nojekyll`**, **`404.html`**), then **`upload-pages-artifact@v5`** with **`include-hidden-files: true`**. **`VITE_SITE_URL`** must match production. |
| Apex vs `www`                                                    | `public/CNAME`, `SITE_DEFAULT_URL`, workflow `VITE_SITE_URL`                             | All three must agree if the hostname changes.                                                                                                                                                                                 |

## Build-time HTML SEO (`@@SEO_*@@`)

[`vite.config.ts`](vite.config.ts) replaces tokens in `index.html` during build. If you add a new placeholder, wire it in `htmlSeoReplacements()` and document it in `index.html` comments or here.

## GitHub Pages SPA routing

The Vite plugin copies **`dist/index.html` → `dist/404.html`** so client-side routes work on Pages. If you change `build.outDir` or remove that step, update this file and the README.

## GitHub Pages: `*.github.io/<repo>/` vs custom domain

Project sites load at **`https://<user>.github.io/<repo>/`**. A Vite default **`base: '/'`** makes the browser request **`/assets/...`** (wrong host path → 404). This repo uses **`base: './'`** in [`vite.config.ts`](vite.config.ts) so script/CSS URLs resolve under both the **repo subpath** and the **custom domain apex**.

[`src/App.tsx`](src/App.tsx) sets **`BrowserRouter`** `basename` to **`/womens-health-duo`** only when `location.pathname` is under that prefix (production). If the GitHub **repository is renamed**, update **`GITHUB_PAGES_REPO_BASE`** in `App.tsx` to match the new path segment.

## Performance conventions

- Below-the-fold sections are **lazy-loaded** where the app already does so; keep heavy dependencies out of the initial chunk when practical.
- **Large images** in `src/assets/` dominate LCP; prefer compression or modern formats when replacing assets.
- **`manualChunks`** in `vite.config.ts` splits large vendors (React, Radix, motion, etc.). **Do not** add a catch-all bucket that merges unrelated `node_modules` into one file — it can cause production TDZ errors (`Cannot access '…' before initialization`). Remaining deps should use Rollup’s default splitting.

## UI / shadcn

- Path alias **`@` → `src`** (see `vite.config.ts`, `tsconfig`).
- **`src/components/ui/use-toast.ts`** re-exports from **`src/hooks/use-toast.ts`** — implement toast logic only in `hooks`; keep the re-export thin.
- ESLint may relax **`react-refresh/only-export-components`** under `src/components/ui/**` for shadcn-style patterns — do not blanket-disable for the whole tree.

## Trunk

[`.trunk/trunk.yaml`](.trunk/trunk.yaml) enables additional linters (markdown, yaml, security scanners). CI in this repo is driven by **npm scripts**; Trunk is optional locally. If Trunk and ESLint disagree, prefer aligning config or fixing the underlying issue rather than ignoring both.

## Git

Do **not** create commits or push unless the user explicitly asked in that conversation. Follow any **commit / PR** user rules they have enabled.

When updating behavior described here, **update `AGENTS.md` in the same change** so the next agent sees current facts.
