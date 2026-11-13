// Enhancement only: all source quotes remain in HTML and full-text dialogs.
const track=document.querySelector('.testimonial-grid');
if(track){
 const cards=[...track.querySelectorAll('.full-quote')],reduced=matchMedia('(prefers-reduced-motion: reduce)');
 if(cards.length){
  document.body.setAttribute('data-testimonial-scroll','');
  const runway=track.closest('.testimonial-runway');
  const stage=track.closest('.testimonial-stage');
  const tools=stage.querySelector('.testimonial-scroll-tools');
  const status=stage.querySelector('.sr-only');
  track.setAttribute('aria-label','Fellow stories. Scroll down, or use Previous and Next.');
  const previous=tools.querySelector('[data-story-back]'),next=tools.querySelector('[data-story-next]');
  let active=0,stageHeight=650,distance=1,start=0,raf=0,measuring=false;
  const offsets=()=>cards.map(card=>card.offsetLeft-track.offsetLeft-(track.clientWidth-card.offsetWidth)/2);
  const setActive=(index,announce=false)=>{active=Math.max(0,Math.min(cards.length-1,index));cards.forEach((card,i)=>card.classList.toggle('is-scroll-active',i===active));previous.disabled=active===0;next.disabled=active===cards.length-1;if(announce)status.textContent=`Story ${active+1} of ${cards.length}: ${cards[active].querySelector('figcaption')?.textContent.replace(/^—\s*/,'')||''}`;};
  const update=()=>{raf=0;if((reduced.matches||innerWidth<=760))return;const progress=Math.max(0,Math.min(1,(scrollY-start)/distance));const points=offsets(),max=points.at(-1);track.scrollLeft=progress*max;runway.style.setProperty('--story-progress',String(progress));let nearest=0;points.forEach((point,i)=>{if(Math.abs(point-track.scrollLeft)<Math.abs(points[nearest]-track.scrollLeft))nearest=i;});setActive(nearest);};
  const measure=()=>{if(measuring)return;measuring=true;runway.classList.toggle('is-reduced',(reduced.matches||innerWidth<=760));if(!(reduced.matches||innerWidth<=760)){stageHeight=Math.max(390,Math.min(720,innerHeight-60));runway.style.setProperty('--story-stage-height',stageHeight+'px');runway.style.setProperty('--story-quote-height',Math.max(130,stageHeight-220)+'px');distance=Math.max(700,(cards.length-1)*Math.max(520,innerHeight*.85));runway.style.setProperty('--story-runway-height',stageHeight+distance+'px');start=runway.getBoundingClientRect().top+scrollY-(innerWidth<=760?10:16);}else{track.scrollLeft=0;}measuring=false;update();};
  const go=index=>{const target=Math.max(0,Math.min(cards.length-1,index));setActive(target,true);if((reduced.matches||innerWidth<=760)){cards[target].scrollIntoView({block:'center',behavior:'instant'});return;}window.scrollTo({top:start+distance*target/(cards.length-1),behavior:'smooth'});};
  previous.addEventListener('click',()=>go(active-1));next.addEventListener('click',()=>go(active+1));
  track.addEventListener('keydown',event=>{if(event.target.closest('.testimonial-full-story'))return;if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();go(active+(event.key==='ArrowRight'?1:-1));}});
  addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(update);},{passive:true});addEventListener('resize',measure);reduced.addEventListener('change',measure);document.fonts.ready.then(measure);measure();requestAnimationFrame(()=>requestAnimationFrame(()=>runway.classList.add('is-ready')));
 }
}
