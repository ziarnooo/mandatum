import {buildDirection} from './build-direction.mjs';
import {buildDirectionB} from './build-direction-b.mjs';
import fs from 'node:fs/promises';
import {load} from 'cheerio';
import {refineV3} from './v3-refinements.mjs';
import {v3Header,icon} from './review-ui.mjs';
import {pillarArt} from './pillar-art.mjs';
await fs.mkdir('dist/review/vendor',{recursive:true});
for(const name of ['gsap.min.js','ScrambleTextPlugin.min.js'])await fs.copyFile('node_modules/gsap/dist/'+name,'dist/review/vendor/'+name);
const logoSource=await fs.readFile('public/assets/logo-navy.svg','utf8');
const animatedLogo=logoSource.replace(/<path[^>]+\/>/,`<g fill="#003462"><path d="M.617 9.583H41.169V13.182H.617Z"/><g class="logo-sword sword-left"><path class="logo-stem" d="M.617 13.18H4.216V37.199H.617Z"/><path class="logo-blade" d="M.617 37.199H13.538L.617 52.063Z"/></g><g class="logo-sword sword-center"><path class="logo-stem" d="M19.098 13.18H22.689V52.609H19.098Z"/><path class="logo-blade" d="M13.718 52.609H28.069L20.893 60.865Z"/></g><g class="logo-sword sword-right"><path class="logo-stem" d="M37.571 13.18H41.169V37.196H37.571Z"/><path class="logo-blade" d="M28.248 37.196H41.169V52.059Z"/></g></g>`).replace('<svg ', '<svg class="brand-wordmark" aria-hidden="true" ');
const v3film=load(await fs.readFile('dist/review/v3/index.html','utf8'))('.foundation-film').toString();
const home=load(await fs.readFile('dist/index.html','utf8'));
const context=home('section').filter((_,el)=>home(el).find('.values,.events').length||home(el).is('.original-vision,.original-mission')).clone();
context.find('.values article').each((i,el)=>{const p=home(el).find('p');const parts=p.text().split(/(?=Trust is the foundation|Success is never achieved alone|We embrace a mindset)/);if(parts.length===4)p.text(parts[i]);});
const reviewContent=JSON.parse(await fs.readFile('src/data/home-review.json','utf8'));
const testimonials=JSON.parse(await fs.readFile('src/data/testimonials.json','utf8'));
const pillars=JSON.parse(await fs.readFile('src/data/pillars.json','utf8'));
const routes=['/','/about-us','/partnerships','/testimonials','/contact','/faq','/donate'];
const fileFor=route=>route==='/'?'index.html':`${route.slice(1)}/index.html`;
// Both versions use the original visual system. V1 includes the requested email updates.

