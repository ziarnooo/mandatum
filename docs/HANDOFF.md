# Mandatum — current handoff

## Start here
User rejected the overall V3 style after the audit pass. New task is art direction, not more polishing of the existing styleguide. Read REVIEW.md → Design direction reset first. Preserve the explicitly liked interactions/content, but current hero background is rejected. User supplied https://masterborn.ai/ as the concrete reference; parent inspected it visually. Two separate working prototypes are available after explicit user request for a second agent: /review/direction/index.html (dark spatial A) and /review/direction-b/index.html (light asymmetrical film-first B). User supplied frontend-design skill text; apply its two-pass design process. See DESIGN-DIRECTION.md. Build a representative hero + following section around that reference before broad rollout. Testimonials advance/expand with scroll in both prototypes; previous V3 remains unchanged.

Repo: `/Users/dominikziarno/Documents/repositories/mandatum`.
Branch: `feat/cloudflare-contact-form`, extensive pre-existing modified/untracked work. Preserve everything unrelated. No push, merge or deployment without explicit approval of current preview. No approval currently exists.
Preview: http://127.0.0.1:4321/review/v3/index.html
About: http://127.0.0.1:4321/review/v3/about-us/index.html
Production preview runs on 4321. `npm run build:pages` builds, checks and packages only; it does not publish.

## Authoritative documents
- `AGENTS.md`: workflow and release restrictions.
- `MIGRATION.md`: implementation scope and missing factual materials, reconciled with current V3.
- `REVIEW.md` → **Current V3 state**: current implemented design. Dated entries below are explicitly historical, not active requirements.
- `DESIGN-AUDIT.md`: independent seven-page audit and proposed styleguide; proposals are not automatically user-approved.
- `QUALITY.md` and `reports/*.json`: dated actual validation, not a claim that every current visual choice is approved.
- `wardrobe-assets.md`, `PEOPLE-SOURCES.md`, `FILM.md`: asset provenance. Missing photos and bios must not be invented.
These docs were reconciled before handoff. The remaining unresolved drift is structural: CSS still contains many old overrides. Cipher/shared component consolidation was partly implemented; remaining old rules still exist. The user subsequently rejected the overall visual style.

## Latest corrections — do not regress
1. SUPERSEDED VISUAL DIRECTION: current hero background was rejected in latest review. Existing prototype sequence, for history only: **green camo → same patches in corresponding blue shades → patches MERGE and disappear entirely into a clean navy surface → slowly drawn business/technical chart**. User emphatically rejected persistent blue camouflage and a straight sweeping replacement bar. Scroll controls it early enough to see before leaving hero. Motion.dev homepage/gold sphere is a quality/smoothness reference, not permission to copy unrelated colour or decorative objects.
2. Values background: remove giant logo fragments. Four visible tiles on plain background; no tabs or relief.
3. Leadership images: natural colour immediately, no blue/sepia/grayscale filter. Keep role/Read more reveal and accessible bottom sheet.
4. Hero middle words only: gray italic experience / next step. No blue tiles or outer border. Your stays static; matters. ALWAYS second line. Letter metrics must stay identical during/after cipher. Last fixed root cause: decoding gap .025em vs resting0; both now0 and widths fixed per glyph.
5. All garment photos begin military, then civilian on appropriate hover/scroll. Desktop pillar mouseleave returns to military. No tiny diagram illustrations.
6. Buttons square, primary navy / secondary border, no arrows, no scale/shadow on hover. Rolling text hover retained. Body/menu light sans; headings serif; mono labels and sparse original Neon accents.

