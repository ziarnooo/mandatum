import {profileFrame,PROFILE_DURATION} from './profile-motion.js';
// Motion pauses offscreen, in hidden tabs, and on request; reduced motion stays static.
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const sequence=document.querySelector('.profile-sequence');
if(sequence){
 const stories=[...sequence.querySelectorAll('.profile-story')],buttons=[...sequence.querySelectorAll('[data-select-profile]')];
 const labels=['Individualized coaching','Hands-on immersion','Meaningful connections'];
 let elapsed=0,last=0,timer=null,visible=false,paused=reduced.matches,active=0,stage=-1,step=-1;
 const render=(frame,announce=false)=>{
  if(frame.profile!==active){active=frame.profile;stories.forEach((story,i)=>story.hidden=i!==active);buttons.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===active)));stage=-1;step=-1;}
  const story=stories[active];
  buttons.forEach((button,i)=>button.style.setProperty("--progress",String(i<active?1:i>active?0:Math.min(1,(elapsed%PROFILE_DURATION)/PROFILE_DURATION))));
  if(frame.stage!==stage){stage=frame.stage;story.dataset.stage=String(stage);story.querySelectorAll('[data-reveal]').forEach(item=>item.classList.toggle('is-pending',Number(item.dataset.reveal)>stage));}
  if(frame.step!==step){step=frame.step;story.querySelector('.step-label').textContent=stage>=5?'Fellowship alumni':labels[step];story.querySelector('.process-step').classList.toggle('is-complete',stage>=5);}
  story.querySelector('.process-step').classList.toggle('is-complete',stage>=5);
  story.querySelector('.step-label').textContent=stage>=5?'Fellowship alumni':labels[step];
  const role=story.querySelector('.civilian-experience h3');if(!role.dataset.role)role.dataset.role=role.textContent;role.textContent=stage===5?'New role':role.dataset.role;
  if(announce)sequence.querySelector('.profile-announcement').textContent=`Showing ${stories[active].querySelector("h2").textContent}, fictional example profile.`;
 };
 const syncButton=()=>sequence.classList.toggle('is-paused',paused||!visible||document.hidden);
 const stop=()=>{clearTimeout(timer);timer=null;last=0;};
 const tick=()=>{if(paused||!visible||document.hidden||reduced.matches){stop();syncButton();return;}const now=performance.now();if(last)elapsed+=Math.min(now-last,250);last=now;render(profileFrame(elapsed));timer=setTimeout(tick,100);};
 const run=()=>{stop();syncButton();if(!paused&&visible&&!document.hidden&&!reduced.matches)tick();};

 buttons.forEach((button,i)=>button.addEventListener('click',()=>{paused=true;elapsed=i*PROFILE_DURATION+9000;render({profile:i,stage:6,step:2},true);run();}));
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;run();},{threshold:.3});observer.observe(sequence);
 document.addEventListener('visibilitychange',run);
 reduced.addEventListener('change',()=>{paused=reduced.matches;if(paused)render({profile:active,stage:6,step:2});run();});
 render(reduced.matches?{profile:0,stage:6,step:2}:profileFrame(0));syncButton();
}
const film=document.querySelector('.mission-video');
if(film){
 const play=document.querySelector('.film-play');let inView=false,manuallyPaused=false;
 const load=()=>{if(!film.getAttribute('src')){film.src=film.dataset.src;film.load();}film.muted=true;};
 const start=async()=>{load();try{await film.play();play.hidden=true;}catch{play.hidden=false;play.textContent='Play the preview';}};
 play.addEventListener('click',()=>{manuallyPaused=false;film.controls=true;start();});
 film.addEventListener('click',()=>{film.controls=true;});
 film.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();film.controls=true;if(film.paused)start();else film.pause();}});
 film.addEventListener('play',()=>{play.hidden=true;manuallyPaused=false;});
 film.addEventListener('pause',()=>{if(inView&&!document.hidden)manuallyPaused=true;});
 film.addEventListener('error',()=>{play.hidden=false;play.textContent='Try playing again';});
 new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;if(inView&&!reduced.matches&&!document.hidden&&!manuallyPaused){start();}else if(!inView)film.pause();},{threshold:.3}).observe(film);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)film.pause();});
 reduced.addEventListener('change',()=>{if(reduced.matches)film.pause();});
}
const statements=[...document.querySelectorAll('[data-scroll-statement]')];
if(statements.length){
 const groups=statements.map(el=>({el,words:[...el.querySelectorAll('.statement-word')]}));let scheduled=false;
 const update=()=>{scheduled=false;for(const {el,words} of groups){const rect=el.getBoundingClientRect();const progress=reduced.matches?1:Math.max(0,Math.min(1,(innerHeight*.88-rect.top)/(rect.height+innerHeight*.3)));const count=Math.ceil(progress*words.length);words.forEach((word,i)=>word.classList.toggle('is-read',i<count));}};
 const schedule=()=>{if(!scheduled&&!document.hidden){scheduled=true;requestAnimationFrame(update);}};
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);reduced.addEventListener('change',schedule);update();
}

