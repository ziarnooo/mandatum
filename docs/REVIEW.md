## Publication authorization — November 13, 2026
Dominik explicitly requested publishing the current candidate with the final typography and plasma-mask corrections. The earlier pending-approval notes below are historical. V1 and Design V2 are the two public review options; Cloudflare production/DNS are outside scope.

# Release candidate — November 13, 2026

The current compact controller exposes **V1 · Original + corrections** and **Design V2** (internal `/review/v3/` route). Experimental directions and the old internal V2 remain local and are excluded from the Pages package. The historical notes below are not the current release specification.

Current changes: uniform-to-suit hero photography; faint camouflage outside the content grid; tighter handshake crop; scroll-driven testimonials with complete quotes available in a dialog; stacking Values; Values followed by leadership, with film and events at the bottom of About; gentler portrait reveals; biography sheets only for the four supplied biographies, without duplicate photos.

`npm run build:pages` passed on November 13. Public push remains pending explicit approval of this displayed candidate, as required by AGENTS.md. Cloudflare production and DNS remain outside this publication scope.

---

# Compare V1 / V2 / V3

Open http://127.0.0.1:4321/review/index.html after `npm run build`. Open a full page; the small bottom-right dropdown switches version and page, keeping the current subpage. Use the browser viewport for mobile review. Nothing is deployed.

- **V1:** original Webflow visual language (original Neon font, Palatino body, full-width photographic hero, blue/white/black, numbered pillars), migrated to Astro with Elizabeth’s changes.
- **V2:** the same visual system with audience paths, clearer messaging and shorter homepage based on SFF/SOTF. Mission film, vision, values and events move to About; detailed programs move to FAQ.
- **V3:** Leedlime-inspired serif headings, framed layout, soft cards and warm canvas; original Mandatum logo and navy, supported by powder blue and slate gray. Reference supplied November 13: https://leedlime.com/. Same information flow as V2.

Original logo is unchanged. Original public snapshots remain in `source/`; the old local draft snapshot is archival only, no longer built as V1. Navigation includes a responsive disclosure menu with brief motion, Escape/outside/focus dismissal and reduced-motion support.

## Design direction reset — latest user review, November 13

The user rejected the overall V3 visual direction after the first audit implementation. The implemented state below is a record of the prototype, not an accepted styleguide. Do not keep polishing its styling as though approved.

Keep: animated logo; animated hero elements and LinkedIn-style career sequence (not its background); film treatment; decipher effect on audience labels such as For future Fellows; “The experience is already there” introduction and the exact Foundation paragraph; Partnerships logos alongside descriptions.
Reject: current overall visual style and hero background. Earlier camouflage requirements are superseded as a design direction, though the implementation remains available for reference. Do not infer approval of the latest hero cipher from approval of the audience-label decipher effect.
New interaction requirement implemented in the separate A/B prototypes: testimonials advance in normal document scroll and expand on reaching the reading position; full source quotes remain accessible via controls and reduced-motion fallback. Previous V3 remains unchanged.
Reference supplied: https://masterborn.ai/ (visually inspected November 13). New prototype A is isolated at /review/direction/index.html: deep navy canvas, large sans-serif type, restrained steel-blue light, one dominant animated career-profile scene, no camo. Show a coherent representative landing before propagating the style to all pages. Prototype B at /review/direction-b/index.html uses a light asymmetric film-first composition and a supporting career rail. Both are distinct proposals, not approved full-site redesigns. Preserve the accepted mechanisms and truthful content.

## Current V3 state — November 13, 2026

Latest user decisions supersede the historical notes below. V3 is an evolving local review, not a finished or approved design system.

