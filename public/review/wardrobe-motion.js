import {createReveal,clamp} from './pixel-reveal.js';
const reduce=matchMedia('(prefers-reduced-motion: reduce)'),hover=matchMedia('(hover:hover) and (pointer:fine)');
const states=[...document.querySelectorAll('.wardrobe-morph')].map(el=>{const hero=!!el.closest('.hero-image');return {el,hero,active:false,over:false,pointer:null,strength:0,pulse:0,current:0,reveal:createReveal(el,el.querySelector('.wardrobe-after'),{zoom:hero?1:1.12,position:hero?.5:.45,mode:hero?'pixels':'soft'})};});
let raf=0,last=0;function schedule(){if(!raf&&!document.hidden)raf=requestAnimationFrame(tick);}
function tick(now){raf=0;const dt=last?Math.min(50,now-last):16;last=now;let moving=false;
 for(const s of states){if(!s.active)continue;const r=s.el.getBoundingClientRect(),start=Math.max(0,scrollY+r.top-innerHeight*.5);const scroll=s.hero?clamp((scrollY-start)/90):clamp((innerHeight*.62-r.top)/Math.min(220,r.height*.65));const target=reduce.matches?0:s.hero?scroll:hover.matches?Number(s.over):scroll;
 const ease=1-Math.exp(-dt/(s.hero?150:550));s.current+=(target-s.current)*ease;s.strength+=(Number(s.over)-s.strength)*(1-Math.exp(-dt/240));if(Math.abs(target-s.current)<.002)s.current=target;else moving=true;if(Math.abs(Number(s.over)-s.strength)<.002)s.strength=Number(s.over);else moving=true;
 s.pulse*=Math.exp(-dt/260);s.reveal.draw(s.current,null,0,now,s.pulse);
 }if(moving)schedule();else last=0;
}
const observer=new IntersectionObserver(entries=>{for(const e of entries){const s=states.find(s=>s.el===e.target);s.active=e.isIntersecting;}schedule();},{rootMargin:'80px'});
for(const s of states){observer.observe(s.el);const surface=s.el.closest('.hero-image,.pillar-diagram')||s.el;surface.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse'||reduce.matches)return;const r=s.el.getBoundingClientRect();s.pointer={x:e.clientX-r.left,y:e.clientY-r.top};s.over=true;schedule();});surface.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'&&!reduce.matches){s.over=true;schedule();}});surface.addEventListener('pointerdown',()=>{if(s.hero&&!reduce.matches){s.pulse=1;schedule();}});surface.addEventListener('pointerleave',()=>{s.over=false;schedule();});s.el.querySelector('.wardrobe-after').addEventListener('load',schedule);}
addEventListener('scroll',schedule,{passive:true});addEventListener('resize',()=>{states.forEach(s=>s.reveal.resize());schedule();},{passive:true});document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;}else schedule();});reduce.addEventListener('change',schedule);
