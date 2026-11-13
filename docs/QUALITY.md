# Quality — measured locally, production checks pending

## Lighthouse

November 12, 2026. Production Astro build, local Chrome, Lighthouse 13, seven routes, mobile and desktop: **100 performance / 100 accessibility / 100 best practices / 100 SEO in all 14 runs.** Detailed timing and versions: `reports/summary.json`. Reproduce: `npm run build`, `npm run preview -- --port 4321`, `npm run audit -- --all`.

These are local laboratory results, not a Google PageSpeed Insights result on a deployed URL or real-user Core Web Vitals. Hosting, third-party scripts, and future content can change scores. Lighthouse does not replace manual accessibility testing.

Manual checks: desktop/mobile layout (390px), no mobile horizontal overflow on Home/About/FAQ, FAQ expansion, biography expansion, visible Donate CTA. Automated checks cover local links/assets, one H1, metadata, JSON-LD, Markdown output, removed people/pillar/metric, board ordering, no runtime JavaScript outside Contact. Worker tests cover Markdown Accept negotiation, quality preferences, HEAD, unsupported methods, preview noindex and 404 handling. Dependency installation audit: zero known vulnerabilities after updating Astro/Sharp.

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

Contact update, November 12, 2026: all seven pages again scored 100/100/100/100 in local mobile and desktop Lighthouse. Contact validation and delivery tests use mocks, including preview/missing configuration refusal, origin, body limit, spam token hostname/action and provider failures. Live Turnstile and mailbox delivery remain untested until account configuration.

## Version comparison — November 12, 2026

Production-build preview on localhost:4321, Lighthouse 13, Chrome, simulated mobile and desktop. `npm run audit -- --all`: seven main routes score 100/100/100/100. `--review`: V2 homepage and all seven V3 routes score 100 performance, 100 accessibility, 100 best practices, 66 SEO. The SEO deduction is the intentionally present noindex directive on review variants; it is not a claim about production SEO. V2 homepage was remeasured after fixing route-number contrast. No live PageSpeed or external agent-readiness score is claimed.

Manual browser checks: V1 snapshot loads; V2/V3 switch; 390px V3 preview; original logo; mobile header/CTA fit; page selector keeps the selected page across variants; FAQ disclosure expands; internal links stay within the version. Build/check pass for all 21 variant pages. Actual per-run scores and timestamps are in `reports/summary.json`.

## Revised original-design versions — November 13, 2026 (Europe/Warsaw)

Local Lighthouse 13 / Chrome, production Astro preview on port 4321: seven main routes mobile + desktop scored 100 performance, accessibility, best practices and SEO. All seven V2 routes scored 100/100/100/66; SEO is reduced solely by intentional noindex. The V2 homepage initially scored 98 desktop due to font layout shift; preloading the original Neon font resolved it, verified at 100 mobile/desktop. Review scores are local, not live PageSpeed or Cloudflare agent-readiness results.

Build, content/link tests and Cloudflare mocked form tests pass. Manual browser checks covered original font/hero appearance, 390px mobile menu, Escape dismissal, variant selection and V3 pending state. GitHub repo exists but publication is blocked pending explicit approval of revised V1/V2.

## Leedlime V3 and full-page controls — November 13, 2026

All seven main routes: 100/100/100/100 mobile and desktop. All seven V3 routes: 100 performance, 100 accessibility, 100 best practices, 66 SEO (intentional noindex), mobile and desktop. Local Lighthouse 13 against production preview on port 4321. Footer label contrast corrected. A transient About load during rebuild and a CPU-contention homepage result were rerun after build and serially; final results above. These are local lab scores, not live PageSpeed.

Build/check pass, including all 21 standalone version pages, controls destination URLs and Pages base paths. Browser verification covered 390px mobile, desktop, version switching preserving FAQ, page switching, menu and control Escape dismissal. No new deployment attempted.

## Painterly V3 refinement — November 13, 2026

