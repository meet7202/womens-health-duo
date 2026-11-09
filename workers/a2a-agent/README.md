# A2A agent worker

This worker exposes a minimal A2A-compatible endpoint for `womenshealthduo.com`.

## Endpoints

- `GET` / `HEAD https://womenshealthduo.com/a2a` — agent card JSON (`HEAD` for Cloudflare/uptime probes)
- `POST https://womenshealthduo.com/a2a` — accepts a minimal A2A-style message payload and responds with a structured result
- `OPTIONS https://womenshealthduo.com/a2a` — handles CORS preflight

## Deploy

```sh
# From repo root (or cd workers/a2a-agent && npm run deploy)
npm run deploy:a2a-agent
```

Requires a fresh `npx wrangler login` if the local OAuth token expired. If route attachment fails, set `account_id` in `wrangler.toml`.

## Notes

This is intentionally a minimal protocol implementation for discovery and compatibility. It is not a full multi-user or streaming agent backend; it is a static, bounded agent card plus message processing layer suitable for DNS-AID discovery and early compatibility work.
