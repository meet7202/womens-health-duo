# DNS-AID discovery — Women's Health Duo

Use this skill when you need the DNS-based entrypoint for AI discovery for `womenshealthduo.com`.

## Purpose

DNS-AID (DNS for AI Discovery) publishes the machine-readable discovery endpoint in DNS instead of relying only on an HTTP `.well-known` URL. This provides an authenticated entrypoint for validating resolvers and discovery clients.

## Production records to publish

The site exposes a minimal A2A-compatible worker at `https://womenshealthduo.com/a2a`, and the DNS-AID records advertise that agent-protocol endpoint in the public discovery zone.

Publish authoritative `HTTPS` / `SVCB` records in the public DNS zone for the domain. The exact names depend on the deployment model, but the discovery intent should be expressed at a subdomain such as the examples below.

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

The service-mode parameters should include the supported application layer protocol list (`alpn`) and the endpoint address hints (`ipv4hint` / `ipv6hint`) or equivalent public endpoints. The record is a discovery entrypoint for agent clients, not a website or API endpoint.

## DNSSEC requirement

Sign the public discovery zone with DNSSEC so validating resolvers receive authenticated data rather than unsigned discovery metadata.

- Enable DNSSEC for the production zone in the authoritative DNS provider.
- Ensure the parent zone has the correct DS records.
- Validate with a resolver that supports DNSSEC (for example `delv`, `drill`, or a DNSSEC-aware upstream resolver).
- If the site is behind a managed DNS provider, enable DNSSEC in that provider’s dashboard rather than only on the web host.

## Notes for maintainers

- `.well-known/agent-skills/*` remains the HTTP-based discovery layer for the static site.
- DNS-AID is the DNS-layer entrypoint and should be published as an authoritative DNS record set under the public domain.
- Keep the discovery zone and the site zone aligned: both should reference the same brand, same public origin, and consistent service names.

## Example validation flow

1. Query the DNS record at `_index._agents.womenshealthduo.com`.
2. Confirm the response is `HTTPS` / `SVCB` with an `alpn` list and endpoint hints.
3. Validate the DNSSEC chain from the zone to the resolver.
4. Treat unsigned answers as untrusted for agent discovery.