Build/check and Pages artifact checks pass. Seven main routes remain 100/100/100/100; seven V3 routes score 100 performance / 100 accessibility / 100 best practices / 66 SEO on mobile and desktop (local Lighthouse 13; comparison noindex is intentional). After design review, the career-role text received a polite live region, hamburger rotation origins were centered, and the tablet CTA width exception was removed; homepage audit was repeated. No live PageSpeed or deployment claim.

Manual checks: desktop inline links, mobile two-line menu and Escape restoration, 390px career card, role selection, consistent Partnerships CTA sizes/destinations, legible partner marks, painted gradient footer. Motion is finite/replayable, respects reduced-motion preferences and stops in hidden tabs. Illustrations are synthetic and career examples explicitly illustrative; source provenance and prompts are in ARTWORK.md.

## Military profiles, film and AccessGrid-inspired grid — November 13, 2026

Production preview on localhost:4321, Lighthouse 13, local Chrome: all seven main routes scored 100/100/100/100 on mobile and desktop. V3 homepage and all six subpages scored 100 performance, 100 accessibility, 100 best practices and 66 SEO (intentional noindex), mobile and desktop. Partnerships mobile initially scored 98, then 99; selecting the smaller mobile artwork and preloading this above-the-fold image brought it to 100. These are local measurements, not live PageSpeed or agent-readiness scores.

Build/check and Pages base-path artifact checks pass, including video `poster`/`data-src`, profile sequence boundaries, all 21 review pages and local links. Manual Chrome checks: portrait and original signet render; full sequence advances to the second profile; pause/manual profile selection; original silent video plays when visible; scroll words progressively color; partner logo opens matching description; 390px layout has no horizontal overflow; mobile menu closes with Escape. Motion respects reduced-motion preferences and pauses offscreen/hidden tabs. No push or deployment performed.

## Compact three-profile refinement — November 13, 2026, 12:22–12:25 CET

All seven main routes: 100/100/100/100; all seven V3 routes: 100/100/100/66, each on mobile and desktop in local Lighthouse 13. V3 SEO remains intentionally noindex. Build/check/Pages artifact validation pass. Desktop and 390px browser checks confirmed one military role ending in 2026, a slim signet-only Mandatum row, one civilian role, three selectable progress bars, no horizontal overflow, muted autoplay without native controls, and Enter revealing controls. Illustrations now have single placements, with navy/slate gradients elsewhere. Third fictional profile uses initials; the first two use existing synthetic portraits. No deployment.

## Page refinement — November 13, 2026

Build/check and Pages artifact checks pass. Manual Chrome checks covered external progress bars, compact square buttons, biography dialogs and Escape, full testimonial text dialogs, partner hover/click popovers, search matching, and autoplay of the 9-second speakers-only clip on About. All four donation methods fit within the 390×844 viewport; Zeffy remains inactive. Original Webflow favicon restored. Contact still uses preview-only delivery; no real message sent. Known content limitation: several new leadership identities/photos remain unverified. Portraits have consistent grayscale framing, not identical replaced backgrounds; Gary's generative edit is not deployed.

Final local Lighthouse 13 results for this iteration: all seven main routes 100/100/100/100 mobile and desktop; all seven V3 routes 100/100/100/66 mobile and desktop. SEO deduction is intentional review noindex. Base About was rerun after adding Gary's source-preserving portrait. Reports carry individual timestamps; no live PageSpeed or external agent-readiness claim.

## Axis, full-width video and audience cards — November 13, 2026

Build/check/Pages artifact checks pass. Manual desktop/mobile checks measured identical icon centers across the three career stages (desktop 852.5px, mobile 57px), no mobile horizontal overflow, and video aligned to the main grid inside its 1px borders on Home and About. Removed standalone profile pause icon; selecting a story still pauses on its full contents. Cards reveal once with a 100ms stagger and have hover/focus feedback; reduced motion disables these transitions.

Required all-route base audit: 13 runs 100/100/100/100; homepage mobile 99 performance / 100 accessibility / 100 best practices / 100 SEO, with 130ms total blocking time. This is the actual local Lighthouse result, not a deployed PageSpeed score.

