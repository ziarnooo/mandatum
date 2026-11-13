# Mandatum website

## Outcome
Elizabeth can update the Foundation website by talking to Claude Code. Every change is shown in a working preview before any push. Keep the site fast, accessible, easy to edit, and honest about missing materials.

## Required workflow
1. Read the request and `docs/MIGRATION.md`. Ask only questions that change the work. Check `git status` and preserve existing edits.
2. Make a small, focused change on a local branch. Content lives in `src/data/*.json`; layout in `src/pages/`, `src/components/`, and `src/styles/`. Do not edit `dist/`.
3. Run `npm run build` and `npm run check`. For layout, assets, scripts, or performance changes, run `npm run audit -- --all` against the production preview on port 4321. Check mobile, desktop, links, and keyboard interactions.
4. Start `npm run preview -- --port 4321` (Astro 7 runs it in the background). Show the preview URL and a short explanation of what changed and any outstanding content. If Elizabeth is remote, agree on a preview method; do not push merely to create a preview without explicit permission.
5. Wait for explicit approval of the displayed version, such as “Looks good, push it.” A local commit is allowed; push, merge, deployment, DNS changes, and external messages are not implied by an edit request. New edits invalidate previous approval.
6. After approval, check the diff for secrets/unrelated files, commit if needed, and push only to the agreed repository/branch. Explain whether that branch triggers deployment. Never force-push. Verify any resulting deployment and report its URL.

## Quality bar
- Target 100 in Lighthouse performance, accessibility, best practices and SEO, mobile and desktop. Record actual scores, date and environment. Local Lighthouse is not live PageSpeed Insights or real-user Core Web Vitals.
- Static HTML first; no client framework or third-party embed without a demonstrated need. Use local optimized images, dimensions, lazy loading below the fold, semantic elements and native details/summary.
- Keep metadata, canonical URLs, sitemap, structured data, Markdown, and `llms.txt` aligned. `scripts/postbuild.mjs` derives machine-readable content from rendered pages.
- Agent-readiness is evaluated using Cloudflare's Content Site profile. Do not create fake OAuth, payment, MCP or commerce endpoints for points. Report hosting/DNS-dependent checks separately.
- Never invent testimonials, biographies, metrics, donation URLs, or eligibility rules. Missing content stays documented. Zeffy remains inactive until verified details arrive.
- Payment links must point to the Foundation's approved accounts; no payment processing is hosted here.
- Keep analytics disabled until the owner provides the correct account/configuration and approves activation. Do not claim GSC is connected based only on a verification token.

## Commands
`npm ci` · `npm run dev` · `npm run build` · `npm run check` · `npm run preview -- --port 4321` · `npm run audit -- --all`

## Scope
Dominik explicitly authorized a public personal GitHub repository and GitHub Pages review publication on November 12, 2026: `ziarnooo/mandatum`, branch `main`. The repository is created but empty. Automatic approval review blocked the first push because the revised V1/V2 preview needs explicit approval; do not retry push until that approval arrives. Once enabled, pushes to main will deploy the review automatically. Subsequent changes still follow preview-before-push approval. Cloudflare production, domain cutover and DNS are not authorized by this review deployment. V1 = original Webflow design + email corrections; V2 = same design + improved flow; V3 uses the user-supplied https://leedlime.com/ design reference with original Mandatum logo and navy. All versions open as full pages with compact bottom controls.

November 13 release authorization: Dominik explicitly requested “wrzuc juz na githuba” together with the final cipher, plasma-mask, typography and gradient corrections. Publish this corrected candidate to `ziarnooo/mandatum` main after local verification. This supersedes the earlier first-push approval block for this release only. Future edits still follow the normal preview workflow. Cloudflare production/DNS remain unauthorized.