- Warm off-white canvas, navy controls, serif headings, light sans-serif body/navigation and mono eyebrow labels. Buttons are square, arrow-free, without hover size changes or shadows; primary filled navy, secondary outlined.
- Hero: only gray italic “experience” / “next step” scrambles (1600ms, 6200ms cycle; hover 1300ms; only 1–2 lowercase letters change at once). “Your” stays static and “matters.” always occupies the second line. Decoding/resting glyph widths and gaps are identical.
- Default hero is procedural fine camouflage: matching green tones turn blue, fragments settle into a regular lattice, patches merge completely into a navy/blue gradient and decorative circuit traces progressively draw. A soft light pulse accompanies the transformation. Camouflage is fully absent at the endpoint. Early scroll controls the sequence with eased following; there is no travelling reveal edge. Alternative motifs remain in the review controller. Garment-photo mode still uses a feathered directional reveal.
- All garment pairs start military; desktop pillars change on hover, touch uses scroll. Three pillars use large photographic pairs, not the earlier SVG diagrams. Asset provenance: wardrobe-assets.md.
- The artwork-story “Our mission” link uses the shared secondary button, without special Neon type or underline.
- Values: four visible tiles on a plain background. Enlarged logo relief removed everywhere after user rejection.
- Leadership portraits are natural colour from first render. Hover/focus reveals role and Read more. Biographies open in an accessible bottom sheet, closed by Escape, close control, backdrop or dragging its handle down. Missing photos/bios remain explicit.
- Testimonials retain full source quotes in compact navy editorial cards with expansion; side cards center on interaction. Empty photo space and abstract imitation-photo backgrounds removed because verified author photography is missing.
- Sections enter with a restrained blur/rise; reduced-motion fallback remains. Historical counters 60/21 count up on entry.
- Audit implementation: shared 14px/44px square controls, matte hero profile card, 12px mono labels, consistent body family without a global important override; Donate uses one readable column on mobile (16px copy/14px CTA); FAQ starts with Fellow eligibility, coaching and duration; Partnerships CTAs size to content. Story artwork is now the existing handshake photograph. Earlier hero-flap CSS variants were removed and consolidated.
- Design review and proposed common rules: DESIGN-AUDIT.md. These proposals are not user-approved changes. Continuation: HANDOFF.md.

## Historical design iterations

The dated notes below record earlier iterations and are not the current specification when they conflict with the current state above.

## Research → decisions

Reviewed November 12, 2026:

| Source | Observation | Mandatum decision |
| --- | --- | --- |
| https://sealff.org/ | Separate support, involvement and donation entry points; program and impact sections | Name the audience in the hero; offer clear paths for Fellows, organizations and supporters |
| https://sotf.org/ | Explains the transition problem and program; visible Apply and Donate | Explain how coaching, immersion and networking help; make the next step explicit |
| https://sotf.org/get-involved/ | Different actions for mentors, employers and donors | Direct organizations to Partnerships and supporters to Donate; do not use one generic Contact CTA for everyone |

These are structural lessons, not copied claims or program rules. No competitor metrics, eligibility criteria, services or testimonials were imported. Mandatum's existing source content and Elizabeth's supplied introductory paragraph remain the factual basis. New headlines and summaries require owner review.

Homepage flow: who we help and outcome → audience shortcuts → transition context → three pillars → two historical impact metrics and link to testimonials → next action. Dedicated donation/FAQ/testimonial pages remain as requested. A donation link at the end is a navigation CTA, not duplicated payment content.

## Editing

- V1: `src/pages/index.astro`; V2: `src/components/ReviewHome.astro`, `src/data/home-review.json`.
- Shared original visual system: `src/styles/original.css`; base structure: `global.css`. V3 overrides: `public/review/v3.css`.
- Controls: `public/review/controls.css` and `controls.js`; build assembly: `scripts/build-review.mjs`.
- `npm run check` verifies twenty-one version pages, local links/assets, noindex and original logo.
- `npm run audit -- --all` checks main routes; `--review` checks V2 routes; add `--v3` for V3. Comparison pages deliberately have noindex.

GitHub Pages publication was requested by Dominik. Production Cloudflare/domain changes remain separate. V3 reference is supplied; publication still awaits explicit approval.

## Leedlime adaptation

Reference observed November 13, 2026: cream canvas, large serif typography, fine framed grid, dark action buttons, soft colored visual panels and translucent cards. V3 translates these into Mandatum’s original #003462 navy, #cbdfe9 powder blue, #dce4eb slate gray and #f8f8f4 warm white. Logo and Foundation photo remain original; no Leedlime artwork, product mockups, marketing claims or customer data were copied.

All 21 variant pages are standalone documents. The fixed bottom-right disclosure contains version and page selects; switching versions retains the current page. Escape and outside click close controls. `/review/index.html` renders V1 directly, without a frame.

## V3 refinement — November 13

Navy-only original logo geometry, five inline desktop links, two-line mobile menu, 220 × 52 px primary/secondary CTA system, consistent 18px line icons. Partner marks sit in a compact navy grid inspired by AccessGrid; the incorrect Pillar/J2 duplicate is repaired from original Webflow source.

The hero cycles through three fictional profiles (two AI portraits and one initials avatar): one military role ending in 2026 → compact Mandatum signet row and three sequential support steps → one possible civilian role. Each profile lasts 14 seconds. Three translucent progress bars at the top double as profile selectors. Manual profile selection stops the sequence; reduced motion shows a complete static story, and offscreen/hidden tabs stop progression. No actual Fellow or placement is implied. Editable examples live in `src/data/career-profiles.json`.

