// Decorative editorial diagrams. Labels describe the programme, not measured results.
const shell = (name, body) => `<div class="pa-art pa-${name}" aria-hidden="true"><svg class="pa-scene" viewBox="0 0 340 240" xmlns="http://www.w3.org/2000/svg">${body}</svg></div>`;
const defs = (id) => `<defs><linearGradient id="pa-paper-${id}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff"/><stop offset="1" stop-color="#edf3f7"/></linearGradient><linearGradient id="pa-navy-${id}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#365b77"/><stop offset="1" stop-color="#003462"/></linearGradient></defs>`;
const signet = `<path d="M.617 9.583V52.063L13.538 37.199H4.216V13.182H19.098V52.609H13.718L20.893 60.865L28.069 52.609H22.689V13.178H37.571V37.196H28.248L41.169 52.059V9.583Z M2.413 .865H39.374V4.464H2.413Z"/>`;

export const pillarArt = [
 shell('immersion', `${defs('immersion')}
  <path class="pa-guide" d="M25 211H315M38 23V220M302 23V220"/>
  <g class="pa-back-card"><rect x="45" y="35" width="182" height="159" rx="9" fill="#dce7ee" stroke="#b2c6d4"/><path d="M59 48h36" class="pa-rule"/></g>
  <g class="pa-main-card">
   <rect x="54" y="44" width="182" height="159" rx="9" fill="url(#pa-paper-immersion)" class="pa-card"/>
   <path d="M54 76H236" class="pa-rule"/><circle cx="70" cy="60" r="3" fill="#003462"/><text x="81" y="64" class="pa-kicker">INSIDE THE INDUSTRY</text>
   <g class="pa-building" fill="none" stroke="#5d7f98" stroke-width="1.2"><path d="M80 171V104L119 91V171M119 104H182V171M72 171H192"/><path d="M91 115v8m15-13v8m-15 17v8m15-13v8m29-21h12m11 0h12m-35 17h12m11 0h12M140 171v-19h20v19"/></g>
   <path class="pa-scan" d="M75 150H194" fill="none" stroke="#003462" stroke-width="1"/>
   <text x="78" y="188" class="pa-caption">Real teams. Real experience.</text>
  </g>
  <g class="pa-note-card"><rect x="207" y="98" width="98" height="111" rx="7" fill="url(#pa-navy-immersion)" stroke="#456d89"/>
   <path d="M221 115h19m-19 5h13" stroke="#c0d0dd" stroke-width="1.2"/><text x="221" y="139" class="pa-white">Observe</text><text x="221" y="162" class="pa-white">Contribute</text><text x="221" y="185" class="pa-white">Reflect</text>
   <g class="pa-check pa-check-a"><path d="m279 134 3 3 6-7"/></g><g class="pa-check pa-check-b"><path d="m279 157 3 3 6-7"/></g><g class="pa-check pa-check-c"><path d="m279 180 3 3 6-7"/></g>
  </g>`),
 shell('coaching', `${defs('coaching')}
  <path class="pa-guide" d="M25 211H315M38 23V220M302 23V220"/>
  <rect x="68" y="44" width="204" height="161" rx="9" fill="#dce7ee" stroke="#b2c6d4"/>
  <g class="pa-main-card"><rect x="59" y="35" width="204" height="161" rx="9" fill="url(#pa-paper-coaching)" class="pa-card"/>
   <circle cx="81" cy="58" r="11" fill="#e1eaf0" stroke="#b7c9d7"/><path d="M77 58h8m-4-4v8" stroke="#42667f" stroke-width="1.2"/><text x="101" y="57" class="pa-kicker">ONE-TO-ONE</text><text x="101" y="70" class="pa-caption">A plan built around you</text>
   <path d="M59 84H263" class="pa-rule"/>
   <path d="M84 106V166" stroke="#c1d2df" stroke-width="1.5"/><path class="pa-plan-line" d="M84 106V166" fill="none" stroke="#003462" stroke-width="1.5"/>
   <circle cx="84" cy="106" r="4" fill="#003462"/><text x="100" y="110" class="pa-label">Your experience</text><path d="M100 117H182" class="pa-fine-rule"/>
   <circle cx="84" cy="136" r="4" fill="#7c9ab0"/><text x="100" y="140" class="pa-label">A clear direction</text><path d="M100 147H170" class="pa-fine-rule"/>
   <circle cx="84" cy="166" r="4" fill="#bed0de"/><text x="100" y="170" class="pa-label">Your next move</text>
  </g>
  <g class="pa-coach-badge"><rect x="190" y="158" width="115" height="51" rx="7" fill="url(#pa-navy-coaching)" stroke="#456d89"/>
   <circle cx="211" cy="180" r="8" fill="none" stroke="#afc5d6"/><circle cx="211" cy="178" r="2.5" fill="#d5e1ea"/><path d="M206 184q5-6 10 0" fill="none" stroke="#d5e1ea"/><text x="227" y="179" class="pa-white">Your coach</text><text x="227" y="193" class="pa-white-small">Alongside you</text>
  </g>`),
 shell('network', `${defs('network')}
  <path class="pa-guide" d="M25 211H315M38 23V220M302 23V220"/>
  <ellipse cx="170" cy="123" rx="106" ry="80" fill="none" stroke="#c1d0db" stroke-dasharray="2 7"/>
  <g class="pa-network-lines" fill="none" stroke="#95aec1" stroke-width="1.1"><path d="M170 123 83 65M170 123 263 67M170 123 84 184M170 123 264 180"/></g>
  <g class="pa-network-travel" fill="none" stroke="#003462" stroke-width="1.6" stroke-dasharray="5 110"><path d="M83 65 170 123M263 67 170 123M84 184 170 123M264 180 170 123"/></g>
  <g class="pa-main-card"><rect x="133" y="86" width="74" height="74" rx="13" fill="#c2d1dc" opacity=".5"/><rect x="133" y="82" width="74" height="74" rx="13" fill="url(#pa-paper-network)" class="pa-card"/><rect x="140" y="89" width="60" height="60" rx="9" fill="none" stroke="#d3e0e9"/><g transform="translate(158 99) scale(.56)" fill="#003462">${signet}</g></g>
  <g class="pa-network-tile pa-tile-a"><rect x="45" y="43" width="77" height="44" rx="6" fill="#f9fcfe" class="pa-card"/><circle cx="61" cy="58" r="4" fill="#50748e"/><text x="55" y="76" class="pa-label">Mentors</text></g>
  <g class="pa-network-tile pa-tile-b"><rect x="226" y="45" width="77" height="44" rx="6" fill="#f9fcfe" class="pa-card"/><path d="M239 56h8v8h-8z" fill="#8da8bb"/><text x="237" y="78" class="pa-label">Leaders</text></g>
  <g class="pa-network-tile pa-tile-c"><rect x="45" y="163" width="77" height="44" rx="6" fill="#f9fcfe" class="pa-card"/><circle cx="59" cy="177" r="3" fill="#668aa3"/><circle cx="67" cy="177" r="3" fill="#a4bbcc"/><text x="55" y="197" class="pa-label">Peers</text></g>
  <g class="pa-network-tile pa-tile-d"><rect x="226" y="158" width="77" height="44" rx="6" fill="#f9fcfe" class="pa-card"/><path d="M238 170h12m-6-4v8" stroke="#668aa3" stroke-width="1.4"/><text x="237" y="192" class="pa-label">Partners</text></g>`),
];