Affected V3 Home and About remeasured mobile and desktop: 100 performance / 100 accessibility / 100 best practices / 66 SEO (intentional noindex). No publication performed.

## Film buttons and spacing — November 13, 2026

Build/check/Pages validation pass. Desktop and 390px Chrome checks confirmed shared compact square film buttons with rounded hover/focus states, 48px/28px section gaps, no mobile horizontal overflow, and removal of the V3 conversation strip. Video remains full grid width. All-route base Lighthouse: homepage mobile 99/100/100/100, other thirteen runs 100/100/100/100. V3 homepage mobile/desktop 100/100/100/66 (intentional noindex). No publication.

V3 About also remeasured 100/100/100/66 on mobile and desktop after this spacing pass.

## Grid, blade navigation and perimeter motion — November 13, 2026

Build/check and Pages artifact validation pass. Desktop and 390px Chrome checks covered partner selection/autoplay, FAQ search and stacked mobile answers, testimonial grid, shared career axis, no video pause overlay, keyboard-triggered film caption, and full-width footer with un-underlined links. Partner loader now updates with requestAnimationFrame; the career highlight uses a masked conic gradient on the existing 1px border. Reduced-motion preferences disable section and border motion. No publication.

Local Lighthouse 13, production preview on port 4321: required all-route base audit scored 100/100/100/100 except Home mobile performance 99. Full V3 audit scored 100 performance/accessibility/best practices on all fourteen runs; SEO 63–66 due solely to intentional noindex (applicable audit weights differ). After the final border/loader refinement, Home mobile scored 99/100/100/66 (70ms TBT), Home desktop 100/100/100/66, and Partnerships mobile/desktop 100/100/100/66. These are local measurements, not live PageSpeed or agent-readiness scores.

## Alumni, compact navigation and film caption — November 13, 2026

Build/check and Pages artifact checks pass. Desktop and 390px Chrome checks confirmed the completed Fellowship alumni label with hidden spinner, specific civilian role after the New role transition, no horizontal overflow, expandable FAQ search with matching results and Escape reset, lighter body type, compact header Donate, white footer logo, and the film caption on a soft bottom gradient. Buttons have no transform or shadow; pointer illumination is masked to their borders. FAQ rows reveal once on scroll; reduced motion disables the transitions.

Required all-route base Lighthouse run: Home mobile 91 performance / 100 accessibility / 100 best practices / 100 SEO (370ms TBT); all other thirteen runs 100/100/100/100. This base homepage was unchanged by this iteration; the lower local result remains recorded rather than claiming 100. Full V3 run: Home mobile 99 performance, remaining thirteen runs 100; accessibility and best practices 100 throughout; SEO 63–66 because review pages are intentionally noindex. Measurements use local Chrome/Lighthouse 13 on the production preview at port 4321; no live PageSpeed or agent-readiness claim. No push or deployment.

## Selectable military motifs and editorial cards — November 13, 2026

Build/check and Pages artifact validation pass. Manual desktop/390px checks covered all three selectable canvas modes, session persistence, accessible split-flap hero label, arrow-free CTA buttons/audience strip, full-width pillar grid, Values tabs with Left/Right keys, portrait-card biography dialogs and Escape, mobile overflow, full testimonial expansion and horizontal navigation. All three testimonial texts were compared verbatim against src/data/testimonials.json. Footer pointer illumination and tilt, stronger blade motion, and shared body typography are implemented. Missing portrait assets remain explicit silhouettes or neutral graphic backgrounds.

Local Lighthouse 13, production preview on port 4321: main routes 100/100/100/100 except Home mobile performance 98 (160ms TBT). V3 Home mobile performance 99; every other V3 run 100 performance; accessibility and best practices 100 throughout. Review SEO remains 63–66 from intentional noindex. Canvas alternatives were manually inspected; these Lighthouse scores use the default painting mode. No publication, live PageSpeed or Cloudflare agent-readiness claim.

