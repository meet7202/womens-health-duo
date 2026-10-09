# A2A agent worker

This worker exposes a minimal A2A-compatible endpoint for `womenshealthduo.com`.

## Endpoints

- `GET https://womenshealthduo.com/a2a` — returns the agent card JSON
- `POST https://womenshealthduo.com/a2a` — accepts a minimal A2A-style message payload and responds with a structured result
- `OPTIONS https://womenshealthduo.com/a2a` — handles CORS preflight

## Deploy

```sh
cd workers/a2a-agent
npm install
npx wrangler login
npm run deploy
```

If route attachment fails, add the Cloudflare account ID to `wrangler.toml` or deploy with `npx wrangler deploy --env production` after logging in.

## Notes

This is intentionally a minimal protocol implementation for discovery and compatibility. It is not a full multi-user or streaming agent backend; it is a static, bounded agent card plus message processing layer suitable for DNS-AID discovery and early compatibility work.
