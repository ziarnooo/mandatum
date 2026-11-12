# Quality — measured locally, production checks pending

## Lighthouse

November 12, 2026. Production Astro build, local Chrome, Lighthouse 13, seven routes, mobile and desktop: **100 performance / 100 accessibility / 100 best practices / 100 SEO in all 14 runs.** Detailed timing and versions: `reports/summary.json`. Reproduce: `npm run build`, `npm run preview -- --port 4321`, `npm run audit -- --all`.

These are local laboratory results, not a Google PageSpeed Insights result on a deployed URL or real-user Core Web Vitals. Hosting, third-party scripts, and future content can change scores. Lighthouse does not replace manual accessibility testing.

Manual checks: desktop/mobile layout (390px), no mobile horizontal overflow on Home/About/FAQ, FAQ expansion, biography expansion, visible Donate CTA. Automated checks cover local links/assets, one H1, metadata, JSON-LD, Markdown output, removed people/pillar/metric, board ordering, no runtime JavaScript. Worker tests cover Markdown Accept negotiation, quality preferences, HEAD, unsupported methods, preview noindex and 404 handling. Dependency installation audit: zero known vulnerabilities after updating Astro/Sharp.

## Cloudflare agent readiness

Checker: https://isitagentready.com/ — use **Content Site** for this nonprofit informational website. It is distinct from the Claude Code editing workflow.

Implemented: static semantic HTML; visible text and links without JS; FAQ/organization/page structured data; robots with explicit search/user-agent access rules; content signals; sitemap; llms.txt; full text; machine-readable JSON; per-page Markdown generated from the HTML source of truth. Proposed crawl policy permits search and agent retrieval and declines model-training use; owner review before launch.

The optional `cloudflare/worker.mjs` adds real `Accept: text/markdown` negotiation, `Vary: Accept`, and Link discovery headers. Plain static hosting still serves `.md` URLs but does not provide negotiation. `wrangler.jsonc` is preview-only (`PREVIEW=true` adds noindex); no deployment has occurred. DNS-AID and Web Bot Auth are hosting/domain capabilities, not static-file claims. OAuth, MCP and commerce endpoints are intentionally not fabricated: this site has no login, app API, or in-house checkout.

**No external score is claimed for the new site.** Cloudflare cannot scan localhost. Verify its actual Content Site result after an approved deployment. A universal 100 across irrelevant commerce/auth checks would not be a meaningful target for this website.

Primary references: https://blog.cloudflare.com/agent-readiness/ and https://developers.cloudflare.com/workers/static-assets/binding/.

## Existing Analytics and Google Search Console

Read-only inspection of all four original page HTML documents on November 12, 2026 found no Google Analytics / GA4 / GTM script or ID, Cloudflare Web Analytics beacon, Plausible, Clarity, Hotjar, Meta pixel, or Google verification meta tag. Public TXT lookup at the apex returned Microsoft verification and SPF; `www` resolves through Webflow. No Google verification TXT was observed there.

This does **not** establish that the site has no Search Console property. It may use an HTML verification file or another verification/ownership mechanism. Nor does it rule out server-side measurement or scripts injected outside the inspected HTML. Account status, data and access remain unverified.

Before launch, ask the owner for existing Analytics/GSC access or confirmation that these should be created. Suggested minimum: GSC domain property, sitemap submission, page-indexing/404 review; lightweight traffic measurement; donor outbound-click and contact-click events if using GA4. Choose one analytics system and verify actual events after installation. No analytics account, tracker or consent policy has been activated in this local build.

## Other practices

Implemented: local WebP assets and dimensions; responsive hero; lazy-loaded secondary images; system fonts; no Webflow/jQuery runtime; reusable content data; readable link names; keyboard focus; skip link; native disclosure controls; mobile layout; canonical/meta/Open Graph; sitemap; real 404; optional security headers; preview noindex in the Cloudflare adapter; locked dependency versions; source provenance; documented missing content; approval before push.

Before release: preserve existing URL paths and review redirects (including old `/#donate` and `/#faq` links); confirm image usage and final copy; check external payment accounts without making a payment; confirm contact delivery; configure HTTPS and security/cache headers on the chosen host; retain deployment rollback history and monitor broken links. Re-run performance measurements after analytics or other integrations are enabled.

A read-only Cloudflare MCP Content Site scan of the existing production URL was attempted on November 12; it timed out after 90 seconds without a result. No baseline score was obtained.
