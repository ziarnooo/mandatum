# Wardrobe transition assets

Generated November 13, 2026 with the built-in ImageGen tool. These are illustrative AI-generated product photographs, not photographs of authentic issued equipment, Foundation property or actual Fellows. No insignia or brand claims. Original PNGs remain in the local generated-images library; optimized deliverables live in `public/assets/`.

## Deliverables

Each `morph-{name}.webp` is a 1774 × 887 diptych: military image in the left 887 × 887 half, civilian image in the right half; no gutter. Endpoints are separately prepared with sharp, WebP quality80. These deterministic crops do not change image content.

| Name | Transition | Endpoint size | Endpoint total |
|---|---|---|---|
| fabric | camouflage shoulder textile → navy suit wool, matched diagonal seam/fold | 960 × 960 | 242 KiB |
| headwear | generic camouflage combat helmet → navy baseball cap | 600 × 600 | 60 KiB |
| footwear | tan military-style boot → brown civilian derby shoe | 600 × 600 | 44 KiB |
| collar | olive utility jacket collar → navy blazer lapel | 600 × 600 | 104 KiB |

Endpoint filenames: `morph-{name}-military.webp` and `morph-{name}-civilian.webp`. Full diptychs are provenance/review assets; load only endpoints for the website. Original source dimension887 means fabric960 is mildly upscaled; do not enlarge further. Headwear was regenerated to correct an inaccurate visor on the first draft; only corrected version is delivered.

## Prompt set

Shared prompt: photorealistic editorial product-mockup diptych, two equal square panels in2:1 landscape, flush center with no gutter; matching camera angle, framing and upper-left studio light; muted navy/slate palette, tactile stitching/material; no people, mannequin, writing, insignia, logo or watermark. Designed as two animation endpoints, not a video or physically continuous morph.

- Fabric: extreme macro camouflage woven shoulder with one diagonal seam and soft fold, paired with navy tailored wool shoulder retaining seam/fold geometry; material fills both squares.
- Headwear (final): realistic rounded combat helmet with camouflage cover, short rolled rim, no projecting visor and no cap underneath; chin strap folded below. Paired navy baseball cap with normal curved visor. Front lower-left, same crown alignment, pale slate backdrop; natural shape differences allowed.
- Footwear: tan suede lace-up combat boot and dark-brown leather derby, both point left at same slight three-quarter angle; matching sole baseline, toe/heel placement, perspective and shadows; height differs naturally.
- Collar: olive utility collar/placket and deep-navy wool blazer lapel over pale-blue shirt, diagonal folds aligned, invisible torso, close crop, tiny slate backdrop at upper corners.

## Sources

Local generator directory: `/Users/dominikziarno/.codex/generated_images/01a1d525-5179-7073-94d0-93ff77c2cec6/`.

- Fabric: `exec-1301e37b-3909-41e4-afef-6ff7a8623cc0.png`
- Headwear final: `exec-ecaa9a80-e191-4390-bf3c-ddfd52c0ae35.png`
- Footwear: `exec-0ce1eb0c-f172-43b3-9bcb-37d00a21cee5.png`
- Collar: `exec-3b356048-2479-4b16-a835-919d4a8dc979.png`

Visual review: all pairs have consistent scene/light and suitable square crops. Material is detailed and collar/footwear endpoints read clearly. They are not exact pixel-correspondence assets: use a restrained dissolve/optical distortion and do not describe the implementation as generated video.

Integration optimization: root resized the two fabric endpoints to 640×640, WebP quality65 (61,286 + 25,560 bytes total) for the softly overlaid hero background. Original diptych remains intact. Other endpoints remain600×600. Hero military endpoint is eagerly loaded with high fetch priority, other images lazy-load.