## Implementation map
- `scripts/build-review.mjs`: generates V1/V2/V3 from base output; hero markup/default motif, CTA labels, Values relief removal. Do not edit dist.
- `scripts/v3-refinements.mjs`: leadership cards/sheets, Values cards, testimonials and page transformations.
- `public/review/v3.css`: accumulated V3 styles; later declarations override earlier. Main consolidation target.
- `public/review/v3.js`: cipher, card reveals, sheet entrance/exit/drag, testimonials, UI interactions.
- `public/review/camo-texture.js`: cached green/blue textile canvases share exact bands. Frame rendering blends canvases, merges to clean gradient, progressively draws decorative chart paths. No per-frame pixel loop, no fake performance metrics. Texture generation capped480px wide.
- `public/review/military-motion.js`: scroll target, smooth following, canvas lifecycle, selectable alternatives. Defaults camo, sessionStorage `mandatum-motif-v3` may override it; check controller when reviewing.
- `public/review/wardrobe-motion.js`: photo-pair behavior, separate from procedural camo.
- `src/data/*.json`: factual content. Do not invent testimonials, bios, counts, eligibility or donation endpoints.

## Work remaining
First audit implementation landed: see REVIEW current state and DESIGN-AUDIT implementation section. Continue consolidating remaining historical component rules after visual approval. Cipher now1600ms with narrow lowercase wave and6200ms hold; old hero-flap variants removed. Do not mass-redesign unasked. User asked how to steer LLM design: answer with a concrete process and reusable prompt, not promises of autonomous taste.
Validate latest three-stage hero visually at start/middle/end, including reverse scroll and reduced motion. End state must have zero camo contrast. Maintain quality and performance as effects evolve.
Review all seven pages against shared type/grid/colour/control/motion rules. Missing verified testimonial photography and board assets remain content dependencies. Keep honest placeholders.

## Validation and limitations
Build/check/Pages validation passed after the final merge correction. Our mission link subsequently changed to shared secondary button (no Neon/underline). Previous board sheet tested with keyboard Enter/Escape, focus return, backdrop and mobile handle drag. Desktop390px mobile overflow checks passed; natural colour filter now none and Values relief class removed.
Latest completed organic-pixel version audit (superseded) was home mobile91 / desktop100 performance, a11y/best100, SEO66 intentional noindex. New cached-canvas version could not be measured: a second targeted audit also failed Chrome debugging-port startup. Required all-route audit attempted again but Chrome launcher failed waiting for debugging port; do not claim this run passed. Earlier successful full runs are in QUALITY.
No publication performed. Contact preview never sends. Analytics inactive. Historical60/21 counters are not current verified impact numbers.

## Suggested skills
- `handoff`: update this single canonical file after meaningful changes.
- `imagegen`: only for new requested raster assets, not procedural JS texture or invented portrait photographs.
- `sites:sites`: if using Sites workflow; current work is the existing local Astro repo.
Use CUA for browser interaction/visual verification; preserve user tabs and save proof screenshots. Do not reopen paid Motion example source as if it were available.

## Delegation
User explicitly requested independent design audit; agent `/root/style_audit` writes DESIGN-AUDIT.md only. Earlier wardrobe image agent completed assets. Do not spawn new agents merely to add ideas without a user request or applicable instruction.

Repository directory was renamed during this task from mandatu to mandatum. Preview restarted at4321 from new path (pid7224). Old sandbox writable roots may require scoped escalation for new-path writes; do not recreate the old directory.

## Latest handoff — two distinct proposals
User supplied frontend-design guidance and explicitly asked to revive a second agent for a genuinely different B. A is centered/dark/product-focused; B light/asymmetric/film-first. Both linked from review controls. `scripts/build-direction.mjs` and `scripts/build-direction-b.mjs` run after V3 in build-review; CSS/JS independently scoped. No paid Motion code or MasterBorn assets copied. `DESIGN-DIRECTION.md` is the current art-direction brief; older DESIGN-AUDIT styleguide is superseded.
Both agents checked desktop and390px mobile without horizontal overflow. B native details and A expanding normal-flow quotes preserve all3 authentic source texts. Build/check/artifact validation passes; latest audit attempt failed Chrome launcher startup so no fresh scores. Pending: user reaction to A/B and any broader rollout, not deployment.
