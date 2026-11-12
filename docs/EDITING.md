# Updating the website with Claude Code

Open this project in Claude Code. Describe what you want changed, for example:

> Update John Maggio’s biography with this text and photo. Show me a preview before pushing anything.

Claude will make the change, check it, and give you a local preview URL. Review the page on desktop and mobile. Ask for adjustments as often as needed.

When you approve the exact preview, say:

> This version looks good. Push it to the agreed branch.

A push may publish the site once hosting automation is connected. Claude must explain that before the first push. Until a repository and hosting are configured, all changes stay on this computer.

## Where content lives

| Change | File |
| --- | --- |
| Intro, mission, impact numbers, donation links, address | `src/data/site.json` |
| Leadership names, titles, biographies, photos | `src/data/people.json` |
| Testimonials | `src/data/testimonials.json` |
| Questions and answers, grouped by category | `src/data/faq.json` |
| Partners | `src/data/partners.json` |
| Three pillars | `src/data/pillars.json` |
| Foundation overview, logo meaning, values | `src/data/foundation.json` |
| Past events | `src/data/events.json` |
| Images | `public/assets/` |

You do not need to edit these files yourself. Give Claude the approved text and images. Never paste passwords or payment credentials into content files.
