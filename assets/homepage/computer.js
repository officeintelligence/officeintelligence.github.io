// Read-only viewer of audited snapshot structure; no shell, files or service API is exposed.
(() => {
  const computer = document.querySelector('[data-npc-computer]');
  if (!computer) return;
  const apps = [...computer.querySelectorAll('[data-computer-app]')];
  const views = [...computer.querySelectorAll('[data-app-view]')];
  const locations = [...computer.querySelectorAll('[data-fs-location]')];
  const scopes = [...computer.querySelectorAll('[data-fs-scope]')];
  function selectApp(key) {
    apps.forEach((button) =>
      button.setAttribute('aria-pressed', String(button.dataset.computerApp === key)),
    );
    views.forEach((view) => {
      view.hidden = view.dataset.appView !== key;
    });
    computer.dataset.activeApp = key;
  }
  function selectScope(key) {
    locations.forEach((button) =>
      button.setAttribute('aria-pressed', String(button.dataset.fsLocation === key)),
    );
    scopes.forEach((scope) => {
      scope.hidden = scope.dataset.fsScope !== key;
    });
    computer.dataset.activeScope = key;
  }
  for (const button of apps) {
    button.disabled = false;
    button.addEventListener('click', () => selectApp(button.dataset.computerApp));
    button.addEventListener('keydown', (event) => {
      const index = apps.indexOf(button);
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % apps.length;
      if (event.key === 'ArrowLeft') next = (index + apps.length - 1) % apps.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = apps.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      apps[next].focus();
      selectApp(apps[next].dataset.computerApp);
    });
  }
  for (const button of locations) {
    button.disabled = false;
    button.addEventListener('click', () => selectScope(button.dataset.fsLocation));
  }
  const demoToggle = computer.querySelector('.demo-content-toggle');
  demoToggle.disabled = false;
  demoToggle.addEventListener('click', () => {
    const visible = demoToggle.getAttribute('aria-pressed') !== 'true';
    demoToggle.setAttribute('aria-pressed', String(visible));
    computer.querySelectorAll('[data-demo-only]').forEach((section) => {
      section.hidden = !visible;
    });
    computer.querySelectorAll('.demo-hidden-state').forEach((section) => {
      section.hidden = visible;
    });
  });
  computer.querySelectorAll('[data-open-computer-app]').forEach((link) => {
    link.addEventListener('click', () => {
      selectApp(link.dataset.openComputerApp);
      apps
        .find((button) => button.dataset.computerApp === link.dataset.openComputerApp)
        ?.focus({ preventScroll: true });
    });
  });
  function appFromHash() {
    const key = location.hash.replace(/^#computer-/, '');
    return apps.some((button) => button.dataset.computerApp === key) ? key : null;
  }
  window.addEventListener('hashchange', () => {
    const app = appFromHash();
    if (app) selectApp(app);
  });
  // Start with project work and personal notes visible; all folders remain expandable.
  computer.querySelectorAll('.snapshot-tree details').forEach((folder) => {
    const name = folder.querySelector(':scope > summary > span')?.textContent;
    if (name === 'Areas/' || name === 'Resources/') folder.open = false;
  });
  computer.classList.add('computer-ready');
  selectScope('home');
  selectApp(appFromHash() || 'files');
})();
