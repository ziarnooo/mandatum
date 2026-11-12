// Optional Cloudflare hosting adapter. Static Astro output remains portable.
const routes=new Set(['/','/about-us','/partnerships','/testimonials','/contact','/faq','/donate']);
export function prefersMarkdown(accept=''){
 const types=accept.toLowerCase().split(',').map(item=>{const [type,...params]=item.trim().split(';');const q=params.map(p=>p.trim()).find(p=>p.startsWith('q='));return {type,q:q?Number(q.slice(2)):1}});
 const md=Math.max(0,...types.filter(t=>t.type==='text/markdown').map(t=>t.q));
 const html=Math.max(0,...types.filter(t=>t.type==='text/html').map(t=>t.q));
 return md>0&&md>=html;
}
export default {async fetch(request,env){
 const url=new URL(request.url);
 if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405,headers:{Allow:'GET, HEAD'}});
 const path=url.pathname.replace(/\/$/,'')||'/';
 const md=routes.has(path)&&prefersMarkdown(request.headers.get('Accept')||'');
 let assetRequest=request;
 if(md){url.pathname=path==='/'?'/index.md':path+'.md';assetRequest=new Request(url,request);}
 const asset=await env.ASSETS.fetch(assetRequest);
 const headers=new Headers(asset.headers);
 headers.set('X-Content-Type-Options','nosniff');
 headers.set('Referrer-Policy','strict-origin-when-cross-origin');
 headers.set('X-Frame-Options','DENY');
 headers.set('Permissions-Policy','camera=(), microphone=(), geolocation=()');
 headers.set('Content-Security-Policy',"default-src 'self'; script-src 'none'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'");
 if(env.PREVIEW==='true')headers.set('X-Robots-Tag','noindex, nofollow');
 if(routes.has(path)){
  headers.set('Vary','Accept');
  const markdown=path==='/'?'/index.md':path+'.md';
  headers.set('Link',`</llms.txt>; rel="describedby"; type="text/plain", </sitemap.xml>; rel="sitemap"; type="application/xml", <${markdown}>; rel="alternate"; type="text/markdown"`);
  // HTML and Markdown share the path, so prevent intermediary variant confusion.
  headers.set('Cache-Control','public, max-age=0, must-revalidate');
 }
 if(md&&asset.ok)headers.set('Content-Type','text/markdown; charset=utf-8');
 return new Response(request.method==='HEAD'?null:asset.body,{status:asset.status,headers});
}};
