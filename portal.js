window.lucide?.createIcons();

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const signals = [...document.querySelectorAll('.signal[data-route]')].map((node) => {
  const path = document.querySelector(`#${node.dataset.route}`);
  return {
    node,
    path,
    length: path?.getTotalLength() || 0,
    duration: Number(node.dataset.duration),
    offset: Number(node.dataset.offset),
  };
}).filter((signal) => signal.path && signal.length);

if (!reducedMotion && signals.length) {
  const positionSignals = (elapsed) => {
    signals.forEach((signal) => {
      const progress = ((elapsed + signal.offset) % signal.duration) / signal.duration;
      const point = signal.path.getPointAtLength(progress * signal.length);
      signal.node.setAttribute('cx', point.x.toFixed(2));
      signal.node.setAttribute('cy', point.y.toFixed(2));
    });
  };
  const startedAt = performance.now();
  positionSignals(0);
  const animateSignals = (time) => {
    positionSignals(time - startedAt);
    window.requestAnimationFrame(animateSignals);
  };
  window.requestAnimationFrame(animateSignals);
}

const hero = document.querySelector('.hero');
if (hero && !reducedMotion) {
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
