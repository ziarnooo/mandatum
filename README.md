# The Mandatum Foundation — Astro

Local Webflow migration incorporating Elizabeth's November 6, 2026 brief. Seven public pages, static HTML, local images, lightweight JavaScript for navigation and Contact. Source website: https://www.themandatum.org/.

```sh
npm ci
npm run build
npm run check
npm run preview -- --port 4321
```

Preview: http://127.0.0.1:4321. Astro 7 keeps the preview running in the background; `npx astro preview stop` stops it. Use `npm run dev` for live editing. `npm run audit -- --all` runs Lighthouse mobile and desktop across seven routes; Chrome must be installed.

- [Editing guide](docs/EDITING.md)
- [Migration and launch dependencies](docs/MIGRATION.md)
- [Quality and integration audit](docs/QUALITY.md)
- Agent instructions: `CLAUDE.md` and `AGENTS.md`

Runtime: Node 24.3+ (tested). Commit `package-lock.json` and use `npm ci` for reproducible installs. `dist/` is generated. Original public HTML and asset provenance are in `source/`; the importer is a one-time migration tool and should not be rerun over edited content.

Public repository `ziarnooo/mandatum` has been created, but remains empty. Push and GitHub Pages publication are pending approval of the revised V1/V2 preview. The prepared main-branch GitHub Actions workflow will publish after Pages is enabled. `npm run build:pages` creates a separate noindex artifact with project-prefixed URLs; the form validates locally without sending. Cloudflare production and DNS remain unconfigured. Preview-before-push approval is required for future edits. V3 uses the Leedlime reference with Mandatum branding; full-page comparison controls sit at the bottom right.
