# DNS-AID for agent discovery

This project already exposes HTTP-based agent discovery via `/.well-known/agent-skills/*`, but production DNS-AID should also be published as authoritative `HTTPS` / `SVCB` records for the public domain.

## Required pattern

Use a DNS discovery subdomain under the main site zone, for example:

- `_index._agents.womenshealthduo.com`
- `_a2a._agents.womenshealthduo.com`

Each record should use the `HTTPS` (or `SVCB`) record type and include `alpn` and endpoint data, such as:

```dns
_index._agents.womenshealthduo.com. 300 IN HTTPS 1 \
  alpn="h2" \
  alpn="http/1.1" \
  port=443 \
  ipv4hint=203.0.113.10 \
  ipv6hint=2001:db8::10

_a2a._agents.womenshealthduo.com. 300 IN HTTPS 1 \
  alpn="a2a" \
  alpn="h2" \
  port=443 \
  ipv4hint=203.0.113.10 \
  ipv6hint=2001:db8::10
```

These examples are illustrative; replace the endpoint values with the production public addresses that serve the agent-discovery material.

## DNSSEC

Enable DNSSEC on the authoritative zone before relying on the records for authenticated discovery.

- Cloudflare: enable DNSSEC in the zone dashboard.
- Route53: create the hosted zone and publish the DS records in the parent zone.
- Validate using a DNSSEC-aware resolver before pushing production traffic.

## Why this matters

Validating resolvers should only trust discovery records that are authenticated by DNSSEC. The `.well-known` files remain important for browser and HTTP-based discovery, but DNS-AID adds a DNS-layer entrypoint that can be used by discovery clients that prefer service-mode resolution.

## Related files

- `public/.well-known/agent-skills/`
- `src/build/agentDiscovery.ts`
- `public/llms.txt`
