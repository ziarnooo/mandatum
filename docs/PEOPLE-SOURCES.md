# People: public source research

Checked 13 November 2026. Names and Foundation roles remain those supplied by Elizabeth. This research does not replace approved biographies. Only two original portraits were downloaded; no faces or backgrounds were generated or changed. Shared people data was not edited.

## Confident matches

| Person | Evidence and professional link | Portrait |
| --- | --- | --- |
| Gary Landuyt | [Pat Tillman Foundation scholar biography](https://pattillmanfoundation.org/meet-our-scholars/gary-landuyt/) explicitly identifies him as a Mandatum founder. [LinkedIn](https://www.linkedin.com/in/gary-landuyt); his public Tillman Scholar announcement also mentions Mandatum. | `public/assets/gary-landuyt-source.png`, original public portrait, 306,611 bytes. [Original image](https://pattillmanfoundation.org/wp-content/uploads/2025/07/LanduytGary-1.png). Use the same person/asset for both board roles. |
| Rob Madore | [LinkedIn](https://www.linkedin.com/in/robertmadore) public search result lists Member of Board of Advisors, The Mandatum Foundation. [Official MarshBerry profile](https://www.marshberry.com/about/our-team/rob-madore/) links that exact LinkedIn account and identifies the investment banker, formerly a professional hockey player. Direct LinkedIn re-fetch returned 429; no login bypass attempted. | `public/assets/rob-madore-source.jpg`, original public portrait. [Original image](https://www.marshberry.com/wp-content/uploads/2023/01/MADORE-ROB_HEADSHOT-768x994.jpg), linked as “Rob Madore - Director” on his official profile. |
| Bob Freese | [LinkedIn](https://www.linkedin.com/in/bobfreese) public result explicitly lists The Mandatum Foundation. Sales/marketing/business background, North Port–Sarasota area. | No reliable downloadable original portrait found. Keep placeholder until an owner asset or verified public portrait arrives. |

Downloaded files are source assets for local review. Public availability establishes provenance, not a statement that a third-party photograph is freely licensed. Owner-supplied replacements remain preferable for the final asset library.

## Candidates requiring identity confirmation

Do not attach these candidates' photographs or biographies to the live board merely because names match.

| Board entry | Lead | Missing evidence |
| --- | --- | --- |
| John Maggio | [Public self-authored post](https://www.linkedin.com/posts/maggiojohn_kineticindustries-sofweek-defensetech-activity-7460378066822017025-l6Z-) describes 20+ years in USSOCOM and Kinetic Industries in Virginia Beach; Gary Landuyt comments. | Direct Mandatum affiliation or owner confirmation. A shared acquaintance is insufficient. |
| Greg Badessa | [Public self-authored post](https://www.linkedin.com/posts/greg-badessa_after-serving-22-years-in-the-navy-i-sought-activity-7222039082032402432-KVZK) describes 22 years in Navy and Johnson & Johnson transition program. Other public post announces Trails of Purpose board appointment. | Primary source connecting this person to Mandatum; approved headshot. |
| Matt Byington | [Public retirement post](https://www.linkedin.com/posts/matthewdbyington_step-2-is-complete-words-cant-express-activity-7114054857627443200-8sq1). Candidate has Navy EOD/General Catalyst background. | Primary Mandatum connection; approved headshot. |
| John Gordon | Several unrelated namesakes; no confident match. | Owner's profile link or short employer/service identifier. |
| James Darby | No confident public match connected to Mandatum. | Owner's profile link or short employer/service identifier. |
| Edward Burch | No confident public match connected to Mandatum. | Owner's profile link or short employer/service identifier. |

Existing Bill Ahern, Tony Owens, Justin Hoffman and Damon George portraits came from the original Foundation site and are already in the asset library. Preserve those originals.

## Consistent, replaceable portraits

Keep originals intact. Any background replacement must retain the actual person's face and identity and should be reviewed before use. Store final derivatives separately from `*-source` assets; use one stable asset per person and reference it from `src/data/people.json`. Gary's two board entries should reference one portrait. Use consistent frame ratio and head position in presentation; missing portraits remain intentional placeholders.

## What “Past Events” contains

`src/data/events.json` is an archive imported from the original Foundation website: ten event names, seasonal dates and locations spanning Winter 2024–Spring 2026. It is not an upcoming-events calendar or a set of event articles. No event photographs or detailed descriptions are supplied in that data.

- 2026: eMerge Americas (Miami Beach); Dallas Blue Label Fundraiser (Dallas).
- 2025: Family Day (Virginia Beach); Nashville Fundraiser (Nashville).
- 2024: Bustin’ Clays (Brighton); Whiskey House Nashville; 911 Honor and Serve Foundation Event, as guest foundation (Bigfork); NJ Fireside Chat (Summit); Family Day (Virginia Beach); Nashville Fundraiser.

The historical Family Day entries are separate from the removed Family Support pillar. Removing that pillar does not change what events previously occurred.

Implementation: Gary's two entries reference `gary-landuyt-original.webp` (the unchanged original, optimized). Rob references `rob-madore.webp`. Verified LinkedIn URLs for Gary, Rob and Bob are in `src/data/people.json`. Replace a person's `image`/`social` fields to update the site; all names/roles/biographies remain owner-provided. The AI background-edit candidate for Gary is retained separately for review and is not used on the site because it subtly changed facial detail.
