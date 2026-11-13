import {load} from 'cheerio';
export function refineV3($,route,film){
 $('.conversation,.route-number').remove();
 $('footer .footer-landscape').remove();
 $('body').addClass('page-'+(route==='/'?'home':route.slice(1)));
 $('a').each((_,el)=>{if($(el).text().trim()==='FAQ')$(el).text('How it works');});
 if(route==='/about-us'){
  $('head').append('<link rel="stylesheet" href="/review/about-refinement.css"/>');
  $('.mission-film,.foundation-film').remove();
  $('.values').addClass('value-cards');
  $('.original-values').addClass('values-section');
  $('.value-cards article').each((i,el)=>$(el).attr('style',`--card-index:${i}`).attr('data-value-card',''));
  const archive=$('.events').closest('section');
  archive.find('h2').text('Past events');
  archive.find('details > summary').remove();
  archive.find('.events').unwrap();
  archive.addClass('event-archive');
  // Preserve source group order: CEO, directors, then advisors.
  const leadership=$('main > section').filter((_,el)=>$(el).find('.people').length).slice(0,2);
  const combined=load('<section class="leadership-section"><div class="container"><h2>Our leadership</h2><div class="people"></div></div></section>',null,false);
  leadership.find('.person').each((_,el)=>combined('.people').append($(el).clone()));
  leadership.remove();$('.values-section').after(combined.html());
  $('main').append(film).append(archive);
  $('.person').each((i,el)=>{
   const person=$(el),name=person.find('h3').text(),bio=person.find('details p').html();
   const hasBiography=Boolean(person.find('details p').text().trim());
   person.find('details').remove();
   if(hasBiography){
    const id='person-panel-'+i;
    const button=load('<button class="person-open" type="button">Read more<span class="sr-only"></span></button>',null,false);
    button('button').attr('data-dialog',id);button('.sr-only').text(` about ${name}`);
    person.append(button.html());
    const dialog=load('<dialog class="detail-dialog person-dialog"><button class="sheet-handle" type="button" aria-label="Close biography"><span></span></button><button class="dialog-close" type="button" aria-label="Close biography">×</button><div class="dialog-body"></div></dialog>',null,false);
    dialog('dialog').attr('id',id).attr('aria-label',`About ${name}`);
    // The portrait stays on its card; the sheet is dedicated to the full biography.
    dialog('.dialog-body').append(person.find('h3,.role').clone()).append(`<p>${bio}</p>`);
    if(person.attr('data-social')){
     const social=load('<a class="text-link" target="_blank" rel="noopener">LinkedIn</a>',null,false);
     social('a').attr('href',person.attr('data-social'));dialog('.dialog-body').append(social.html());
    }
    person.after(dialog.html());
   }
   person.find('h3,.role,.person-open').wrapAll('<div class="person-caption"></div>');
   person.addClass('portrait-card').attr('tabindex','0');
   person.find('.person-caption .role,.person-caption .person-open').wrapAll('<div class="person-reveal"></div>');
  });
 }
 if(route==='/testimonials'){
  $('.page-hero').remove();$('main').prepend('<h1 class="sr-only">Testimonials</h1>');
  const quotes=$('.quote');quotes.parent().addClass('testimonial-grid').attr('tabindex','0').attr('aria-label','Fellow stories. Scroll horizontally for more.');
  quotes.each((i,el)=>{const item=$(el);item.addClass('full-quote').attr('data-quote-art',i).attr('tabindex','0');item.prepend('<div class="quote-art" aria-hidden="true"><span></span></div><span class="quote-mark" aria-hidden="true">“</span>');item.find('blockquote').wrap('<div class="quote-content"></div>');if(item.find('blockquote').text().length>550){item.addClass('quote-expandable');item.append('<button type="button" class="quote-toggle" aria-expanded="false">Read full story</button>');}});
 }
 if(route==='/donate'){
  const copy=$('.page-hero .lead').clone();$('.page-hero .eyebrow,.page-hero .lead').remove();$('.page-hero h1').html('Support their next chapter.');
  const grid=$('.donation-grid'),address=$('.address').first().clone();const check=load('<article class="donation-card check-card"><h2>By check</h2><p>Payable to The Mandatum Foundation.</p></article>',null,false);check('article').append(address);grid.append(check.html());
  grid.closest('.section').addClass('giving-options');grid.parent().children('.eyebrow,h2').remove();$('.section-line').remove();grid.closest('.section').after('<section class="section giving-context"><div class="container"></div></section>');$('.giving-context .container').append(copy).append('<p class="small">The Mandatum Foundation is a 501(c)(3) nonprofit public charity. Tax ID: 92-0499620.</p>');
 }
 if(route==='/contact'){
  const hero=$('.page-hero'),heading=hero.find('h1').clone(),lead=hero.find('.lead').clone();hero.remove();const intro=$('.split').first().children('div').first();intro.find('.eyebrow,h2').remove();intro.find('p').first().remove();intro.prepend(lead).prepend(heading);$('.section').first().addClass('contact-section');
 }
 if(route==='/faq'){
  $('.page-hero').remove();$('main').prepend('<h1 class="sr-only">How it works</h1>');
  $('.program-details').closest('.section').remove();$('.faq-nav').remove();$('.faq-layout').before('<div class="container knowledge-search"><label for="knowledge-search">Find an answer</label><input type="search" id="knowledge-search" placeholder="Search coaching, eligibility, donations…"/><p role="status" class="search-status small"></p></div>');
  const groups=$('.faq-group').toArray().sort((a,b)=>{const order=['About the Foundation','Executive coaching','Fellowships & immersion','Partnerships','Donations'];return order.indexOf($(a).find('h2').text())-order.indexOf($(b).find('h2').text());});const tabs=load('<div class="knowledge-categories" role="group" aria-label="Topics"><button type="button" data-topic="all" aria-pressed="true">All topics</button></div>',null,false);const rows=load('<div class="answer-rows"></div>',null,false);
  groups.forEach(el=>{const group=$(el),topic=group.attr('id'),label=group.find('h2').text();const button=load('<button type="button" aria-pressed="false"></button>',null,false);button('button').attr('data-topic',topic).text(label);tabs('div').append(button.html());group.find('details').each((_,el)=>{const detail=$(el),row=load('<article class="question-answer"><div class="question-cell"><span class="topic-label"></span><h2></h2></div><div class="answer-cell"></div></article>',null,false);row('article').attr('data-category',topic);row('.topic-label').text(label);row('h2').text(detail.find('summary').text());row('.answer-cell').append(detail.find('p').clone());rows('.answer-rows').append(row.html());});});
  const durationRow=rows('.question-answer').filter((_,el)=>$(el).find('h2').text()==='How long does the Fellowship last?');if(durationRow.length)rows('.answer-rows').children().eq(1).after(durationRow);
  $('.knowledge-search').html(tabs.html()+'<button class="search-toggle" type="button" aria-label="Search questions" aria-expanded="false" aria-controls="compact-search"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg></button><div class="compact-search" id="compact-search" hidden><label for="knowledge-search" class="sr-only">Find an answer</label><input type="search" id="knowledge-search" placeholder="Search questions…"/></div><p class="search-status sr-only" role="status"></p>');$('.faq-layout').removeClass('faq-layout').addClass('knowledge-results').html(rows.html());
 }
 if(route==='/partnerships'){
  const actions=$('.page-hero .actions').clone();$('.page-hero').remove();
  const showcase=load('<section class="partner-showcase"><div class="partner-selection"><p class="eyebrow">Our partners</p><div class="partner-logo-grid" role="group" aria-label="Choose a partner to stop automatic rotation"></div></div><div class="partner-reading"><div class="partner-invite"><p class="eyebrow">Stronger together</p><h1>Become a partner.</h1><p>Introduce a Fellow to your industry. Share your experience. Help shape what comes next.</p></div><div class="partner-panels"></div></div></section>',null,false);showcase('.partner-invite').append(actions);
  $('.partner-logo-cell').each((i,el)=>{const cell=$(el),id=cell.attr('data-partner'),detail=$('#'+id);const tile=load('<button class="partner-logo-trigger" type="button"><span class="partner-loading" aria-hidden="true"></span></button>',null,false);tile('button').attr('aria-label',cell.attr('aria-label')).attr('data-partner-index',i).attr('aria-controls',id).attr('aria-pressed',String(i===0)).append(cell.find('img').clone());showcase('.partner-logo-grid').append(tile.html());
  const panel=load('<article class="partner-description-panel"><h2></h2><div></div></article>',null,false);panel('article').attr('id',id);if(i)panel('article').attr('hidden','');panel('h2').text(detail.find('summary').text());panel('article>div').append(detail.find('.partner-detail-content').contents().clone());showcase('.partner-panels').append(panel.html());});
  const old=$('.partner-wall').closest('.section');old.replaceWith(showcase.html());
 }
}