The homepage includes the original silent 20-second Webflow film preview, loaded and played when visible, with controls revealed on explicit interaction and a hover/focus link to the full YouTube film. See `FILM.md` for provenance. Reduced-motion users start playback manually.

The introduction is a continuous paragraph with word-by-word grey-to-navy scroll coloring and selected blue phrases. Partner logos form a compact, equal-cell grid with expandable descriptions. AccessGrid reference observed November 13: https://accessgrid.com/?ref=land-book.com.

Each military painting appears once: landscape in the hero and mentoring in the transition section. Pillars, impact and footer use navy/gray gradients; Partnerships no longer repeats the mentoring image. See `ARTWORK.md` for saved paths, generation prompts and provenance, and `partner-assets.md` for real partner marks. V1/V2 visual design remains unchanged; Pillar asset correction applies everywhere.

## Page refinement

V3 controls now sit above the profile card; textual playback label and long disclaimer are removed. Names retain a small “Example” label. Primary buttons are smaller and square, rounding on hover/focus. The original Webflow favicon is restored globally as `public/favicon.png`.

Testimonials use a responsive three-column grid; excerpts are exact source sentences and full quotes remain in accessible dialogs. Donate shows PayPal, Venmo, inactive Zeffy and check details together above the fold at desktop and 390×844 mobile. Contact intro is beside the styled form. Partner logos form a pale grid on the left, with the selected description and partnership invitation on the right. A frame-synchronized loader advances the selection every 6.5 seconds; hover/focus pauses it and clicking selects manually.

About biographies open in native modal side panels; verified social links live in `src/data/people.json`. Portraits use consistent grayscale framing, but CSS alone does not replace photographic backgrounds. Public portrait research/provenance is in `PEOPLE-SOURCES.md`. Past events is an expanded historical list, not a blog. “How it works” replaces the FAQ navigation label, retaining the /faq route, with search and topic filters.

November 13 alignment refinement: removed the separate profile pause icon (selecting a progress bar still stops on that full example). Military icon, signet and civilian icon share an exact horizontal center on desktop and 390px mobile. Video spans the main grid without inset or rounded corners, on Home and About. Audience cards have larger labels, a one-shot staggered entrance and hover/focus underline/arrow motion; reduced-motion preferences disable it.

November 13 spacing pass: movie link, pause and fallback play use the shared compact navy square-button style, rounding on hover/focus. Homepage sections have 48px gaps (28px mobile), with matching space around About's video. V3 removes the entire “Not sure where to start?” conversation strip. Video remains full grid width.

November 13 motion/grid refinement: two-column question/answer rows with topic labels and search; full-width footer with grid-aligned contents and un-underlined links; no numbered audience labels. The three trident blades lift in a wave on logo hover/focus; the white footer wordmark also has a one-shot JavaScript entrance and hover/focus wave. Navigation draws a thin side-blade underline. Buttons brighten with darker matching borders and gently rounded hover corners. Below-fold sections enter once over 480ms with an 18px rise; reduced motion disables these effects. The career-row gradient follows the existing 1px rounded border, without an inset SVG stroke; connectors draw downwards outside the row.

November 13 follow-up: the military-to-civilian sequence finishes with “Fellowship alumni”, removes the process spinner, briefly shows “New role”, then fades in the specific civilian position. Illustrative profile labels remain. Body copy uses a lighter system sans-serif (Helvetica Neue 300 where available); serif headings retain their original weight. Header Donate is compact with no arrow. Button dimensions remain fixed on hover/press, shadows are removed, and a masked border glow follows the pointer. Menu shaft draws before its triangular blade; exit reverses that order. FAQ opens directly on topic tags with an expandable search icon (Escape closes and resets search). Film caption sits at the bottom over a dark gradient, with no card background.

The three military motion proposals are implemented as selectable review modes; see the latest section below.

## November 13 — unified controls and motion concepts

V3 uses About Us / Explore Fellowship / Donate consistently. Primary buttons are navy, secondary buttons are outlined; arrows and the audience-strip underline are removed. All non-heading copy uses the lighter body family; display headings and the film caption retain Georgia. The hero cycles “Your experience matters” / “Your next chapter matters” with a letter-by-letter split-flap entrance, preserving a static accessible label and reduced-motion fallback.