### November 13 — final cipher and rolling CTA pass
Local production preview on port 4321; Lighthouse 13, headless Chrome, simulated mobile and desktop. `build:pages` (build + all checks + artifact validation) passed. `audit -- --all`: base home and partnerships mobile performance 99; remaining 12 base runs 100; accessibility, best practices and SEO 100 throughout. Latest V3 homepage after final experience/next step change: performance/accessibility/best practices 100 on both mobile and desktop; SEO 66 because review intentionally has noindex. This is local Lighthouse, not live PageSpeed or field data.
Browser verified static outer hero words, resolved next step, CTA rolling on keyboard focus and unchanged 160×44 button dimensions. No horizontal overflow observed. Motion is disabled with prefers-reduced-motion. No deployment performed.

### November 13 — photographic wardrobe motion, final local review
Build/check/Pages-artifact validation passed. Required base `audit -- --all` completed (home mobile99, remaining13 runs100; accessibility/best practices/SEO100). V3 About and Testimonials mobile/desktop each100 performance/accessibility/best practices; intentional review SEO66/63. Final V3 home after photographic assets and compression: mobile96 performance, desktop100; accessibility/best practices100, SEO66 (noindex). Mobile LCP2.6s. Earlier unoptimized photo run scored87; compressing hero endpoints from242KiB to85KiB improved it to96. Environment: Lighthouse13, local production preview4321, headless Chrome, simulated mobile/desktop, November13 2026; not live PageSpeed or real-user data.
Browser checks: 390px no horizontal overflow; all8 wardrobe endpoint images loaded; all3 pillar images visibly large; intro has no background relief; testimonial center difference <0.1px, artwork height590px even when quote expanded to1376px. Full quote source retained. No push/deploy.

November13 final military-first timing pass: build/check and required all-route audit passed. Base home mobile99 performance, all remaining13 base runs100; accessibility/best practices/SEO100. V3 home mobile97 / desktop100 performance, accessibility/best practices100, SEO66 intentional noindex. Local Lighthouse13 on production preview4321. Verified military initial state for all3 desktop pillars, hover only changes targeted pair, hero downward reveal complete after195px scroll. No deployment.

### November 13 — staged procedural hero, portrait correction and handoff
Build/check/Pages validation passed after the final three-stage camo correction. Browser confirmed clean technical endpoint without camo, plain Values without logo relief, and natural-colour portrait filters (none). Earlier sheet keyboard/Escape/focus return and mobile drag checks passed. The immediately preceding organic-pixel implementation measured91 mobile/100 desktop performance, accessibility/best practices100, SEO66 intentional noindex. Those scores do not describe the final cached-canvas implementation. Both required all-route and targeted re-audit attempts failed at Chrome launcher startup (waiting for dynamic debugging port), so fresh Lighthouse scores are unavailable. Existing successful earlier all-route results remain historical. No push/deployment.

### November13 — first design-audit implementation
Build/check/Pages validation passed. Desktop screenshot verified matte profile frame, restrained italic cipher and shared CTA. Mobile390px Donate: one340px column,16px body,14px CTA, no document overflow. Testimonials visually checked after entrance; no empty photographic headroom. FAQ DOM confirms eligibility/coaching/duration first. Required audit all initially failed Chrome debugging-port startup. Repository renamed mid-task; preview was restarted from new mandatum directory. Fresh audit result, if available, is reported separately.

Final exact-source build/check/Pages validation passed after CSS cleanup. Cipher next step measured186.421875px both active1 and settled0 at desktop1272px viewport. FAQ keyboard Enter opens compact search; Escape closes. Required audit all failed at Chrome startup, no fresh scores claimed. Proof: reports/v3-audit-hero.png, reports/v3-audit-testimonials.png, reports/v3-audit-donate-mobile.png.

### Camo → tech verification — November 13, 2026

Local production preview, http://127.0.0.1:4321, Lighthouse 13 / local Chrome, mobile simulated throttling and desktop settings from scripts/audit.mjs. Scores are performance/accessibility/best practices/SEO; not live PSI or field CWV. V3 SEO 66 is expected because review pages deliberately use noindex.

