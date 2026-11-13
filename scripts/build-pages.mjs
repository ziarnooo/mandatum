import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {load} from 'cheerio';
// A separate, noindex review artifact; the Cloudflare production build stays unchanged.
const repo=process.env.GITHUB_REPOSITORY || 'ziarnooo/mandatum';
const [owner,name]=repo.split('/');
assert(/^[\w-]+$/.test(owner)&&/^[\w.-]+$/.test(name));
const base=`/${name}`, origin=`https://${owner}.github.io${base}`;
const local=url=>url.startsWith('/')&&!url.startsWith('//')?base+url:url;
await fs.rm('pages-dist',{recursive:true,force:true});
await fs.cp('dist','pages-dist',{recursive:true});
// Publish only the two requested review designs; experiments remain local.
for(const archived of ['direction','direction-b','v2'])await fs.rm(`pages-dist/review/${archived}`,{recursive:true,force:true});
const files=await fs.readdir('pages-dist',{recursive:true});
for(const file of files){
 const full=path.join('pages-dist',file);if(!(await fs.stat(full)).isFile())continue;
 if(!/\.(html|css|js|xml|txt|md|json)$/.test(file))continue;
 let text=await fs.readFile(full,'utf8');
 if(file.endsWith('.html')){
  const $=load(text);
  $('meta[name=robots],link[rel=canonical]').remove();if(file.endsWith('404.html'))$('link[rel=alternate]').remove();$('head').append('<meta name="robots" content="noindex,nofollow"/>');
  $('[href],[src],[action],[data-url],[data-src],[poster]').each((_,el)=>{for(const attr of ['href','src','action','data-url','data-src','poster']){const v=$(el).attr(attr);if(v)$(el).attr(attr,local(v));}});
  $('[srcset],[imagesrcset]').each((_,el)=>{for(const attr of ['srcset','imagesrcset']){const v=$(el).attr(attr);if(v)$(el).attr(attr,v.split(',').map(s=>{const parts=s.trim().split(/\s+/);parts[0]=local(parts[0]);return parts.join(' ')}).join(', '));}});
  text=$.html().replace(/url\((["']?)\/(?!\/)/g,`url($1${base}/`);
 }else if(file.endsWith('.js'))text=text.replace(/(["'`])\/(?!\/)/g,`$1${base}/`);
 else if(file.endsWith('.css'))text=text.replace(/url\((["']?)\/(?!\/)/g,`url($1${base}/`);
 text=text.replaceAll('https://www.themandatum.org',origin);
 await fs.writeFile(full,text);
}
await fs.writeFile('pages-dist/.nojekyll','');
// Verify every root-relative local link and asset after prefixing.
for(const file of files.filter(f=>f.endsWith('.html'))){const $=load(await fs.readFile(path.join('pages-dist',file),'utf8'));for(const el of $('[href],[src],[data-url],[data-src],[poster]').toArray()){for(const attr of ['href','src','data-url','data-src','poster']){const value=$(el).attr(attr);if(!value?.startsWith('/')||value.startsWith('//'))continue;assert(value.startsWith(base+'/'),`Unprefixed ${value}`);const relative=value.slice(base.length).split(/[?#]/)[0];const target=path.join('pages-dist',relative);const exists=await fs.stat(target).catch(()=>null);assert(exists,`${file}: missing ${value}`);}}}
console.log(`Pages review artifact: ${origin}/review/index.html; noindex, form preview only.`);
