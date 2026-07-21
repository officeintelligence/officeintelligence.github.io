window.lucide?.createIcons();

const hero = document.querySelector('.hero');
if (hero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  hero.addEventListener('pointermove', (event) => {
    const bounds = hero.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - .5) * 12;
    const y = ((event.clientY - bounds.top) / bounds.height - .5) * 9;
    hero.style.setProperty('--shift-x', `${x}px`);
    hero.style.setProperty('--shift-y', `${y}px`);
  }, { passive: true });
  hero.addEventListener('pointerleave', () => {
    hero.style.setProperty('--shift-x', '0px');
    hero.style.setProperty('--shift-y', '0px');
  });
}
