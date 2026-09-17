// Global library navigation: floating button + drawer, present on every page.
(function () {
  const NAV = [
    { title: 'Library', items: [
      { href: 'index.html', label: 'Home' },
    ]},
    { title: 'Archetypes', items: [
      { href: 'viewer.html?t=t1', label: 'T1 · Overview' },
      { href: 'viewer.html?t=t2', label: 'T2 · Triage / work queue' },
      { href: 'viewer.html?t=t3', label: 'T3 · Analytics / report' },
      { href: 'viewer.html?t=t4', label: 'T4 · Object detail' },
      { href: 'viewer.html?t=t5', label: 'T5 · Custom board' },
    ]},
    { title: 'UI compositions', items: [
      { href: 'card-gallery.html', label: 'Card gallery' },
      { href: 'exception-card-options.html', label: 'Status card exploration' },
      { href: 'trend-card-options.html', label: 'Trend card options' },
    ]},
    { title: 'Applied exercises', items: [
      { href: 'storage-overview-b.html', label: 'Storage overview · sectioned' },
      { href: 'storage-overview.html', label: 'Storage overview · bento' },
      { href: 'com-overview-remap-hifi.html', label: 'COM remap · A' },
      { href: 'com-overview-remap-hifi-b.html', label: 'COM remap · B' },
      { href: 'dashboard-lofi.html', label: 'Original lo-fi exploration' },
    ]},
  ];

  const css = `
    .libnav-btn { position: fixed; left: 16px; bottom: 16px; z-index: 900; display: flex; align-items: center; gap: 8px;
      padding: 9px 14px 9px 12px; border: 1px solid var(--line, #D4D8DB); border-radius: 20px; background: #FFF;
      font: 600 13px/-apple-system -apple-system, "Segoe UI", Roboto, sans-serif; font-size: 13px; font-weight: 600;
      color: var(--gl-heading, #202B30); cursor: pointer; box-shadow: 0 2px 10px rgba(32,43,48,0.12); }
    .libnav-btn:hover { background: #F7F7F7; }
    .libnav-btn svg { display: block; }
    .libnav-scrim { position: fixed; inset: 0; z-index: 950; background: rgba(32,43,48,0.28); opacity: 0; transition: opacity .18s; }
    .libnav-drawer { position: fixed; top: 0; left: 0; bottom: 0; z-index: 960; width: 292px; background: #FFF;
      box-shadow: 4px 0 24px rgba(32,43,48,0.16); transform: translateX(-100%); transition: transform .2s ease;
      overflow-y: auto; padding: 20px 16px 32px; font-family: -apple-system, "Segoe UI", Roboto, sans-serif; }
    .libnav-open .libnav-drawer { transform: none; }
    .libnav-open .libnav-scrim { opacity: 1; }
    .libnav-drawer .hd { display: flex; align-items: center; justify-content: space-between; margin: 0 8px 14px; }
    .libnav-drawer .hd b { font-size: 15px; font-weight: 700; color: var(--gl-heading, #202B30); }
    .libnav-drawer .x { border: none; background: none; font-size: 18px; line-height: 1; cursor: pointer; color: var(--gl-ink, #444E54); padding: 4px 6px; border-radius: 6px; }
    .libnav-drawer .x:hover { background: #F0F1F2; }
    .libnav-drawer .grp { font-size: 11px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase;
      color: #7A868C; margin: 18px 8px 6px; }
    .libnav-drawer a { display: block; padding: 7px 10px; border-radius: 6px; font-size: 13.5px; text-decoration: none;
      color: var(--gl-ink, #444E54); }
    .libnav-drawer a:hover { background: #F0F1F2; }
    .libnav-drawer a.cur { background: #EDF6F2; box-shadow: inset 0 0 0 1.5px var(--gl-green-dark, #01754F); font-weight: 600; color: var(--gl-heading, #202B30); }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const here = location.pathname.split('/').pop() + location.search;
  const isCur = (href) => href === here || href === location.pathname.split('/').pop();

  const root = document.createElement('div');
  let links = '';
  NAV.forEach(g => {
    links += `<div class="grp">${g.title}</div>`;
    g.items.forEach(i => {
      links += `<a href="${i.href}"${isCur(i.href) ? ' class="cur"' : ''}>${i.label}</a>`;
    });
  });
  root.innerHTML = `
    <button class="libnav-btn" aria-label="Open library navigation">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M1 3h12M1 7h12M1 11h12"/></svg>
      Library
    </button>
    <div class="libnav-scrim" hidden></div>
    <nav class="libnav-drawer" aria-label="Library navigation">
      <div class="hd"><b>Examples library</b><button class="x" aria-label="Close">✕</button></div>
      ${links}
    </nav>`;
  document.body.appendChild(root);

  const scrim = root.querySelector('.libnav-scrim');
  const open = () => { scrim.hidden = false; requestAnimationFrame(() => root.classList.add('libnav-open')); };
  const close = () => { root.classList.remove('libnav-open'); setTimeout(() => { scrim.hidden = true; }, 200); };
  root.querySelector('.libnav-btn').addEventListener('click', open);
  root.querySelector('.x').addEventListener('click', close);
  scrim.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();
