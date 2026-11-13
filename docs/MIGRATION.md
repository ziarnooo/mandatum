# Migration — local version ready for review

**M01 — Elizabeth can maintain the website with Claude Code.** Local implementation complete; owner review and production release pending. Scope: Astro migration plus the November 6, 2026 email changes. Acceptance: approved desktop/mobile preview, preserved content, all agreed pages, functional donor links, and preview-before-push instructions.

## Implemented

- Seven pages: Home, About us, Partnerships, Testimonials, Contact, FAQ, Donate. Original page paths preserved.
- Homepage: existing military/civilian handshake photo replaces the tie photo; stronger Donate CTA; supplied introduction; three pillars; two impact metrics; overview moved to About. Existing mission, vision, values and past events retained. Partners, testimonials, FAQ and donation content now have dedicated destinations.
- Testimonials: all three source testimonials retained with complete available text. Extensible JSON list.
- Donate: existing PayPal and Venmo accounts, inactive Zeffy card, check instructions and supplied mailing address. The old PayPal URL mistakenly contained a second Venmo URL; normalized to the same Foundation PayPal account.
- About: overview before trident explanation; CEO preserved; Directors before Advisors; requested removals/additions/titles; existing biographies and photos retained; new members have silhouette placeholders. Removed bottom contact/donation sections.
- FAQ: nine original questions, category structure, four additional draft answers derived from existing site facts. The Foundation should review the additional answers and confirm program details before release.
- Contact: form with validation, Turnstile and native Cloudflare email delivery; preview checks inputs without sending. Email fallback retained. Activation requires `CLOUDFLARE-SETUP.md`.
- New visual treatment and hero copy are proposals for owner review; the supplied introductory paragraph is preserved verbatim.
- Agent editing instructions and owner guide. Local preview is the approval gate; future edits require preview approval before push.

## Version review

The release controller shows **V1 · Original + corrections** and **Design V2** (internal `/review/v3/`). Design V2 includes uniform-to-suit hero photos, scroll-driven testimonials, stacking Values and biography sheets only for supplied biographies. About places Values before leadership and film/events at the bottom. Other experimental directions stay local and are excluded from the Pages package. See `REVIEW.md` for the current candidate and verification status.

## Content dependencies

| ID | Needed | Current handling | Source/owner from email |
| --- | --- | --- | --- |
| M02 | Updated Fellow/immersion counts | Existing 60 / 21 explicitly labeled historical and awaiting confirmation | Jurate |
| M03 | New headshots and biographies | Names/titles + silhouettes; no invented bios | Jurate |
| M04 | Zeffy URL and QR | Card says coming soon; no fake link or QR | Foundation |
| M05 | Additional Support Us copy | Existing approved donation message retained | Bill |
| M06 | Justin Karls testimonial | Not supplied in this thread; omitted until exact quote arrives | Bill / Elizabeth |
| M07 | Expanded FAQ and hero approval | Existing handshake used; factual draft FAQ expansion awaits review | Bill / Elizabeth |

## Production dependencies

- M08 — Cloudflare is the chosen production host; a public GitHub repository is planned. Use GitHub Issues for follow-up work. Empty public repo `ziarnooo/mandatum` exists. Automatic approval review blocked the initial push pending approval of revised V1/V2; Pages is not deployed. Production Cloudflare remains pending.
- M09 — Configure Cloudflare Email Service, verified recipient and Turnstile; verify end-to-end delivery and spam handling. The form implementation is ready; sending is disabled until configuration.
- M10 — Confirm Analytics and Search Console ownership. See `QUALITY.md`; no tracking identifiers were found. Do not create an unrelated property or send data to a guessed account.
- M11 — After content and preview acceptance, deploy to the agreed environment. Verify HTTPS, redirects, canonical URLs, DNS, CSP, cache/compression, real donation destinations, analytics, GSC and live performance. Preserve the existing Webflow site until cutover is verified.
- M12 — Run Cloudflare's Content Site audit on the deployed candidate and report the actual result. No fabricated MCP/auth/commerce capabilities solely to inflate a score.

## Sources

Public site captured November 12, 2026 in `source/`. Asset provenance: `source/assets.json`. Changes: Elizabeth's email supplied by Dominik; workflow and quality bar: Dominik's instructions in this conversation. Public source snapshots are reference material, not runtime dependencies. The one-time importer overwrites data and must not be rerun over editorial changes.