const partnerShowcase=document.querySelector('.partner-showcase');
if(partnerShowcase){
 const buttons=[...partnerShowcase.querySelectorAll('[data-partner-index]')],panels=[...partnerShowcase.querySelectorAll('.partner-description-panel')];
 let current=0,elapsed=0,last=0,timer=null,visible=false,manual=false,hover=false;
 const select=(index)=>{current=index;elapsed=0;buttons.forEach((b,i)=>{b.setAttribute('aria-pressed',String(i===index));b.style.setProperty('--partner-progress','0');panels[i].hidden=i!==index;});};
 const stop=()=>{cancelAnimationFrame(timer);timer=null;last=0;};
 const tick=()=>{if(!visible||document.hidden||reduced.matches||manual||hover){stop();return;}const now=performance.now();if(last)elapsed+=Math.min(now-last,250);last=now;buttons[current].style.setProperty('--partner-progress',String(elapsed/6500));if(elapsed>=6500)select((current+1)%buttons.length);timer=requestAnimationFrame(tick);};
 const run=()=>{stop();tick();};
 buttons.forEach((button,i)=>{button.addEventListener('click',()=>{manual=true;select(i);stop();});button.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'){hover=true;select(i);stop();}});button.addEventListener('focus',()=>{hover=true;select(i);stop();});});
 partnerShowcase.addEventListener('pointerleave',()=>{hover=false;run();});partnerShowcase.addEventListener('focusout',e=>{if(!partnerShowcase.contains(e.relatedTarget)){hover=false;run();}});
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;run();},{threshold:.2}).observe(partnerShowcase);document.addEventListener('visibilitychange',run);reduced.addEventListener('change',run);
}
let dialogTrigger,bodyOverflow='';
const closeSheet=dialog=>{
 if(dialog._closing||!dialog.open)return;dialog._closing=true;
 const finish=()=>{dialog.close();dialog.style.transform='';dialog._closing=false;};
 if(reduced.matches||!dialog.classList.contains('person-dialog')){finish();return;}
 dialog.animate([{transform:dialog.style.transform||'translateY(0)'},{transform:'translateY(100%)'}],{duration:320,easing:'cubic-bezier(.4,0,1,1)'}).finished.then(finish);
};
document.querySelectorAll('[data-dialog]').forEach(button=>button.addEventListener('click',()=>{
 const dialog=document.getElementById(button.dataset.dialog);dialogTrigger=button;bodyOverflow=document.body.style.overflow;document.body.style.overflow='hidden';dialog.style.transform='';dialog.showModal();
 if(!reduced.matches&&dialog.classList.contains('person-dialog'))dialog.animate([{transform:'translateY(100%)'},{transform:'translateY(0)'}],{duration:520,easing:'cubic-bezier(.22,1,.36,1)'});
}));
document.querySelectorAll('dialog').forEach(dialog=>{
 dialog.querySelector('.dialog-close').addEventListener('click',()=>closeSheet(dialog));
 dialog.addEventListener('cancel',e=>{e.preventDefault();closeSheet(dialog);});
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeSheet(dialog);}});
 dialog.addEventListener('close',()=>{document.body.style.overflow=bodyOverflow;dialogTrigger?.focus();});
 const handle=dialog.querySelector('.sheet-handle');if(!handle)return;let start=0,offset=0,time=0,dragging=false,suppressClick=false;
 handle.addEventListener('click',()=>{if(!suppressClick)closeSheet(dialog);suppressClick=false;});
 handle.addEventListener('pointerdown',e=>{if(dialog._closing)return;start=e.clientY;offset=0;time=performance.now();dragging=true;handle.setPointerCapture(e.pointerId);});
 handle.addEventListener('pointermove',e=>{if(!dragging)return;offset=Math.max(0,e.clientY-start);dialog.style.transform=`translateY(${offset}px)`;});
 const release=e=>{if(!dragging)return;dragging=false;suppressClick=offset>5;
  if(e.type!=='pointercancel'&&(offset>100||offset>35&&offset/(performance.now()-time)>.65)){closeSheet(dialog);return;}
  if(!reduced.matches)dialog.animate([{transform:`translateY(${offset}px)`},{transform:'translateY(0)'}],{duration:280,easing:'cubic-bezier(.22,1,.36,1)'});dialog.style.transform='';
 };handle.addEventListener('pointerup',release);handle.addEventListener('pointercancel',release);
});
document.querySelectorAll('.portrait-card').forEach(card=>card.addEventListener('pointerup',event=>{if(event.pointerType!=='mouse'&&!event.target.closest('button,a'))card.classList.toggle('is-revealed');}));
const search=document.querySelector('#knowledge-search');
if(search){let topic='all';const rows=[...document.querySelectorAll('.question-answer')];const update=()=>{const query=search.value.trim().toLowerCase();let count=0;rows.forEach(row=>{row.hidden=!((topic==='all'||row.dataset.category===topic)&&row.textContent.toLowerCase().includes(query));if(!row.hidden)count++;});document.querySelector('.search-status').textContent=count?`${count} ${count===1?'answer':'answers'}`:'No answers found. Try another term or contact our team.';};search.addEventListener('input',update);document.querySelectorAll('[data-topic]').forEach(button=>button.addEventListener('click',()=>{topic=button.dataset.topic;document.querySelectorAll('[data-topic]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));update();}));}

const routes=document.querySelector('.route-grid');
if(routes&&!reduced.matches){routes.classList.add('routes-ready');const reveal=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){routes.classList.add('routes-visible');reveal.disconnect();}},{threshold:.2});reveal.observe(routes);}

// One restrained entrance per section: content remains visible without JavaScript.
const sectionMotion=new Set();
const sectionObserver=new IntersectionObserver(entries=>{
 for(const entry of entries){if(!entry.isIntersecting)continue;sectionObserver.unobserve(entry.target);
  if(reduced.matches)continue;
  const animation=entry.target.animate([{opacity:0,filter:'blur(9px)',transform:'translateY(22px)'},{opacity:1,filter:'blur(0px)',transform:'translateY(0)'}],{duration:680,easing:'cubic-bezier(.22,1,.36,1)'});
  sectionMotion.add(animation);animation.onfinish=()=>sectionMotion.delete(animation);
 }
},{threshold:.08});
document.querySelectorAll('main>section, .review-home>section, .question-answer').forEach(section=>{if(!section.matches('.hero,.route-section'))sectionObserver.observe(section);});
reduced.addEventListener('change',()=>{if(reduced.matches){sectionMotion.forEach(animation=>animation.cancel());sectionMotion.clear();}});

// Pointer light is clipped to the border; button dimensions never change.
document.querySelectorAll('.button,.donate-nav').forEach(button=>{
 button.addEventListener('pointermove',event=>{const box=button.getBoundingClientRect();button.style.setProperty('--pointer-x',`${event.clientX-box.left}px`);button.style.setProperty('--pointer-y',`${event.clientY-box.top}px`);});
});
const searchToggle=document.querySelector('.search-toggle'),searchWrap=document.querySelector('.compact-search');
if(searchToggle&&searchWrap){searchToggle.addEventListener('click',()=>{const open=searchToggle.getAttribute('aria-expanded')!=='true';searchToggle.setAttribute('aria-expanded',String(open));searchWrap.hidden=!open;if(open)search.focus();else{search.value='';search.dispatchEvent(new Event('input'));}});search.addEventListener('keydown',event=>{if(event.key==='Escape'){searchToggle.click();searchToggle.focus();}});}
const footerLogo=document.querySelector('.footer-logo');
if(footerLogo){let running=false;const flourish=()=>{if(reduced.matches||running)return;running=true;const blades=[...footerLogo.querySelectorAll('.logo-sword')];Promise.all(blades.map((blade,i)=>blade.animate([{transform:'translateY(0)'},{transform:'translateY(-7px)',offset:.4},{transform:'translateY(0)'}],{duration:620,delay:i*85,easing:'cubic-bezier(.22,1,.36,1)'}).finished.catch(()=>{}))).then(()=>running=false);};footerLogo.addEventListener('pointerenter',flourish);footerLogo.addEventListener('focus',flourish);new IntersectionObserver((entries,observer)=>{if(entries.some(e=>e.isIntersecting)){flourish();observer.disconnect();}},{threshold:.8}).observe(footerLogo);}
// Values follow the native tab keyboard pattern.
document.querySelectorAll('.value-tabs').forEach(list=>{const tabs=[...list.querySelectorAll('[role=tab]')];const choose=i=>tabs.forEach((tab,n)=>{tab.setAttribute('aria-selected',String(n===i));tab.tabIndex=n===i?0:-1;document.getElementById(tab.getAttribute('aria-controls')).hidden=n!==i;});tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>choose(i));tab.addEventListener('keydown',e=>{let next=i;if(e.key==='ArrowRight')next=(i+1)%tabs.length;else if(e.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=tabs.length-1;else return;e.preventDefault();choose(next);tabs[next].focus();});});});
if(!document.body.hasAttribute('data-testimonial-scroll'))document.querySelectorAll('.quote-toggle').forEach(button=>button.addEventListener('click',()=>{const expanded=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(expanded));button.closest('.quote').classList.toggle('is-expanded',expanded);button.textContent=expanded?'Collapse story':'Read full story';}));
const footer=document.querySelector('footer');if(footer){footer.addEventListener('pointermove',e=>{const r=footer.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;footer.style.setProperty('--footer-x',x+'px');footer.style.setProperty('--footer-y',y+'px');footer.style.setProperty('--footer-glow','1');const mark=footer.querySelector('.footer-logo svg');if(mark&&!reduced.matches)mark.style.transform=`perspective(700px) rotateY(${(x/r.width-.5)*10}deg) rotateX(${(.5-y/r.height)*8}deg)`;});footer.addEventListener('pointerleave',()=>{footer.style.setProperty('--footer-glow','0');const mark=footer.querySelector('.footer-logo svg');if(mark)mark.style.transform='none';});}
// Short, left-to-right cipher resolve; semantic heading remains stable.
const flap=document.querySelector('.hero-flap');
if(flap){
 let index=0,timer,visible=false,started=false,decoding=false,lastSwitch=0;
 const phrases=['experience','next step'],alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#%+/?<>[]';
 const decode=(element,word,duration=1800)=>{
  element._decodeStop?.();decoding=true;lastSwitch=performance.now();
  const previous=element.dataset.word||element.textContent;const count=Math.max(previous.length,word.length);
  const cells=Array.from({length:count},(_,i)=>{const cell=document.createElement('span');cell.className='cipher-cell';cell.dataset.char=word[i]||'';const glyph=document.createElement('span');glyph.className='cipher-glyph';glyph.textContent=previous[i]||'';cell.append(glyph);return cell;});
  element.replaceChildren(...cells);let frame,start,last=-1;
  const finish=()=>{cancelAnimationFrame(frame);cells.forEach((cell,i)=>{cell.firstChild.textContent=word[i]||'';cell.classList.remove('cipher-active');if(!word[i])cell.style.width='0px';});element.dataset.word=word;element.classList.remove('is-decoding');decoding=false;};
  element._decodeStop=finish;if(reduced.matches){finish();element.textContent=word;return;}
  element.classList.add('is-decoding');
  const widths=cells.map((cell,i)=>{const probe=document.createElement('span');probe.textContent=word[i]||previous[i]||' ';probe.style.whiteSpace='pre';element.append(probe);const width=probe.getBoundingClientRect().width;probe.remove();cell.style.width=width+'px';return width;});
  const tick=time=>{start??=time;const progress=(time-start)/duration;if(progress>=1||document.hidden||reduced.matches){finish();return;}const step=Math.floor((time-start)/100);
   if(step!==last){last=step;cells.forEach((cell,i)=>{const settled=progress>.45+.5*i/count;cell.firstChild.textContent=settled?(word[i]||''):alphabet[Math.floor(Math.random()*alphabet.length)];cell.classList.toggle('cipher-active',!settled);if(settled&&!word[i])cell.style.width='0px';});}
   frame=requestAnimationFrame(tick);
  };frame=requestAnimationFrame(tick);
 };
 const run=()=>{clearInterval(timer);if(!visible||document.hidden||reduced.matches)return;
  if(!started){started=true;decode(flap,phrases[index]);}
  timer=setInterval(()=>{if(decoding)return;index=1-index;decode(flap,phrases[index]);},6200);
 };
 flap.addEventListener('pointerenter',event=>{if(event.pointerType!=='mouse'||reduced.matches||decoding||performance.now()-lastSwitch<1800)return;index=1-index;decode(flap,phrases[index],1300);run();});
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;run();}).observe(flap);
 document.addEventListener('visibilitychange',run);
 reduced.addEventListener('change',()=>{document.querySelectorAll('[data-decode],.hero-flap').forEach(el=>el._decodeStop?.());run();});
}

