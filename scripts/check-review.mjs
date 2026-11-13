import fs from 'node:fs/promises';import assert from 'node:assert/strict';import {load}from'cheerio';
const routes=['','about-us/','partnerships/','testimonials/','contact/','faq/','donate/'];
for(const version of ['v1','v2','v3'])for(const route of routes){
 const file=`dist/review/${version}/${route}index.html`,$=load(await fs.readFile(file,'utf8'));
 assert.equal($('h1').length,1,file);assert.equal($('iframe').length,0,'No preview frame');assert.equal($('.review-controls').length,1);assert.equal($('.review-controls select').length,1);assert($('meta[name=robots]').attr('content').includes('noindex'),file);
 for(const option of $('.review-controls option[data-url]').toArray())await fs.access('dist'+$(option).attr('data-url'));
 for(const el of $('a[href],img[src],script[src],link[href],video[data-src]').toArray()){
  const href=$(el).attr('href')||$(el).attr('src')||$(el).attr('data-src');if(!href.startsWith('/')||href.startsWith('//'))continue;
  const path=href.split('#')[0];await fs.access('dist'+path);
  if($(el).is('a')&&!$(el).closest('.review-controls').length&&path.endsWith('index.html'))assert(path.startsWith(`/review/${version}/`),`Version leaked: ${file} -> ${path}`);
 }
}
assert((await fs.readFile('public/assets/logo.svg','utf8')).includes('<svg'),'Original logo must remain available');
console.log('PASS: 21 review pages, noindex, local links/assets, isolated navigation, original logo.');

const v3=load(await fs.readFile('dist/review/v3/index.html','utf8'));assert.equal(v3('.desktop-nav a').length,5);assert.equal(v3('.mega-panel').length,0);assert.equal(v3('.header-v3 .brand-wordmark .logo-sword').length,3);assert.equal(v3('.profile-story').length,3);assert.equal(v3('.profile-selector button').length,3);assert.equal(v3('.example-tag').length,0);assert.equal(v3('video.mission-video[muted][playsinline]').length,1);assert.equal(v3('.scroll-statement').length,1);assert(!(await fs.readFile('public/assets/logo-navy.svg','utf8')).includes('fill="white"'));
const partners=load(await fs.readFile('dist/review/v3/partnerships/index.html','utf8'));assert.equal(partners('.partner-invite .actions .button').length,2);assert.equal(partners('.partner-logo-trigger').length,7);assert.equal(partners('.partner-description-panel').length,7);assert.notDeepEqual(await fs.readFile('public/assets/partner-j2-ventures.webp'),await fs.readFile('public/assets/partner-the-pillar-foundation.webp'));
console.log('PASS: V3 inline navigation, navy logo, illustrative career roles, paired CTAs, seven logo cells and correct Pillar asset.');
