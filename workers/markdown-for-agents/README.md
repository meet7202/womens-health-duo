# Markdown for Agents (Cloudflare Worker)

Free-plan alternative to Cloudflare Pro **Markdown for Agents**. When a client sends `Accept: text/markdown`, this Worker fetches the origin HTML (GitHub Pages static shell), converts it to Markdown, and returns `Content-Type: text/markdown` with `x-markdown-tokens`.

Normal browser requests are unchanged (pass-through).

## Prerequisites

- Cloudflare **Free** plan is fine (Worker free tier: 100k requests/day).
- Zone `womenshealthduo.com` on your Cloudflare account.
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) (`npm install` runs in this folder).

## One-time deploy

```sh
# From repo root
npm run deploy:markdown-worker
```

First run will open a browser for `wrangler login` if you are not authenticated.

### If routes fail to attach

1. Copy your **Account ID** from Cloudflare dashboard → any zone → Overview (right column).
2. Uncomment and set `account_id` in [`wrangler.toml`](wrangler.toml), or run:
   ```sh
   cd workers/markdown-for-agents && npx wrangler deploy
   ```

Alternatively attach routes manually: **Workers & Pages** → `whd-markdown-for-agents` → **Triggers** → Add route `womenshealthduo.com/*`.

## Verify production

```sh
# Markdown negotiation
curl -sI -H "Accept: text/markdown" https://womenshealthduo.com/ | grep -iE 'content-type|vary|x-markdown'

# Sample body
curl -s -H "Accept: text/markdown" https://womenshealthduo.com/faq | head -40

# Browsers still get HTML
curl -sI https://womenshealthduo.com/ | grep -i content-type
```

Expected: `content-type: text/markdown; charset=utf-8` and `vary` includes `Accept`.

## Limits

- Converts **origin HTML only** (static SEO shells), not post-React DOM — same as crawlers.
- Skips `/assets/`, `/images/`, `/.well-known/`, and non-HTML extensions.
- HTML origin responses larger than **2 MB** fall back to HTML.
- Re-deploy this Worker only when `workers/markdown-for-agents/` changes — independent of GitHub Pages site deploys.

## Local dev

```sh
cd workers/markdown-for-agents
npm install
npm run dev
```

Then `curl -H "Accept: text/markdown" http://localhost:8787/` against the dev server.