The bottom review dropdown now includes four hero modes: original painting, digital camouflage resolving to a grid, moving topographic contours, and converging route lines. Modes persist only in sessionStorage. Canvas drawing is capped at roughly 30fps and 1.5 device-pixel ratio, pauses offscreen/hidden tabs, and becomes static with reduced motion. No framework or remote rendering service is used.

Three pillars share a bordered grid with original SVG/CSS diagrams for immersion, coaching and networking. About values use keyboard-accessible tabs (the requested second reference URL was not supplied). Leadership cards take their full-height portrait and bottom-gradient composition from https://www.tryprofound.com/customers, inspected November 13. Only verified portraits are used; missing headshots keep silhouettes. Biographies remain in accessible side panels.

Testimonials have no hero: full source quotes sit in a horizontally scrolling series of wide cards. Long cards expand on hover/focus or a touch button. Neutral topographic backgrounds are used because verified author portraits were not supplied. No quote has been shortened in the document. Footer illumination and logo tilt respond to pointer position; logo hover uses a stronger mechanical blade-retraction sequence.

### November 13 — compact cipher hero and refined illustrations
- Hero word tile hugs its text, aligned left; initial words and rotating experience/next chapter resolve from a short military-style cipher. Accessible heading stays stable; reduced motion disables decoding.
- Restored Courier eyebrow labels and Arial 400 for the supplied Foundation introductory paragraph. Neon brand lettering appears sparingly in the impact label and mission link.
- Film caption uses an h2, “A new chapter of service.”, with a short Foundation-topic description; it is editorial copy, not a film transcript or quotation.
- Sections enter once with a 9px blur, 22px rise and 680ms ease-out; reduced motion leaves them static.
- A delegated illustration agent produced three local SVG scenes: field immersion, coaching plan, network around the Mandatum signet. No invented metrics or raster dependencies.
- Impact values count to existing historical 60/21 on entering view. Selected dashed grid lines and full-viewport horizontal rules extend the layout.
- Build, check and Pages artifact validation pass. Mobile 390px and desktop verified with no horizontal overflow; keyboard film link checked. Local preview only, no push.

Latest steering: only the middle hero phrase scrambles, alternating “experience” / “next step”; “Your” and “matters.” are static. Primary and secondary CTA labels roll upward character by character on hover/focus, inspired by Motion's rolling-text stagger example. Controls retain their dimensions; reduced-motion disables rolling. Implementation is local CSS/JS, without React or paid Motion source.

### November 13 — six-message reconciliation and garment direction
Checked latest requests against implementation:
- Only experience / next step scramble. Outer words static. Latest replaces enclosing border with individual pale-blue character tiles.
- Primary/secondary rolling labels remain; corners now stay square in all states; no arrows, scale or shadow. Navigation and hero paragraph both weight 300.
- Film has semantic heading + short editorial description; intro paragraph restored to Arial 400; mono eyebrows preserved; Neon brand font used sparingly.
- Section blur entrances, 60/21 count-up, dashed/extended grid rules and delegated pillar visuals present. New garment-photo direction supersedes SVG pillar illustrations.
- Our values now four fully visible tiles. Enlarged signet-blade relief added on selected sections.
- Testimonials hover/focus moves partially visible cards toward center; fixed-size artwork no longer stretches when long text expands. All source quotes retained.
- Garment imagery is illustrative AI-generated studio photography, not verified photographs of issued US Army equipment. Paired scenes use scroll/pointer-driven optical dissolve, scale/skew and focus shift, not a generated video or geometric 3D reconstruction.

Latest refinements: hero phrase gray/italic without tiles, 3.2-second cycle and 360ms hover-triggered alternate. Audience labels have a left-to-right decode wave returning to their original text. Removed logo relief from the intro/vision after review; only values retains it. Replaced tiny pillar SVG scenes with 360px-high photographic pairs (330px mobile). Default hero motif is fabric; other motifs remain selectable. See wardrobe-assets.md. A feathered travelling reveal avoids persistent doubled silhouettes mid-scroll.

### November 13 — military-first sequencing and slower cipher
All wardrobe pairs start military. Hero is scroll-only and reveals downward over at most180px, starting when the image enters a useful viewport position; cursor cannot override it. Desktop pillars remain military until pointer enters; pointer exit returns to military. Touch/coarse-pointer pillars use scroll instead. Reduced-motion remains static military.
Hero cipher now1400ms (1100ms hover), random character updates about136ms apart,4200ms cycle. Removed duplicate initialization and blocked overlapping/cascading hover transitions to avoid the reported finish flicker. Browser confirmed hero reaches progress1 after195px scroll with670px of image still visible; desktop only hovered middle pillar became civilian while neighbors remained military.

