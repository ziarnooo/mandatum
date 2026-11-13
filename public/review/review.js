const versions={
 v1:{title:'V1 · Aktualna strona',description:'Oryginalny design Webflow przeniesiony do Astro, ze zmianami z maila Elizabeth.',url:'/review/v1/index.html'},
 v2:{title:'V2 · Poprawiony przekaz i flow',description:'Ten sam oryginalny design. Wnioski z SEAL Future Foundation i SOTF: jasna oferta, trzy ścieżki odbiorców, krótszy homepage. Oryginalny granat i logo.',url:'/review/v2/index.html'},
 v3:{title:'V3 · Redesign',description:'Nowe flow + nowy design. Czekamy na referencję od Dominika.',url:null,pending:'V3 powstanie po otrzymaniu Twojej referencji designu.'}
};
const frame=document.querySelector('iframe'),pending=document.querySelector('#pending'),openLink=document.querySelector('#open');
function update(){const key=document.querySelector('[name=version]:checked').value,v={...versions[key],url:key==='v3'?null:`/review/${key}/${document.querySelector('#page').value}index.html`};document.querySelector('#title').textContent=v.title;document.querySelector('#description').textContent=v.description;frame.hidden=!v.url;pending.hidden=!!v.url;openLink.hidden=!v.url;pending.textContent=v.pending||'';if(v.url){if(frame.getAttribute('src')!==v.url)frame.src=v.url;openLink.href=v.url}else frame.removeAttribute('src');frame.classList.toggle('mobile',document.querySelector('[name=size]:checked').value==='mobile');}
document.querySelectorAll('input,select').forEach(input=>input.addEventListener('change',update));update();