if(!document.body.hasAttribute('data-testimonial-scroll'))document.querySelectorAll('.quote-expandable .quote-content').forEach(content=>{new ResizeObserver(()=>content.style.setProperty('--quote-height',content.scrollHeight+'px')).observe(content.querySelector('blockquote'));});
// Count historical impact totals once when their section enters the viewport.
const impact=document.querySelector('.impact-section');
if(impact){const numbers=[...impact.querySelectorAll('.metric strong')].map(el=>({el,target:Number(el.textContent.replace(/[^0-9]/g,''))}));let frame=0;
 const finish=()=>{cancelAnimationFrame(frame);numbers.forEach(({el,target})=>el.textContent=String(target));};
 const observer=new IntersectionObserver(entries=>{if(!entries.some(e=>e.isIntersecting))return;observer.disconnect();if(reduced.matches)return;const start=performance.now();numbers.forEach(({el})=>{el.setAttribute('aria-label',el.textContent);el.textContent='0';});const tick=now=>{const progress=Math.min(1,(now-start)/1400),eased=1-Math.pow(1-progress,3);numbers.forEach(({el,target})=>el.textContent=String(Math.round(target*eased)));if(progress<1)frame=requestAnimationFrame(tick);else finish();};frame=requestAnimationFrame(tick);},{threshold:.35});observer.observe(impact);reduced.addEventListener('change',()=>{if(reduced.matches)finish();});document.addEventListener('visibilitychange',()=>{if(document.hidden&&frame)finish();});}

