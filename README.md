# Women's Health Duo

Site: [womenshealthduo.com](https://womenshealthduo.com/)

Marketing site for Dr. Charmi Shah and Dr. Zalak Shah — **Women's Health Duo**.

**Stack:** Vite, React, TypeScript, Tailwind CSS, shadcn/ui.

## Requirements

- [Node.js](https://nodejs.org/) (LTS)
- npm

### Git hooks on locked-down laptops

If `git commit` fails with messages about **SSH certs**, **internal CLI wrappers**, or similar, your **global** Git hooks are probably intercepting commits. This repo is public and does not depend on any employer middleware.

**Optional fix (this clone only):** point Git at the empty hook directory in this repo, then commit as usual:

```sh
git config core.hooksPath .githooks
```

That only updates **`.git/config`** here; it is not committed. See [`.githooks/README.md`](./.githooks/README.md). To undo: `git config --unset core.hooksPath`.

This project uses **standard `git`** plus the **GitHub website** for pull requests — **not** the `gh` CLI. After you **`git push`** your branch, open:  
`https://github.com/meet7202/womens-health-duo/compare/main...<your-branch>?expand=1`  
(substitute your branch name; then use **Create pull request** on GitHub).

## Run locally

```sh
git clone https://github.com/meet7202/womens-health-duo.git
cd womens-health-duo
npm install
npm run dev
```

Dev server: **http://localhost:8080/**

## Scripts

| Command                | Description                |
| ---------------------- | -------------------------- |
| `npm run dev`          | Development server         |
| `npm run build`        | Production build → `dist/` |
| `npm run preview`      | Serve `dist/` locally      |
| `npm run lint`         | ESLint                     |
| `npm run lint:fix`     | ESLint with `--fix`        |
| `npm run format`       | Prettier write             |
| `npm run format:check` | Prettier check (CI)        |
| `npm run typecheck`    | TypeScript (`tsc -b`)      |

## Environment & production URL

Default public URL: **`https://womenshealthduo.com`** (see [`src/config/site.defaults.ts`](src/config/site.defaults.ts)).

- Copy [`.env.example`](./.env.example) to `.env` and set **`VITE_SITE_URL`** if you use another domain (no trailing slash).
- The [GitHub Actions workflow](.github/workflows/deploy-github-pages.yml) sets `VITE_SITE_URL` for CI builds so HTML meta, `robots.txt`, and sitemap files (`sitemap.xml` + `sitemap-virtual-service-cities.xml`) match production.

## Performance

Production build uses code splitting (lazy sections below the fold), shared vendor chunks, trimmed Google Font weights, and image `sizes` / lazy loading where appropriate. After `npm run build`, use `npm run preview` and Chrome DevTools → **Lighthouse** (mobile and desktop) to measure Core Web Vitals.

Large JPEGs in `src/assets/` (hero and doctor photos) dominate payload; compressing or serving WebP/AVIF will improve load scores further.

## GitHub Pages

### Repo contents

- **GitHub repository:** [meet7202/womens-health-duo](https://github.com/meet7202/womens-health-duo)
- [`.github/workflows/deploy-github-pages.yml`](.github/workflows/deploy-github-pages.yml) — on push to **`main`** or **`master`**: `npm ci`, `npm run build`, upload `dist/`, deploy to Pages. Uses **`upload-pages-artifact@v5`** with **`include-hidden-files: true`** so **`.nojekyll`** is included.
- [`public/CNAME`](./public/CNAME) — custom hostname for Pages.
- [`public/.nojekyll`](./public/.nojekyll) — disables Jekyll for static assets.
- Build copies **`index.html` → `404.html`** in `dist/` so unknown URLs still load the app shell (fallback only).
- Build also writes **`dist/<path>/index.html`** for every pathname in **`SITEMAP_PATHS`** (primary **`sitemap.xml`** ∪ supplemental long-tail; see `src/config/routes.ts`) plus legacy **`/global-online/*`** slugs, so real files exist for each sitemap URL and GitHub Pages returns **HTTP 200** (not only `404.html` with status 404) for crawlers and the Network tab. **Public URLs stay `/path`** (no `index.html`); sitemap and in-app links use those paths only. If something opens `…/index.html`, the app replaces it with the clean path ([`NormalizeIndexHtmlUrl.tsx`](src/components/layout/NormalizeIndexHtmlUrl.tsx)).

### One-time setup

1. **Settings → Pages → Build and deployment:** set **Source** to **GitHub Actions** (not “Deploy from a branch”).
2. Push to `main` / `master` or run the workflow manually.
3. **Custom domain:** **Settings → Pages → Custom domain** → `womenshealthduo.com` (aligned with `public/CNAME`). Add DNS **A / AAAA** records from [GitHub’s apex domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain), then enable **Enforce HTTPS** when available.

### `www` instead of apex

Update [`public/CNAME`](./public/CNAME), `SITE_DEFAULT_URL` in `site.defaults.ts`, and `VITE_SITE_URL` in the workflow to your `www` URL. Use GitHub’s [www subdomain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-a-subdomain) DNS instructions.

### Other hosts

`npm run build` outputs static files in **`dist/`**; you can deploy that folder to Netlify, Cloudflare Pages, S3, etc.

## SEO

- **Meta & canonical:** injected at build from `site.defaults` / `VITE_SITE_URL` (see [`index.html`](index.html), [`vite.config.ts`](vite.config.ts)).
- **Structured data:** Schema.org JSON-LD in [`src/components/seo/JsonLd.tsx`](src/components/seo/JsonLd.tsx) (`MedicalOrganization`, `Physician`, `WebSite`).
- **Crawlers:** [`public/llms.txt`](./public/llms.txt); `robots.txt` and **`sitemap.xml`** (primary urlset; omits service×city matrix) plus **`sitemap-virtual-service-cities.xml`** (those URLs only) are written into **`dist/`** on build.
- **Cursor / Bing / AI search:** WHD-specific prompt pack and architecture snapshot — [`docs/seo-cursor-playbook.md`](./docs/seo-cursor-playbook.md), [`docs/seo-architecture-audit.md`](./docs/seo-architecture-audit.md).
- After launch, submit **`https://womenshealthduo.com/sitemap.xml`** in [Google Search Console](https://search.google.com/search-console) and Bing Webmaster Tools.

This project is a standard static Vite + React site with a self-contained bundle (no third-party hosted builder runtime).

## Maintainer notes (AI-assisted)

Updates are expected from **Cursor / Claude** agents. See **[`AGENTS.md`](./AGENTS.md)** for invariants (SEO URLs, GitHub Pages, social links, toast hooks, verification commands). Keep that file in sync when you change deploy or SEO behavior.

**Git:** always ship through a **pull request into `main`** (see [`.cursor/rules/git-pr-workflow.mdc`](./.cursor/rules/git-pr-workflow.mdc)); do not push feature work directly to `main`.
