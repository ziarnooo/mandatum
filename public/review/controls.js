const controls = document.querySelector('.review-controls');
controls?.querySelectorAll('select').forEach(select => select.addEventListener('change', () => {
 const destination = select.selectedOptions[0]?.dataset.url;
 if (destination) window.location.assign(destination);
}));
controls?.addEventListener('keydown', event => {
 if (event.key === 'Escape') { controls.open = false; controls.querySelector('summary').focus(); }
});
document.addEventListener('pointerdown', event => {
 if (controls?.open && !controls.contains(event.target)) controls.open = false;
});
