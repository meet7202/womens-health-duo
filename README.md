# Women's Health Duo

Live site: **[womenshealthduo.com](https://womenshealthduo.com/)**

Marketing site for **Women's Health Duo** — Dr. Charmi Shah and Dr. Zalak Shah.

Stack: [Vite](https://vitejs.dev/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/).

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm (comes with Node)

## Run locally

```sh
cd womens-health-duo
npm install
npm run dev
```

The dev server listens on **http://localhost:8080/** by default.

This repo includes a [`.npmrc`](./.npmrc) that uses the public npm registry (`registry.npmjs.org`) so installs behave the same on any machine.

## Production URL

Canonical site: **`https://womenshealthduo.com`** (no trailing slash in config).

- Defaults live in [`src/config/site.defaults.ts`](./src/config/site.defaults.ts) (`SITE_DEFAULT_URL`).
- Override locally with `VITE_SITE_URL` in `.env` (see [`.env.example`](./.env.example)).
- The GitHub Actions workflow sets `VITE_SITE_URL` for builds so SEO files match production.

## Other scripts

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run build`   | Production build to `dist/`      |
| `npm run preview` | Serve the production build locally |
| `npm run lint`    | Run ESLint                         |

## Deploy on GitHub Pages (this project)

The repo is set up for **GitHub Actions → GitHub Pages** with custom domain **`womenshealthduo.com`**.

### What’s already in the repo

- [`.github/workflows/deploy-github-pages.yml`](./.github/workflows/deploy-github-pages.yml) — builds on push to `main` or `master` and deploys `dist/`.
- [`public/CNAME`](./public/CNAME) — tells GitHub Pages the custom hostname (`womenshealthduo.com`).
- [`public/.nojekyll`](./public/.nojekyll) — disables Jekyll so static assets behave predictably.
- **SPA routing:** after each build, `index.html` is copied to **`404.html`** so direct URLs and refreshes on unknown paths still load the React app (needed for GitHub Pages + `BrowserRouter`).

### One-time GitHub setup

1. **Push** this repository to GitHub (if it isn’t already).
2. **Settings → Pages**
   - **Build and deployment → Source:** choose **GitHub Actions** (not “Deploy from a branch” unless you prefer that older flow).
3. **Settings → Pages → Custom domain**
   - Enter **`womenshealthduo.com`** and save. GitHub may already detect it from `public/CNAME` after the first successful deploy.
   - Enable **Enforce HTTPS** once DNS and the certificate are ready.
4. **DNS at your registrar** (for apex `womenshealthduo.com`), add GitHub’s recommended records. Commonly for the apex you add **A** (and optional **AAAA**) records pointing to GitHub Pages; exact IPs can change — follow the current list under GitHub’s docs: [Configuring an apex domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain).
5. Wait for DNS + TLS (often minutes to a few hours). Open **https://womenshealthduo.com** and confirm the site loads.
6. **Optional:** In repository **Settings → Pages**, you can set a branch rename default to `main` if you use `main` only; the workflow triggers on **`main` or `master`**.

### After each push

Workflow runs **`npm ci` → `npm run build`** (with `VITE_SITE_URL=https://womenshealthduo.com`) and publishes **`dist/`** to Pages.

### If you use `www` instead of apex

1. Change [`public/CNAME`](./public/CNAME) to `www.womenshealthduo.com`.
2. Set `SITE_DEFAULT_URL` and CI `VITE_SITE_URL` to **`https://www.womenshealthduo.com`** so canonicals, `sitemap.xml`, and Open Graph stay consistent.
3. Configure DNS for the `www` name per GitHub’s [www subdomain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-a-subdomain) instructions.

### Other hosts

`npm run build` still outputs a normal static **`dist/`** folder; you can upload it to Netlify, Cloudflare Pages, S3, etc., if you ever move off GitHub Pages.

## SEO & discoverability

- **Canonical URL & social previews:** `https://womenshealthduo.com` is the default; CI passes `VITE_SITE_URL` so builds stay aligned. [`src/config/site.defaults.ts`](./src/config/site.defaults.ts) holds titles, descriptions, and keywords.
- **Structured data:** The home page emits Schema.org JSON-LD (`MedicalOrganization`, `Physician`, `WebSite`) in [`src/components/seo/JsonLd.tsx`](./src/components/seo/JsonLd.tsx).
- **AI / LLM crawlers:** [`public/llms.txt`](./public/llms.txt) summarizes the practice. `robots.txt` (generated in `dist/` at build) lists a `Sitemap` URL on your domain.
- **Search Console / Bing:** Submit **`https://womenshealthduo.com/sitemap.xml`** after go-live.

### Lovable / vendor footprint

There are **no Lovable domains, scripts, or meta tags** in this codebase (no `lovable-tagger`, no Lovable Open Graph images, no Lovable README workflow). The app is a standard Vite + React static site suitable for GitHub Pages and normal SEO.

## SEO note

Technical SEO helps discovery; it does not guarantee ranking. Keep content accurate and match the real services and locations you offer.
