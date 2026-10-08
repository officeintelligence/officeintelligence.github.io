// A conceptual visual relationship, not a simulation, model call, or training run.
(() => {
  const map = document.querySelector('[data-use-map]');
  if (!map) return;
  const keys = ['environments', 'evaluation', 'training', 'harness'];
  const sources = {
    environments: [681, 335],
    evaluation: [1421, 685],
    training: [1016, 504],
    harness: [681, 335],
  };
  const board = map.querySelector('.organization-layout');
  const image = map.querySelector('.office');
  const rail = map.querySelector('.applications-choices');
  const cards = [...map.querySelectorAll('[data-use-choice]')];
  const buttons = [...map.querySelectorAll('[data-select-use]')];
  const toggle = map.querySelector('.linkage-toggle');
  const automatic = map.querySelector('.linkage-auto');
  const connector = map.querySelector('.use-connector');
  const track = connector.querySelector('.connector-track');
  const highlight = connector.querySelector('.connector-highlight');
  const packet = connector.querySelector('.connector-packet');
  const payload = map.querySelector('.flow-payload');
  const origin = map.querySelector('.flow-origin');
  const underlay = connector.querySelector('.connector-underlay');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const narrow = matchMedia('(max-width: 850px)');
  const chinese = document.documentElement.lang.startsWith('zh');
  const saveData = navigator.connection?.saveData === true;
  const cycleDuration = 6000;
  const flowDuration = 3200;
  const state = {
    active: 'environments',
    automatic: 'environments',
    pinned: null,
    hover: null,
    focus: null,
    wantsMotion: !reduced.matches && !saveData,
    visible: false,
    pageHidden: false,
    elapsed: 0,
    travel: 0,
    last: 0,
    raf: 0,
    length: 0,
    autoChanges: 0,
  };
  const running = () => state.wantsMotion && state.visible && !state.pageHidden && !document.hidden;
  const locked = () => state.focus || state.hover || state.pinned;

  function drawPacket() {
    if (!state.length || narrow.matches) return;
    // Harness is a two-way tool/state link; the other visual packets flow outward.
    const phase = (state.travel % flowDuration) / flowDuration;
    const progress = state.active === 'harness' ? (phase < 0.5 ? phase * 2 : 2 - phase * 2) : phase;
    const point = track.getPointAtLength(state.length * progress);
    packet.setAttribute('transform', `translate(${point.x.toFixed(2)} ${point.y.toFixed(2)})`);
  }
  function measure() {
    if (narrow.matches || !image.complete || !image.naturalWidth) return;
    const b = board.getBoundingClientRect();
    const i = image.getBoundingClientRect();
    const card = cards.find((el) => el.dataset.useChoice === state.active).getBoundingClientRect();
    const button = buttons
      .find((el) => el.dataset.selectUse === state.active)
      .getBoundingClientRect();
    const [sx, sy] = sources[state.active];
    const x = i.left - b.left + (sx / 2093) * i.width;
    const y = i.top - b.top + (sy / 1308) * i.height;
    const ex = card.left - b.left - 10;
    const ey = button.top - b.top + button.height / 2;
    const p = payload.getBoundingClientRect();
    const mx = p.left - b.left + p.width * 0.5;
    const bottom = p.bottom - b.top;
    const right = p.right - b.left;
    const middle = p.top - b.top + p.height * 0.5;
    const d = `M${x} ${y} C${x + 55} ${y - 55},${mx} ${bottom + 42},${mx} ${bottom} L${mx} ${middle} L${right} ${middle} C${ex - 30} ${middle},${ex - 45} ${ey},${ex} ${ey}`;
    // The named extracted object covers the middle of the route; the packet enters and exits it.
    origin.style.left = `${Math.max(0, Math.min(i.width - origin.offsetWidth, x - 18))}px`;
    origin.style.top = `${Math.max(0, y - 41)}px`;
    connector.setAttribute('viewBox', `0 0 ${b.width} ${b.height}`);
    track.setAttribute('d', d);
    highlight.setAttribute('d', d);
    underlay.setAttribute('d', d);
    const start = connector.querySelector('.connector-start'),
      end = connector.querySelector('.connector-end');
    start.setAttribute('cx', String(x));
    start.setAttribute('cy', String(y));
    end.setAttribute('cx', String(ex));
    end.setAttribute('cy', String(ey));
    state.length = track.getTotalLength();
    drawPacket();
  }
  function select(key) {
    if (!keys.includes(key)) return;
    const changed = key !== state.active;
    state.active = key;
    map.dataset.activeUse = key;
    map.querySelectorAll('[data-flow-object]').forEach((el) => {
      el.hidden = el.dataset.flowObject !== key;
    });
    map.querySelectorAll('[data-flow-origin]').forEach((el) => {
      el.hidden = el.dataset.flowOrigin !== key;
    });
    map.querySelectorAll('[data-scene-use]').forEach((layer) => {
      layer.classList.toggle('is-active', layer.dataset.sceneUse === key);
    });
    cards.forEach((card) => card.classList.toggle('is-active', card.dataset.useChoice === key));
    buttons.forEach((button) =>
      button.setAttribute('aria-pressed', String(button.dataset.selectUse === key)),
    );
    map.querySelectorAll('[data-use-explanation]').forEach((el) => {
      el.hidden = el.dataset.useExplanation !== key;
    });
    if (changed) {
      state.elapsed = 0;
      state.travel = 0;
    }
    measure();
  }
  function tick(now) {
    state.raf = 0;
    if (!running()) {
      state.last = 0;
      return;
    }
    const delta = state.last ? Math.min(now - state.last, 80) : 0;
    state.last = now;
    state.travel += delta;
    if (!locked()) {
      state.elapsed += delta;
      if (state.elapsed >= cycleDuration) {
        state.automatic = keys[(keys.indexOf(state.active) + 1) % keys.length];
        select(state.automatic);
        state.autoChanges++;
        map.dataset.autoChanges = String(state.autoChanges);
      }
    }
    drawPacket();
    state.raf = requestAnimationFrame(tick);
  }
  function sync() {
    const active = running();
    map.dataset.effects = active ? 'running' : 'paused';
    map.dataset.selectionMode = state.pinned
      ? 'pinned'
      : state.focus || state.hover
        ? 'preview'
        : 'auto';
    map.dataset.motionReduced = String(reduced.matches);
    toggle.textContent = chinese
      ? state.wantsMotion
        ? '暂停联动'
        : '播放联动'
      : state.wantsMotion
        ? 'Pause effects'
        : 'Play effects';
    toggle.setAttribute(
      'aria-label',
      chinese
        ? state.wantsMotion
          ? '暂停办公室与应用的联动动画'
          : '播放办公室与应用的联动动画'
        : state.wantsMotion
          ? 'Pause office and application animation'
          : 'Play office and application animation',
    );
    automatic.hidden = !state.pinned;
    if (!active && state.raf) {
      cancelAnimationFrame(state.raf);
      state.raf = 0;
      state.last = 0;
    }
    if (active && !state.raf) {
      state.last = 0;
      state.raf = requestAnimationFrame(tick);
    }
  }
  function chooseEffective() {
    select(state.focus || state.hover || state.pinned || state.automatic);
    sync();
  }
  function pin(key) {
    state.pinned = key;
    state.automatic = key;
    state.elapsed = 0;
    select(key);
    sync();
  }
  for (const card of cards) {
    const key = card.dataset.useChoice;
    const button = card.querySelector('[data-select-use]');
    button.disabled = false;
    card.addEventListener('pointerenter', (event) => {
      if (event.pointerType !== 'mouse') return;
      state.hover = key;
      if (!state.focus) select(key);
      sync();
    });
    card.addEventListener('pointerleave', () => {
      if (state.hover !== key) return;
      state.hover = null;
      if (!state.pinned) state.automatic = state.active;
      state.elapsed = 0;
      chooseEffective();
    });
    button.addEventListener('focus', () => {
      state.focus = key;
      select(key);
      sync();
    });
    button.addEventListener('blur', () => {
      state.focus = null;
      if (!state.pinned) state.automatic = state.active;
      state.elapsed = 0;
      chooseEffective();
    });
    button.addEventListener('click', () => pin(key));
    button.addEventListener('keydown', (event) => {
      let next;
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight')
        next = (keys.indexOf(key) + 1) % keys.length;
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft')
        next = (keys.indexOf(key) + keys.length - 1) % keys.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = keys.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      buttons[next].focus();
    });
  }
  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    state.wantsMotion = !state.wantsMotion;
    sync();
  });
  automatic.addEventListener('click', () => {
    state.pinned = null;
    state.focus = null;
    state.hover = null;
    state.automatic = state.active;
    state.elapsed = 0;
    toggle.focus({ preventScroll: true });
    sync();
  });
  function fromHash() {
    const key = location.hash.replace(/^#use-/, '');
    if (keys.includes(key)) pin(key);
  }
  window.addEventListener('hashchange', fromHash);
  reduced.addEventListener('change', () => {
    if (reduced.matches) state.wantsMotion = false;
    sync();
  });
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('pagehide', () => {
    state.pageHidden = true;
    sync();
  });
  window.addEventListener('pageshow', () => {
    state.pageHidden = false;
    sync();
  });
  const observer =
    'IntersectionObserver' in window
      ? new IntersectionObserver(
          (entries) => {
            state.visible = entries[0].isIntersecting;
            sync();
          },
          { threshold: 0.08 },
        )
      : null;
  if (observer) observer.observe(map);
  else state.visible = true;
  if ('ResizeObserver' in window) {
    const resize = new ResizeObserver(measure);
    resize.observe(board);
    resize.observe(image);
    resize.observe(rail);
    resize.observe(payload);
  } else window.addEventListener('resize', measure);
  narrow.addEventListener('change', measure);
  image.addEventListener('load', measure);
  document.fonts?.ready.then(measure);
  map.classList.add('links-ready');
  map.dataset.autoChanges = '0';
  select(state.active);
  fromHash();
  sync();
})();
