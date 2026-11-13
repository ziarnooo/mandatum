# Direction B — Human potential

Local prototype: `/review/direction-b/index.html`. November 13, 2026. A deliberately separate option, not an accepted sitewide design. Uses the user's supplied frontend-design skill process. No push or deployment.

## Plan

**Subject:** a Foundation helping retiring Special Operations members find a meaningful civilian career. B puts the people speaking about that work ahead of an abstract technology visual.

**Palette:** white `#ffffff`, mineral `#edf2f5`, Mandatum navy `#003462`, ink `#102e41`, muted `#586775`, line `#d4dfe5`.

**Type:** one sans family, Helvetica Neue / Helvetica / Arial. Display 500, tight tracking and 0.99–1.02 line-height; body 400 with open line-height. No Georgia, cream canvas or display-font accent gimmick. The original logo retains its lettering.

**Layout:** an oversized, left-aligned headline sits above an asymmetric film/profile composition. Film occupies roughly 70%; the career profile becomes a quiet supporting rail. Intro uses large text opposite a short heading; the pillars are plain columns in one mineral section. Quotes follow a vertical reading sequence with a sticky index; partner marks sit beside partnership copy.

```
logo                           navigation / Donate
Your experience                 concise explanation
matters.                        Explore Fellowship
[         authentic film        ]  career story
[         caption               ]  military → civilian
Fellows                   Organizations             Supporters
short heading             exact Foundation introduction
        three services on one quiet mineral plane
story index               full quote, revealed while reading
partner invitation        original partner marks
```

## Pre-build critique

A standard split-photo hero would merely restyle V3. Revised the plan to place the oversized opening *above* the film/profile pair; film is the dominant image, not a backdrop to a floating card. Avoided framed glass, camo, decorative charts, scattered all-caps labels, repeated cards and painterly imagery. This is structurally different from A's centered dark cinematic profile and line field, not a light palette swap.

## Implementation

- Independent `direction-b.css` and `direction-b.js`, no V3 stylesheet inheritance.
- `scripts/build-direction-b.mjs` exports `buildDirectionB()`. The main review build invokes it after V3; standalone regeneration is `node scripts/build-direction-b.mjs`.
- Reuses original animated Mandatum mark, authentic Foundation film, existing explicitly fictional example career profiles, complete source testimonials, seven actual partner marks and the exact Foundation introduction.
- Only middle hero words decode; matters stays on its own line. Button labels roll without moving the button box. Audience labels decode back to their original words.
- Film auto-plays muted only while visible; accessible play/pause is a restrained icon revealed on hover/focus, without a prominent Pause label. Reduced motion starts static.
- Profiles advance military → coaching/immersion/connections → civilian; manual selector stops on the chosen completed example. Reduced motion shows a complete static example.
- Testimonials follow normal document scroll. Entering a story expands its full text once and advances the index. Native details remain keyboard/touch controls; no-JS and reduced-motion expose all full text. It intentionally does not hijack wheel input or hide quotes in a canvas.
- Review switch links A, B and previous V3. Other navigation goes to existing V3 pages: only this representative landing has the new direction.

## Visual checks and critique

Desktop 1272px and mobile 390×844 inspected in Chrome. `scrollWidth === innerWidth` at both sizes. Menu opens and Escape closes; manual profile selection shows the corresponding complete example; first testimonial expands on scroll. No captured console errors. Syntax check passed; full build/check and Lighthouse are coordinated by parent agent, not separately claimed here.

Proof images: `/private/tmp/direction-b-desktop.png` and `/private/tmp/direction-b-mobile.png` (initial pass; parent may copy updated final proofs to reports). Initial screenshots included a Pause text control; final source replaces it with an unobtrusive icon per review.

The strongest difference is the honest human film and confident sans typography. The prototype deliberately removes pillar illustrations to test composition first; this is a representative design comparison, not completion of every historical request for all seven pages. Long second testimonial remains naturally long after expansion; no invented portraits or shortened attribution. Potential next refinement, only after direction selection: unify remaining pages with B's tokens and tune the career rail density alongside the film.