for(const version of ['v1','v2','v3'])for(const route of routes){
 const prefix=`/review/${version}`;
 const target=`dist${prefix}/${fileFor(route)}`;
 const input=version!=='v1'&&route==='/'?target:`dist/${fileFor(route)}`;
 const $=load(await fs.readFile(input,'utf8'));
 $('head').append('<meta name="robots" content="noindex,nofollow"/>');
 $('link[rel=canonical],link[rel=alternate]').remove();
 $('title').text(`${version==='v3'?'Design V2':version.toUpperCase()} · ${$('title').text()}`);
 if(version!=='v1'){
  $('body').addClass(`variant-${version}`);
  if(route==='/faq'){
   const intro=load('<section class="section section-line"><div class="container"><p class="eyebrow">For future Fellows</p><h2>Explore your next step.</h2><p class="lead">Retiring from Special Operations? Talk with our team about your goals and the support available through Mandatum.</p><div class="program-details"></div><a class="button" href="/contact">Discuss your transition →</a></div></section>',null,false);
   for(const pillar of pillars){const detail=load('<details><summary></summary><p></p></details>',null,false);detail('summary').text(pillar.title);detail('p').text(pillar.text);intro('.program-details').append(detail.html());}
   $('main > section').first().after(intro.html());
  }
  if(route==='/about-us')$('main > section').eq(1).after(context.toString());

 }
 if(version==='v3'){
  $('head').append('<link rel="stylesheet" href="/review/v3.css"/><link rel="stylesheet" href="/review/pillar-art.css"/>');
  $('.site-header').replaceWith(v3Header(route));$('.brand img').replaceWith(animatedLogo);
  $('body').append('<script src="/review/vendor/gsap.min.js"></script><script src="/review/vendor/ScrambleTextPlugin.min.js"></script><script type="module" src="/review/v3.js"></script>');
  // Only V3 gets the painterly art direction and unified button treatment.
  $('.hero-image > img').attr('src','/assets/military-landscape.webp').attr('srcset','/assets/military-landscape-small.webp 700w, /assets/military-landscape.webp 1400w').attr('sizes','(max-width:760px) 100vw, 50vw').attr('alt','Painterly coastal landscape linking military service and civilian opportunity');
  $('link[rel=preload][as=image]').attr('href','/assets/military-landscape.webp').attr('imagesrcset','/assets/military-landscape-small.webp 700w, /assets/military-landscape.webp 1400w').attr('imagesizes','(max-width:760px) 100vw, 50vw');
  $('.actions .text-link').removeClass('text-link').addClass('button outline');
  if(route==='/partnerships')$('.actions a').eq(1).text('How hosting works');
  $('.button,.text-link,.social a').each((_,el)=>{
   const item=$(el);item.find('span[aria-hidden],svg').remove();item.contents().each((__,node)=>{if(node.type==='text')node.data=node.data.replace(/[→↗]/g,'').trim();});
   item.append(icon(item.attr('href')?.startsWith('https:')?'external':'arrow'));
  });
  $('.route-grid a span[aria-hidden]').replaceWith(icon('external'));
  if(route==='/partnerships'){
   const rows=$('.partner-row').toArray();
   const wall=load('<div class="partner-wall"><div class="partner-wall-intro"><p class="eyebrow">Stronger together</p><h2>Our partners</h2><p>A network that opens doors.</p></div></div><div class="partner-descriptions"></div>',null,false);
   rows.forEach((row,i)=>{const item=$(row),id=`partner-${i}`;const link=load('<a class="partner-logo-cell"></a>',null,false);link('a').attr('href',`#${id}`).attr('data-partner',id).attr('aria-label',`About ${item.find('h2').text()}`).append(item.find('.partner-logo img').clone());wall('.partner-wall').append(link.html());
    const detail=load('<details class="partner-description"><summary></summary><div class="partner-detail-content"></div></details>',null,false);detail('details').attr('id',id);detail('summary').text(item.find('h2').text());detail('.partner-detail-content').append(item.find('p').clone()).append(item.find('a').clone());wall('.partner-descriptions').append(detail.html());
   });
   $('.partner-row').first().parent().html(wall.html());
  }

  if(route==='/')$('.support-section .pillar .number').each((i,el)=>$(el).removeClass('number').addClass('pillar-diagram').html(pillarArt[i]));
  refineV3($,route,v3film);
  $('.film-mission').replaceWith($('<h2 class="film-mission"></h2>').text(reviewContent.filmTitle));
  $('.film-mission').after($('<p class="film-description"></p>').text(reviewContent.filmDescription));
  $('.impact-section .eyebrow').addClass('brand-type');
  $('.artwork-story-image img').attr({src:'/assets/hero.webp',srcset:'/assets/hero-small.webp 700w, /assets/hero.webp 1400w',sizes:'(max-width:760px) 100vw, 50vw',alt:'A handshake connecting military service and civilian opportunity',width:1400,height:933});
  $('.artwork-story .text-link').removeClass('text-link brand-type').addClass('button outline');
  $('.donate-nav').text('Donate');
  $('.button,.text-link').find('svg,span[aria-hidden]').remove();
  $('.film-invitation span[aria-hidden]').remove();
  $('.film-frame').append('<a class="video-play-mark" aria-label="Play film" href="https://youtube.com/watch?v=M6fV7lvx42o" target="_blank" rel="noopener"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4v16l13-8z"/></svg></a>');
  $('.text-link').contents().each((_,node)=>{if(node.type==='text')node.data=node.data.replace(/[→↗]/g,'');});
  $('a').each((_,el)=>{const a=$(el),text=a.text().trim();if(['About','About us'].includes(text))a.text('About Us');if(['FAQ','How it works','Explore the Fellowship','Understand the Fellowship'].includes(text))a.text('Explore Fellowship');if(text==='Donate now'||text==='Donate Now')a.text('Donate');});
  $('.person-open').each((_,el)=>{const button=$(el);button.contents().each((_,node)=>{if(node.type==='text')node.data=node.data.replace('↗','');});});
  $('.route-grid svg,.route-grid span[aria-hidden]').remove();
  $('.support-section,.impact-section,.original-values').addClass('extended-grid').append('<span class="grid-extension grid-extension-top" aria-hidden="true"></span><span class="grid-extension grid-extension-bottom" aria-hidden="true"></span>');
  $('.route-grid strong').each((_,el)=>{const strong=$(el);strong.text(strong.text().replace('Explore the Fellowship','Explore Fellowship').replace('Donate now','Donate').replace(/[↗→]/g,'').trim());});
  if(route==='/')$('.hero-copy h1').html('<span class="sr-only">Your experience matters. Your next step matters.</span><span aria-hidden="true">Your <span class="hero-flap">experience</span><span class="hero-matters">matters.</span></span>');
  // Values stay on a plain background; decorative logo relief was rejected.
  const wardrobe=(name)=>`<div class="wardrobe-morph" data-wardrobe="${name}" aria-hidden="true"><img class="wardrobe-before" src="/assets/morph-${name}-military.webp" alt="" width="960" height="960" loading="lazy"/><img class="wardrobe-after" src="/assets/morph-${name}-civilian.webp" alt="" width="960" height="960" loading="lazy"/></div>`;
  $('.hero-image').attr('data-military-theme','wardrobe').find('>img').attr('loading','lazy').removeAttr('fetchpriority');
  $('.hero-image').prepend(wardrobe('collar'));
  $('.hero-image .wardrobe-before').attr('loading','eager').attr('fetchpriority','high');
  $('.pillar-diagram').each((i,el)=>$(el).addClass('wardrobe-pillar').html(wardrobe(['headwear','collar','footwear'][i])));
  $('body').append('<script type="module" src="/review/wardrobe-motion.js"></script>');
  $('head').append('<link rel="stylesheet" href="/review/release-refinements.css"/>');
  $('body').append('<script type="module" src="/review/release-refinements.js"></script>');
  if(route==='/testimonials'){
   $('.testimonial-grid').wrap('<div class="testimonial-runway"><div class="testimonial-stage"></div></div>');
   $('.testimonial-stage').prepend('<div class="testimonial-scroll-tools"><p aria-hidden="true"></p><div class="testimonial-scroll-actions"><button type="button" data-story-back aria-label="Previous testimonial" disabled>Previous</button><button type="button" data-story-next aria-label="Next testimonial">Next</button></div></div>').append('<div class="testimonial-scroll-meter" aria-hidden="true"><i></i></div><p class="sr-only" aria-live="polite"></p>');
   $('.full-quote').first().addClass('is-scroll-active');
   $('.quote-toggle').remove();

   $('body').attr('data-testimonial-scroll','');
   $('head').append('<link rel="stylesheet" href="/review/testimonial-scroll.css"/>');
   $('body').append('<script type="module" src="/review/testimonial-scroll.js"></script>');
  }

  $('.person-profile h2 small,.person-profile h2 .example-label').remove();
  $('.artwork-story-image img').attr('src','/assets/handshake-editorial.webp').attr('srcset','/assets/handshake-editorial-small.webp 720w, /assets/handshake-editorial.webp 1440w').attr('width','1440').attr('height','960');
  $('.route-grid>a').each((i,el)=>$(el).prepend(`<img class="route-photo" src="/assets/${['morph-collar-civilian.webp','handshake-editorial.webp','morph-fabric-civilian.webp'][i]}" width="960" height="960" alt="" loading="lazy"/>`));
  // Short authentic excerpts live with impact; complete source quotes remain in native dialogs.
  if(route==='/'){
   const stories=load('<div class="impact-stories" id="fellow-stories"><h2>In their own words.</h2><div class="story-cards"></div></div>',null,false);
   testimonials.forEach((story,i)=>{
    const excerpt=story.text.split(/(?<=[.!?])\s/)[0];
    const card=load('<details class="impact-story"><summary><p class="story-excerpt"></p><h3></h3><span class="story-read">Read full story</span></summary><div class="story-remainder"><p></p></div></details>',null,false);
    card('details').attr('style',`--story-index:${i}`);card('.story-excerpt').text(excerpt);card('h3').text(story.name);card('.story-remainder p').text(story.text.slice(excerpt.length).trim());stories('.story-cards').append(card.html());
   });
   $('.impact-section > .container').append(stories.html());
  }
  $('a[href="/testimonials"]').attr('href','/review/v3/index.html#fellow-stories');
  $('footer a').filter((_,el)=>$(el).text().trim()==='Testimonials').remove();
  $('.statement-section,.support-section,.values-section').after('<div class="pixel-pause" aria-hidden="true"></div>');
  $('.pathways article,.donation-card').each((_,el)=>{if($(el).find('a[href]').length)$(el).addClass('linked-tile');});
  $('.footer-brand').addClass('footer-logo brand').attr('aria-label','The Mandatum Foundation home').html(animatedLogo.replaceAll('#003462','#ffffff'));

 }

 $('a[href]').each((_,el)=>{const href=$(el).attr('href');if(!href?.startsWith('/')||href.startsWith('//')||href.startsWith('/review/'))return;const [path,fragment]=href.split('#');if(routes.includes(path))$(el).attr('href',`${prefix}${path==='/'?'/index.html':path+'/index.html'}${fragment?'#'+fragment:''}`);});

 addControls($,version,route);
 await fs.mkdir(target.slice(0,target.lastIndexOf('/')),{recursive:true});await fs.writeFile(target,$.html());
}

function addControls($,version,route){
 $('head').append('<link rel="stylesheet" href="/review/controls.css"/>');
 const panel=load('<details class="review-controls"><summary></summary><div class="review-options"><label>Wersja<select aria-label="Wersja strony"></select></label></div></details>',null,false);
 panel('summary').text(version==='v3'?'Design V2':'V1 · Oryginał');
 const labels={v1:'V1 · Oryginał + poprawki',v3:'Design V2'};
 for(const key of Object.keys(labels)){const option=load('<option></option>',null,false);option('option').text(labels[key]).attr('value',key).attr('data-url',`/review/${key}/${fileFor(route)}`);if(key===version)option('option').attr('selected','');panel('select').eq(0).append(option.html());}
 $('body').append(panel.html()).append('<script type="module" src="/review/controls.js"></script>');
}
// The entry URL displays a real page; there is no preview iframe or toolbar.
await fs.copyFile('dist/review/v1/index.html','dist/review/index.html');
for(const route of routes){const target=`dist/${fileFor(route)}`;const $=load(await fs.readFile(target,'utf8'));addControls($,'v1',route);await fs.writeFile(target,$.html());}
console.log('Review: 21 full pages with compact bottom controls, no iframe.');

await buildDirection();
await buildDirectionB();