// Bring a partially visible story into view, without triggering a hover cascade.
if(!document.body.hasAttribute('data-testimonial-scroll'))document.querySelectorAll('.testimonial-grid').forEach(track=>{
 let lockedUntil=0;
 const center=card=>{
  if(performance.now()<lockedUntil)return;
  const box=card.getBoundingClientRect(),viewport=track.getBoundingClientRect();
  if(box.left>=viewport.left-2&&box.right<=viewport.right+2)return;
  lockedUntil=performance.now()+850;
  track.scrollTo({left:track.scrollLeft+box.left-viewport.left-(viewport.width-box.width)/2,behavior:reduced.matches?'instant':'smooth'});
 };
 track.querySelectorAll('.full-quote').forEach(card=>{card.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')center(card);});card.addEventListener('focusin',()=>center(card));});
});

// A passing decode wave for the three audience labels; their words never change.
document.querySelectorAll('.route-grid>a').forEach(link=>{
 const label=link.querySelector('small');if(!label)return;const text=label.textContent;let frame=0;
 const restore=()=>{cancelAnimationFrame(frame);frame=0;label.textContent=text;label.classList.remove('audience-decoding');};
 const play=()=>{if(reduced.matches||frame)return;const width=label.getBoundingClientRect().width;label.style.minWidth=width+'px';label.classList.add('audience-decoding');
  const glyphs='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',duration=720;let start,last=-1;
  const tick=time=>{start??=time;const progress=(time-start)/duration;if(progress>=1||document.hidden||reduced.matches){restore();return;}
   const step=Math.floor((time-start)/40);if(step!==last){last=step;const head=progress*(text.length+5);label.textContent=[...text].map((char,i)=>char===' '||i>head||i<head-4?char:glyphs[Math.floor(Math.random()*glyphs.length)]).join('');}
   frame=requestAnimationFrame(tick);
  };frame=requestAnimationFrame(tick);
 };
 link.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')play();});link.addEventListener('focus',play);reduced.addEventListener('change',()=>{if(reduced.matches)restore();});
});
