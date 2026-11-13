const menu = document.querySelector('.navigation');
if (menu && !document.body.classList.contains('variant-v3')) {
 const trigger = menu.querySelector('summary');
 const close = (restore = false) => { menu.open = false; if (restore) trigger.focus(); };
 document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.open) { event.preventDefault(); close(true); } });
 document.addEventListener('pointerdown', event => { if (menu.open && !menu.contains(event.target)) close(); });
 document.addEventListener('focusin', event => { if (menu.open && !menu.contains(event.target)) close(); });
 menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => close()));
}
