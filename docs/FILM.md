# Homepage film preview

Verified November 13, 2026 from the Foundation’s original public Webflow HTML (`source/index.html`, mission lightbox).

## Local assets

- `public/assets/mandatum-film.mp4`: original 20.033-second Webflow autoplay preview clip; H.264, 1280 × 720, 2,018,928 bytes. It contains **no audio stream**. Downloaded unchanged.
- `public/assets/film-poster.webp`: original 1280 × 720 poster, encoded to WebP at quality 80.

Original public URLs:

- MP4: https://cdn.prod.website-files.com/66fa7aa95dbb233d0af12794%2F69e9d8a4b0e8fbc4cf7f7a97_Mandatum_mp4.mp4
- Poster: https://cdn.prod.website-files.com/66fa7aa95dbb233d0af12794%2F69e9d8a4b0e8fbc4cf7f7a97_Mandatum_poster.0000000.jpg
- Full-film destination already linked by the original website: https://youtube.com/watch?v=M6fV7lvx42o

The local file is the short preview, not a verified copy of the full YouTube film. Do not label it as the complete film or show an unmute action. A “Watch full film” link can retain the original YouTube destination.

## Playback

Use native video with `muted`, `playsinline`, poster and an accessible pause/play control. Muted autoplay may still be refused by device/browser policy; retain manual play and do not bypass that refusal. Prefer starting when visible and pausing when out of view/when the document is hidden. Respect reduced-motion preference by showing the poster until explicit play. The original Webflow markup uses autoplay, loop, muted and playsinline for this asset.

No third-party player or YouTube extraction is required. Dimensions and duration were checked using ffprobe; source responded HTTP 200 and supports byte ranges.

November 13 refinement: no visible heading/caption above or below the film. The silent preview resumes when it returns onscreen unless manually paused. Native controls appear after clicking the video or using Enter/Space; a hover/focus overlay links to the full movie. Touch devices keep the full-film action visible. There is no separate pause overlay; clicking the video or pressing Enter/Space exposes native playback controls.

November 13 second refinement: `mandatum-conversations.mp4` is a 9-second silent loop made from original clip timestamps 4–7.5 and 12–17.5 seconds. These show the two speakers, with the opening title and cutaways omitted. `conversations-poster.webp` uses the original frame at 4 seconds. Same native player on Home and About; full-film link remains the original YouTube URL.

Current caption: “Our mission” sits at the lower left over a soft dark gradient, without a badge; “See full video” appears below on hover or keyboard focus, and remains visible on touch devices.

Latest V3 caption: h2 “A new chapter of service.” with a Foundation-topic description. Copy is editable in `src/data/home-review.json` (`filmTitle`, `filmDescription`); it is editorial context, not a verified transcript or quotation.
