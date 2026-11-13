# Partner logo assets

Verified November 13, 2026 against the original public Webflow source (`source/partnerships.html`).

The previous Pillar image duplicated the J2 Ventures mark because the importer selected the first image in each section. Pillar's first source image is itself the J2 mark; the second is its correct logo. Replaced only `public/assets/partner-the-pillar-foundation.webp` using:

https://cdn.prod.website-files.com/66fa7aa95dbb233d0af12794/69ca2af3cb3a28ea869d9f27_pillar%20website.png

Transparent margins trimmed; constrained to 440 × 160 pixels without enlargement; lossless WebP with alpha preserved. No recoloring or redrawing.

## Presentation

All seven current marks are transparent, primarily white artwork. Use dark navy trays (#082d49 or #003462), with generous consistent padding; do not apply blanket brightness/invert filters.

| Partner | Treatment |
| --- | --- |
| Portraits For Patriots | Dark tray; preserve white lettering and red/blue flag detail |
| Candorful | Dark tray; preserve pale lettering and subtle green details |
| Oplign | Dark tray; preserve turquoise OP and white LIGN |
| ZeroEyes | Dark tray; white mark |
| The STEPS Foundation | Dark tray; white mark |
| J2 Ventures | Dark tray; white mark |
| The Pillar Foundation | Dark tray; white mark; allow greater visual height for its stacked lockup |

Prefer `object-fit: contain`, a common tray height, and logo-specific max widths over stretching each asset to identical dimensions. Existing `width=500 height=300` attributes do not describe the stored assets; use actual dimensions when touching their markup.
