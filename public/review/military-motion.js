import {createTextileLayers} from './camo-texture.js';
const select=document.querySelector('#military-theme'),hero=document.querySelector('.hero-image'),canvas=document.querySelector('.military-motion');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');let theme='camo';try{theme=sessionStorage.getItem('mandatum-motif-v3')||theme;}catch{}
if(select){select.value=theme;select.addEventListener('change',()=>{theme=select.value;try{sessionStorage.setItem('mandatum-motif-v3',theme);}catch{}if(!hero){location.href=document.querySelector('.brand').href;return;}apply();});}
let frame=0,visible=false,last=0,w=0,h=0,start=performance.now(),px=.5,py=.5;
const ctx=canvas?.getContext('2d');let textile=null,morphProgress=0,morphMoving=false;
function draw(now){if(!ctx)return;ctx.clearRect(0,0,w,h);ctx.fillStyle='#dce5ed';ctx.fillRect(0,0,w,h);const t=reduced.matches?0:(now-start)/1000;
 if(theme==='camo'&&textile){
  const rect=hero.getBoundingClientRect(),begin=Math.max(0,scrollY+rect.top-innerHeight*.5),target=reduced.matches?0:Math.max(0,Math.min(1,(scrollY-begin)/Math.min(180,h*.28)));
  morphProgress=reduced.matches?0:morphProgress+(target-morphProgress)*.075;morphMoving=Math.abs(target-morphProgress)>.002;if(!morphMoving)morphProgress=target;
  ctx.drawImage(textile.morph(morphProgress),0,0,w,h);
 }

 if(theme==='contours'){ctx.lineWidth=1;for(let i=0;i<20;i++){ctx.strokeStyle=i%4===0?'#365b7790':'#62819850';ctx.beginPath();for(let x=-10;x<=w+10;x+=8){const y=h*.15+i*25+Math.sin(x/w*5+i*.2+t*.15)*45+Math.sin(x/w*11+t*.1)*14+(py-.5)*i; x===-10?ctx.moveTo(x,y):ctx.lineTo(x,y);}ctx.stroke();}}
 if(theme==='routes'){ctx.strokeStyle='#6a8ba540';ctx.lineWidth=1;for(let x=0;x<w;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();}for(let y=0;y<h;y+=40){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}for(let i=0;i<5;i++){const sy=h*(i+1)/6,ex=w*.8,ey=h*.48;ctx.strokeStyle='#214f7180';ctx.beginPath();ctx.moveTo(w*.12,sy);ctx.bezierCurveTo(w*.45,sy,w*.45,ey,ex,ey);ctx.stroke();const p=(t*.12+i*.2)%1,u=1-p;const x=u*u*u*w*.12+3*u*u*p*w*.45+3*u*p*p*w*.45+p*p*p*ex,y=u*u*u*sy+3*u*u*p*sy+3*u*p*p*ey+p*p*p*ey;ctx.fillStyle='#003462';ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();}ctx.strokeStyle='#003462';ctx.strokeRect(w*.8-10,h*.48-10,20,20);}
}
function tick(now){if(!visible||document.hidden||['painting','wardrobe'].includes(theme)||reduced.matches){frame=0;return;}if(now-last>30){draw(now);last=now;}if(theme==='camo'&&!morphMoving){frame=0;return;}frame=requestAnimationFrame(tick);}
function apply(){if(!hero)return;hero.dataset.militaryTheme=theme;cancelAnimationFrame(frame);frame=0;draw(performance.now());if(visible&&!document.hidden&&!reduced.matches&&!['painting','wardrobe'].includes(theme))frame=requestAnimationFrame(tick);}
if(ctx){new ResizeObserver(()=>{const box=hero.getBoundingClientRect();w=box.width;h=box.height;const dpr=Math.min(devicePixelRatio,1.5);canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);textile=createTextileLayers(w,h);draw(performance.now());}).observe(hero);new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;apply();}).observe(hero);hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();px=(e.clientX-r.left)/r.width;py=(e.clientY-r.top)/r.height;});document.addEventListener('visibilitychange',apply);reduced.addEventListener('change',apply);apply();}

addEventListener('scroll',()=>{if(theme==='camo'&&visible&&!document.hidden&&!frame)frame=requestAnimationFrame(tick);},{passive:true});