| Route | Mode | P/A/BP/SEO |
| --- | --- | --- |
| home | mobile | 99/100/100/100 |
| home | desktop | 100/100/100/100 |
| about-us | mobile | 100/100/100/100 |
| about-us | desktop | 100/100/100/100 |
| partnerships | mobile | 100/100/100/100 |
| partnerships | desktop | 100/100/100/100 |
| testimonials | mobile | 100/100/100/100 |
| testimonials | desktop | 100/100/100/100 |
| contact | mobile | 100/100/100/100 |
| contact | desktop | 100/100/100/100 |
| faq | mobile | 100/100/100/100 |
| faq | desktop | 100/100/100/100 |
| donate | mobile | 100/100/100/100 |
| donate | desktop | 100/100/100/100 |
| review-v3-index | mobile | 99/100/100/66 |
| review-v3-index | desktop | 100/100/100/66 |

Build/check and syntax checks passed. V3 visually checked at desktop and 390×844; skip link works by keyboard; no browser console errors observed.

### November13 — independent direction A/B prototypes
Both prototypes built with separate stylesheet/script and linked from controls. All3 source quote texts verified complete;1h1,3 illustrative profiles and1film each. Agents visually checked desktop and390px mobile (no overflow), scroll-triggered story expansion and B mobile menu Escape. A long quote expands in normal document flow, not a clipped pinned area. Required audit --all attempted again but Chrome launcher failed waiting for dynamic debugging port; no current Lighthouse scores claimed. Build/check and Pages packaging validation passed before final small heading/menu/control refinements; exact final validation recorded below. No publication.

Final exact-source build/check/Pages packaging passed after A intro heading and B mobile Donate/quiet film control refinements. Parent inspected both final desktop views; refreshed screenshots reports/direction-a-desktop.png and reports/direction-b-desktop.png. Prototype links in review-controls explicitly exempt from version-isolated content navigation check; all actual page navigation remains checked.


## Release candidate verification — November 13, 2026

Local production preview on port 4321, Chrome/Lighthouse13, mobile simulation and desktop. Build/check/Pages packaging pass. Seven base routes: performance99–100, accessibility/best practices/SEO100. Design V2 (internalV3), seven routes: performance95–100, accessibility100, best practices100; SEO63–66 because review pages deliberately prohibit indexing. These are local laboratory scores, not live PageSpeed or field Core Web Vitals.

Testimonials initially had CLS0.253 and contrast failures; server-rendering its shell and keeping text opaque resolved them. Targeted rerun: performance/accessibility/best practices100 on mobile and desktop. No layout-shift audit failures remained. About and testimonial desktop/mobile browser QA confirmed stacking, scroll progression, full-text dialogs, Escape/focus restoration, and no page overflow. Reduced-motion fallback was source-reviewed, not runtime-emulated.

### Interaction round follow-up — November 13, 2026
Build/check/Pages packaging passed after the latest changes. Full base-route audit completed (99–100 performance,100 accessibility/best practices/SEO). Full Design V2 audit completed; home was then remeasured alone after deferring footer canvas creation until near the viewport: mobile96 and desktop100 performance,100 accessibility and best practices. Remaining Design V2 routes measured100 performance/accessibility/best practices; review noindex continues to lower SEO scores. Final changes after these measurements were square avatar/control corners and the correct responsive generated handshake variants. Browser QA verified fullscreen mobile menu and Escape, full longest testimonial, persistent Values titles, sticky navigation, no desktop overflow and no console errors. Screenshots: reports/round-menu-mobile.png, reports/round-handshake.png.

### Pointer reveal correction verification — November 13
Build, check and Pages packaging passed. Required all-route local audit completed: base performance98–100, accessibility/best practices/SEO100. Targeted Design V2 home after shared square-pixel reveal: mobile96 / desktop100 performance, accessibility100, best practices100; SEO66 from deliberate review noindex. Browser checks: pointer reveals civilian hero image; wardrobe transitions end at civilian image; footer pattern is local to cursor; image borders0px; desktop/mobile390 have no overflow or console errors. These are local lab measurements, not field performance. Proof: reports/hero-pointer-reveal.png and reports/pillars-fine-morph.png.
