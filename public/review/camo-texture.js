// Textile resolves into a blue circuit field; all geometry is decorative, not data.
export function createTextileLayers(width,height){
 const scale=Math.min(1,480/width),w=Math.ceil(width*scale),h=Math.ceil(height*scale);
 const cloth=document.createElement('canvas'),blue=document.createElement('canvas'),blend=document.createElement('canvas');
 for(const canvas of [cloth,blue,blend]){canvas.width=w;canvas.height=h;}
 const c=cloth.getContext('2d'),b=blue.getContext('2d'),ctx=blend.getContext('2d');
 const pixels=c.createImageData(w,h),bluePixels=b.createImageData(w,h);
 const hash=(x,y)=>{let n=Math.imul(x,374761393)+Math.imul(y,668265263);n=Math.imul(n^(n>>>13),1274126177);return((n^(n>>>16))>>>0)/4294967295;};
 const noise=(x,y)=>{const a=Math.floor(x),b=Math.floor(y),u=x-a,v=y-b,s=u*u*(3-2*u),q=v*v*(3-2*v);return(1-q)*((1-s)*hash(a,b)+s*hash(a+1,b))+q*((1-s)*hash(a,b+1)+s*hash(a+1,b+1));};
 const green=[[51,60,52],[79,88,69],[112,117,94],[153,150,121],[184,175,145]];
 const navy=[[19,42,59],[29,61,83],[48,81,105],[73,105,127],[104,134,153]];
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){
  const X=x/scale,Y=y/scale,warp=noise(X/64,Y/64)*20;
  const n=noise((X+warp)/39,(Y-warp)/28)*.57+noise(X/14+31,Y/11+17)*.3+noise(X/5,Y/5)*.13;
  const band=n<.34?0:n<.45?1:n<.55?2:n<.64?3:4;
  const grain=(hash(x+718,y)-.5)*7,weave=(x%3===0?-3:1)+(y%3===0?2:-1);
  const fold=1+.045*Math.sin(X/105+Y/210)-.04*Math.cos(Y/160)+.035*(1-x/w);
  const i=(y*w+x)*4;
  for(let k=0;k<3;k++){pixels.data[i+k]=green[band][k]*fold+grain+weave;bluePixels.data[i+k]=navy[band][k]*fold+grain+weave;}
  pixels.data[i+3]=bluePixels.data[i+3]=255;
 }
 c.putImageData(pixels,0,0);b.putImageData(bluePixels,0,0);
 const clamp=v=>Math.max(0,Math.min(1,v)),smooth=v=>{const t=clamp(v);return t*t*(3-2*t);};
 const line=(points,progress,color,thickness=1)=>{
  const lengths=points.slice(1).map((point,i)=>Math.hypot(point[0]-points[i][0],point[1]-points[i][1]));
  let remaining=lengths.reduce((a,v)=>a+v,0)*clamp(progress);
  if(remaining<=0)return;ctx.beginPath();ctx.moveTo(...points[0]);
  for(let i=0;i<lengths.length;i++){const t=Math.min(1,remaining/lengths[i]);ctx.lineTo(points[i][0]+(points[i+1][0]-points[i][0])*t,points[i][1]+(points[i+1][1]-points[i][1])*t);remaining-=lengths[i];if(remaining<=0)break;}
  ctx.strokeStyle=color;ctx.lineWidth=thickness*scale;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke();
 };
 const morph=p=>{
  if(p<=0)return cloth;
  ctx.globalAlpha=1;ctx.drawImage(cloth,0,0);ctx.globalAlpha=smooth(p/.3);ctx.drawImage(blue,0,0);ctx.globalAlpha=1;
  // Blue patches lose all contrast and merge into a clean technical surface.
  const merge=smooth((p-.32)/.4),chart=smooth((p-.68)/.32);
  const surface=ctx.createLinearGradient(0,0,w,h);
  surface.addColorStop(0,'#124f83');surface.addColorStop(.55,'#063964');surface.addColorStop(1,'#041e3a');
  ctx.globalAlpha=merge;ctx.fillStyle=surface;ctx.fillRect(0,0,w,h);ctx.globalAlpha=1;
  // Staggered fragments settle into a structured circuit lattice.
  const settle=smooth((p-.22)/.52),ink=smooth((p-.48)/.52);
  const columns=9,rows=Math.max(9,Math.round(h/w*columns));
  const dx=w/(columns+1),dy=h/(rows+1);
  for(let row=0;row<rows;row++)for(let col=0;col<columns;col++){
   const delay=hash(col+41,row+23)*.2;
   const local=smooth((settle-delay)/(1-delay));
   const tx=(col+1)*dx,ty=(row+1)*dy;
   const x=tx+(hash(col+11,row)-.5)*dx*2*(1-local);
   const y=ty+(hash(col,row+19)-.5)*dy*2*(1-local);
   const size=(2+hash(col,row)*8*(1-local))*scale;
   ctx.globalAlpha=smooth(p/.35)*(.25+.6*local);
   ctx.fillStyle=local>.8?'#8bdaff':'#779eb5';
   ctx.fillRect(x-size/2,y-size/2,size,size);
   ctx.globalAlpha=1;
   if(col<columns-1&&hash(col+5,row)>.36){
    const bend=dy*(hash(col,row+5)>.5?.26:-.26);
    line([[tx,ty],[tx+dx*.3,ty],[tx+dx*.55,ty+bend],[tx+dx,ty+bend]],smooth((ink-delay)/(1-delay)),'#66c5f08a',1);
   }
   if(row<rows-1&&hash(col+8,row)>.64)
    line([[tx,ty],[tx,ty+dy*.5],[tx+dx*.22,ty+dy*.72],[tx+dx*.22,ty+dy]],smooth((ink-delay)/(1-delay)),'#4286c570',1);
   if(hash(col+77,row)>.84&&ink>delay){
    ctx.globalAlpha=smooth((ink-delay)/(1-delay));
    ctx.strokeStyle='#b3eaff';ctx.lineWidth=scale;
    ctx.strokeRect(tx-4*scale,ty-4*scale,8*scale,8*scale);ctx.globalAlpha=1;
   }
  }
  // A broad luminous current crosses the network only during the transformation.
  const pulse=Math.sin(Math.PI*chart);
  if(pulse>0){
   const glow=ctx.createRadialGradient(w*(.15+.7*chart),h*.38,0,w*(.15+.7*chart),h*.38,w*.65);
   glow.addColorStop(0,`rgba(38,155,245,${pulse*.22})`);glow.addColorStop(1,'rgba(38,155,245,0)');
   ctx.fillStyle=glow;ctx.fillRect(0,0,w,h);
  }
  return blend;
 };
 return{cloth,blue,morph};
}