### November 13 — camouflage to blue circuits
Local branch `codex/camo-tech-animation`. Replaced the decorative chart with staggered fragments, square connection nodes and angled circuit traces. Scroll reverses the whole sequence; the endpoint contains no camouflage. Existing static reduced-motion fallback and offscreen/tab pausing remain; rendering is capped around 30fps. No new dependencies. Inspired by stagger/timeline patterns in Anime.js (https://github.com/juliangarnier/anime, 74.6k stars observed) and GSAP (https://github.com/greensock/GSAP, 30.6k); Three.js (https://github.com/mrdoob/three.js, 118k) evaluated as unnecessary for this 2D effect. GitHub counts observed November 13, 2026. Build/check pass; visual review at desktop and 390×844, keyboard skip link and console errors checked. Local preview only.

## Latest interaction round — November 13
Design V2: square profile framing, white hero progress bars, full-field mixed-character hero cipher, stationary alumni border, gradient pointer light and no rolling button labels. Hero photo responds to pointer light; pillars use tighter fabric crops and hover transitions. Audience tiles reveal photographs through brief grain. New generated handshake photograph; pixel camouflage outside the grid and in the navy footer moves on interaction. Film scales into its grid. Solid pillar separators and grid-aligned final audience cards.

Testimonials now show complete smaller text directly: horizontal scroll sequence on desktop, full vertical cards on mobile. Values keep prior card names visible; CEO and directors share Our leadership, advisors remain separate. Sticky header and fullscreen animated mobile menu with Escape/focus loop. Controller changes style only. Visible Example badges removed; fictional-profile accessible labels retained. Military role labels simplified without assigning formal service-specific ranks.

### Pointer reveal correction — November 13
Hero pointer interaction now reveals the civilian photograph locally through square camouflage cells; the white light overlay is removed. The existing scroll transition remains. Audience tiles and wardrobe pillars share `pixel-reveal.js` for the same 8px square-cell dissolve. Exterior and footer camouflage is hidden at rest, appears only around the pointer, and pulses slowly (2.6s phase). Pillar image borders are removed; column separators stay 1px. Browser verified military→civilian reveal, local footer footprint, 0px image borders, no console errors and mobile390px without overflow. Motion respects reduced-motion preferences. No publication performed.

## Local candidate — November 13, 2026, after Pages release

Not pushed yet. Continuous pointer trail across margins, section pauses and footer: rounded green camouflage → blue squares → gray glyphs, then fade. Hero photo changes after 90 px of scrolling without pointer pixel effects. Pillar photos use a smaller crop and soft dissolve. Film enlargement persists. Impact contains authentic testimonial excerpts with full-text dialogs; testimonials removed from navigation, Contact moved last. Legacy testimonial URL retained for compatibility. Values preserve all four titles as the stack exits. Footer uses the header logo animation. Active navigation, partner gradients, consistent grid and paragraph spacing updated.

Validation: build and check passed. Local production preview at port 4321; desktop and 390×844 browser checks, testimonial dialog/Escape and mobile menu/Escape checked. Lighthouse all seven base pages: 100 in all four categories, mobile and desktop. Design V2 homepage: performance 96 mobile / 100 desktop, accessibility and best practices 100, SEO 66 due to intentional preview noindex. These are local Lighthouse measurements, not live PageSpeed or field data.

Follow-up: removed rounded trail cells; green → blue now takes 0.3 s and glyphs appear after 0.65–0.95 s, with a 4.5 s departing trail. Hover keeps the trace alive. Footer renders glyphs immediately, without colored blocks. Menu hover is a 1 px underline without an arrow. Build/check and desktop visual verification passed; still a local candidate.

## Release authorized — November 13, 2026

Dominik requested publication of the final corrections (“jak skończysz to wal na prod”), interpreted as updating the existing GitHub Pages deployment. Includes the preceding local candidate. Smaller, more irregular background footprint resets to green on re-entry; canvas dimensions no longer reset on scroll. Film has solid horizontal framing and a full-film play affordance on hover/focus. Testimonials now use editorial rows. GSAP 3.15.1 ScrambleTextPlugin replaces handwritten hero and audience-label scrambling; assets are bundled locally, with reduced-motion and visibility handling preserved. Local build:pages and check passed; desktop/mobile story dialog and rendering checked. Cloudflare/domain configuration is unchanged.
