// Shared square-cell camouflage dissolve. Canvas uses CSS pixels, never stretched cells.
export const clamp=n=>Math.max(0,Math.min(1,n));
const hash=(x,y)=>{const n=Math.sin(x*127.1+y*311.7)*43758.5453;return n-Math.floor(n);};
export function camo(x,y){return .52*hash(Math.floor(x/4),Math.floor(y/3))+.3*hash(Math.floor(x/2),Math.floor(y/2))+.18*hash(x,y);}
const smooth=n=>{const p=clamp(n);return p*p*(3-2*p);};
// Same spatial field drives both the image mask and the surrounding camouflage.
export function plasma(x,y,pointer,time,radius=190){
 const t=time/1700,dx=x-pointer.x,dy=y-pointer.y;
 const warpX=12*Math.sin(t+dy/47)+7*Math.cos(t*.7+dx/31),warpY=10*Math.cos(t*.8+dx/53);
 const distance=Math.hypot(dx+warpX,dy+warpY)/radius;
 const n=camo(Math.floor(x/8),Math.floor(y/8));
 const hole=.5+.5*Math.sin(t*1.1+n*25+Math.floor(x/24)*1.7+Math.floor(y/24));
 return smooth((smooth(1-distance)-n*.38)/.38)*(hole<.28?.06:.45+hole*.55);
}
export function createReveal(surface,img,{zoom=1,position=.5,size=8}={}){
 const canvas=document.createElement('canvas');canvas.className='photo-reveal';canvas.setAttribute('aria-hidden','true');surface.append(canvas);const ctx=canvas.getContext('2d'),mask=document.createElement('canvas'),m=mask.getContext('2d');let w=0,h=0,cells=[];
 const resize=()=>{const r=surface.getBoundingClientRect();w=Math.round(r.width);h=Math.round(r.height);canvas.width=mask.width=w;canvas.height=mask.height=h;cells=[];for(let y=0;y<h;y+=size)for(let x=0;x<w;x+=size)cells.push({x,y,n:camo(x/size,y/size)});};resize();
 const draw=(p,pointer=null,strength=0,time=performance.now(),pulse=0)=>{ctx.clearRect(0,0,w,h);if(!img.complete||!img.naturalWidth||!w||!h)return;const ratio=Math.max(w/img.naturalWidth,h/img.naturalHeight)*zoom,iw=img.naturalWidth*ratio,ih=img.naturalHeight*ratio;
 ctx.globalCompositeOperation='source-over';ctx.drawImage(img,(w-iw)/2,(h-ih)*position,iw,ih);
 if(p<.999){const rect=surface.getBoundingClientRect();m.clearRect(0,0,w,h);m.fillStyle='#fff';for(const {x,y,n}of cells){const local=p;const alpha=pointer&&strength?Math.max(smooth((p-n*.76)/.24),plasma(x+rect.left,y+rect.top,{x:pointer.x+rect.left,y:pointer.y+rect.top},time,190+pulse*35)*strength):smooth((local-n*.76)/.24);if(alpha<=0)continue;m.globalAlpha=alpha;m.fillRect(x,y,size,size);}ctx.globalCompositeOperation='destination-in';ctx.drawImage(mask,0,0);ctx.globalCompositeOperation='source-over';}
 };
 return {canvas,draw,resize};
}
