// Progressive enhancement: all content and recording links remain readable without JS.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const saveData = navigator.connection?.saveData === true;
const mediaStates = new Map();
const chinese = document.documentElement.lang.startsWith('zh');

// Keep an explicitly selected section when following the native language links.
function syncLanguageLinks() {
  for (const link of document.querySelectorAll('[data-locale-link]')) link.hash = location.hash;
}
syncLanguageLinks();
window.addEventListener('hashchange', syncLanguageLinks);

function updateMedia(state) {
  const { video, button } = state;
  const available = state.inView && !document.hidden && !video.closest('[hidden]');
  const shouldPlay = state.wantsPlayback && available;
  button.textContent = chinese
    ? state.wantsPlayback
      ? '暂停动图'
      : '播放动图'
    : state.wantsPlayback
      ? 'Pause animation'
      : 'Play animation';
  button.setAttribute(
    'aria-label',
    chinese
      ? `${state.wantsPlayback ? '暂停' : '播放'}${video.id === 'web-demo' ? ' Web ' : '终端'}动图`
      : `${state.wantsPlayback ? 'Pause' : 'Play'} ${video.id === 'web-demo' ? 'Web' : 'terminal'} animation`,
  );
  if (!shouldPlay) {
    video.pause();
    return;
  }
  if (!state.loaded) {
    for (const source of video.querySelectorAll('source[data-src]')) {
      source.src = source.dataset.src;
    }
    state.loaded = true;
    video.load();
  }
  if (state.playPending || !video.paused) return;
  state.playPending = true;
  video
    .play()
    .then(() => {
      state.playPending = false;
      if (!state.wantsPlayback || !state.inView || document.hidden || video.closest('[hidden]')) {
        video.pause();
      }
    })
    .catch(() => {
      state.playPending = false;
      // An aborted play during a tab switch is expected, not an autoplay failure.
      if (state.inView && !document.hidden && !video.closest('[hidden]')) {
        state.wantsPlayback = false;
        updateMedia(state);
      }
    });
}

function syncMedia() {
  for (const state of mediaStates.values()) updateMedia(state);
}

for (const browser of document.querySelectorAll('[data-tabs]')) {
  const list = browser.querySelector('[data-tab-list]');
  const tabs = [...list.querySelectorAll('[data-panel]')];
  const panels = [...browser.querySelectorAll(':scope > [data-tab-panel]')];
  list.setAttribute('role', 'tablist');
  function activate(tab, focus = false) {
    for (const item of tabs) {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.dataset.panel).hidden = !selected;
    }
    if (focus) tab.focus();
    syncMedia();
  }
  for (const tab of tabs) {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', tab.dataset.panel);
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', (event) => {
      let next;
      const index = tabs.indexOf(tab);
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      activate(tabs[next], true);
    });
  }
  for (const panel of panels) {
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tabs.find((tab) => tab.dataset.panel === panel.id).id);
    panel.tabIndex = 0;
  }
  for (const link of browser.querySelectorAll('[data-select-tab]')) {
    link.addEventListener('click', () =>
      activate(document.getElementById(link.dataset.selectTab), true),
    );
  }
  browser.classList.add('tabs-ready');
  const tabFromHash = () => {
    const hash = location.hash.startsWith('#computer-') ? '#ot-environment' : location.hash;
    return tabs.find((tab) => `#${tab.dataset.panel}` === hash);
  };
  activate(tabFromHash() || tabs[0]);
  window.addEventListener('hashchange', () => {
    const tab = tabFromHash();
    if (tab) activate(tab);
  });
}

const observer =
  'IntersectionObserver' in window
    ? new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const state = mediaStates.get(entry.target);
            state.inView = entry.isIntersecting;
            updateMedia(state);
          }
        },
        { threshold: 0.15 },
      )
    : null;

for (const video of document.querySelectorAll('[data-loop-video]')) {
  const button = document.querySelector(`[data-video-toggle="${video.id}"]`);
  const state = {
    video,
    button,
    wantsPlayback: !reducedMotion.matches && !saveData,
    inView: !observer,
    loaded: false,
    playPending: false,
  };
  mediaStates.set(video, state);
  button.hidden = false;
  button.setAttribute('aria-controls', video.id);
  button.addEventListener('click', () => {
    state.wantsPlayback = !state.wantsPlayback;
    updateMedia(state);
  });
  video.addEventListener('error', () => {
    state.wantsPlayback = false;
    updateMedia(state);
  });
  observer?.observe(video);
  updateMedia(state);
}

document.addEventListener('visibilitychange', syncMedia);
window.addEventListener('pagehide', () => {
  for (const { video } of mediaStates.values()) video.pause();
});
window.addEventListener('pageshow', syncMedia);
reducedMotion.addEventListener('change', () => {
  // Opting into reduced motion stops all loops. Restart only through an explicit click.
  if (reducedMotion.matches) {
    for (const state of mediaStates.values()) state.wantsPlayback = false;
    syncMedia();
  }
});
