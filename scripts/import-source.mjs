import {load} from 'cheerio';
import fs from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import sharp from 'sharp';
const clean=s=>s.replace(/\s+/g,' ').trim();
const home=load(await fs.readFile('source/index.html','utf8'));
const about=load(await fs.readFile('source/about-us.html','utf8'));
const partners=load(await fs.readFile('source/partnerships.html','utf8'));
const write=(name,data)=>fs.writeFile(`src/data/${name}.json`,JSON.stringify(data,null,2)+'\n');
for(const $ of [home,about,partners])$('br').replaceWith('\n\n');
const assets=[];
async function asset(url,name,width=800){if(!url)return null;const svg=url.endsWith('.svg');const dest=`public/assets/${name}.${svg?'svg':'webp'}`;try{await fs.access(dest);assets.push({file:dest,source:url});return dest.replace('public','')}catch{};execFileSync('curl',['-L','--fail','--silent',url,'-o',`/tmp/mandatum-${name}`]);if(svg)await fs.copyFile(`/tmp/mandatum-${name}`,dest);else await sharp(`/tmp/mandatum-${name}`).rotate().resize({width,withoutEnlargement:true}).webp({quality:78}).toFile(dest);assets.push({file:dest,source:url});return dest.replace('public','');}
const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
await asset(home('img').first().attr('src'),'logo');
const heroURL=home('img').toArray().map(e=>home(e).attr('src')).find(s=>s.includes('replacementphoto'));
await asset(heroURL,'hero',1400);
await sharp('public/assets/hero.webp').resize(700).webp({quality:75}).toFile('public/assets/hero-small.webp');
await write('pillars',home('.layout486_content').toArray().slice(0,3).map(e=>({title:clean(home(e).find('h2').text()),text:clean(home(e).find('p').text())})));
await write('faq',home('.faq2_accordion').toArray().map(e=>({category:'Fellowships & immersion',question:clean(home(e).find('.faq2_question').text()),answer:clean(home(e).find('.faq2_answer').text())})));
const people=[];
for(const section of about('.section_team2').toArray())for(const el of about(section).find('.team2_item').toArray()){const $=about;const name=clean($(el).find('.team2_title-wrapper').text());if(!name)continue;const group=clean($(section).find('h2').first().text());people.push({name,role:clean($(el).find('.paragraph-8').text()),group,bio:clean($(el).find('.advisor-modal-paragraph-wrapper').text()),image:await asset($(el).find('img').first().attr('src'),slug(name),600)});}
await write('people-source',people);
const removed=['Sean Kenagy','Lisa Hammitt','Thomas Hendrix'];
const current=people.filter(p=>!removed.includes(p.name));
for(const p of current){if(p.group==='Advisory Board')p.group='Board of Advisors';if(p.name==='Tony Owens')p.role='Member';}
for(const [group,entries] of [['Board of Directors',[['John Maggio','Vice Chair'],['Greg Badessa','Treasurer'],['Matt Byington','Secretary'],['John Gordon','Board Member'],['Gary Landuyt','Board Member and Founder']]],['Board of Advisors',[['Gary Landuyt','Chair'],['James Darby','Member'],['Rob Madore','Member'],['Bob Freese','Member'],['Edward Burch','Member']]]])for(const [name,role]of entries){let p=current.find(p=>p.name===name&&p.group===group);if(p)p.role=role;else current.push({name,role,group,bio:'',image:null});}
await write('people',current);
const ps=[];for(const el of partners('section.section_cta1').toArray()){const $=partners;let title=clean($(el).find('h2').first().text());if(!title||title.includes('Heroes'))continue;ps.push({title,text:clean($(el).find('p').text()),url:$(el).find('a[href^="http"]').first().attr('href')||null,image:await asset($(el).find('img').first().attr('src'),'partner-'+slug(title),500)});}await write('partners',ps);
const quotes=[];home('.section_testimonial1 .advisor-modal-wrapper').each((i,e)=>{const name=clean(home(e).find('h2').text());const text=clean(home(e).find('.advisor-modal-paragraph-wrapper').text());if(name&&text)quotes.push({name,text});});
const anon=home('.testimonial-slide').first();quotes.unshift({name:'Retiring SEAL',text:clean(anon.find('h3').text()).replace(/^[“"]|[”"]$/g,'')});await write('testimonials',quotes);
await write('foundation',{overview:home('.section_layout78').first().find('p').toArray().map(e=>clean(home(e).text()).replace('our Fellows — and their families —','our Fellows')),trident:about('.section_layout78.logo').find('p').toArray().map(e=>clean(about(e).text())),values:home('.section_layout225 h3').toArray().map(e=>({title:clean(home(e).text()),text:clean(home(e).parent().parent().find('p').text())})),events:home('.section_timeline16').text()});
await fs.writeFile('source/assets.json',JSON.stringify(assets,null,2));
console.log('Imported',current.length,'people',ps.length,'partners',quotes.length,'testimonials');
