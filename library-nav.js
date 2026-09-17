// Global library navigation: floating button + drawer, present on every page.
(function () {
  // Tree: top-level categories → expandable groups → links.
  const NAV = [
    { label: 'Home', href: '/index.html' },
    { label: 'Pages', children: [
      { label: 'Dashboards', children: [
        { label: 'T1 · Overview', children: [
          { href: '/canonical-t1-overview-hifi.html', label: 'A · Home' },
          { href: '/canonical-t1-overview-hifi-b.html', label: 'B · Compute' },
          { href: '/canonical-t1-overview-hifi-c.html', label: 'C · Cost & usage' },
          { href: '/canonical-t1-overview-hifi-d.html', label: 'D · Networking' },
          { href: '/canonical-t1-overview.html', label: 'Lo-fi spec' },
        ]},
        { label: 'T2 · Triage / work queue', children: [
          { href: '/canonical-t2-triage-hifi.html', label: 'A · Alerts' },
          { href: '/canonical-t2-triage-hifi-b.html', label: 'B · Support cases' },
          { href: '/canonical-t2-triage-hifi-c.html', label: 'C · Firmware updates' },
          { href: '/canonical-t2-triage-hifi-d.html', label: 'D · Security findings' },
          { href: '/canonical-t2-triage.html', label: 'Lo-fi spec' },
        ]},
        { label: 'T3 · Analytics / report', children: [
          { href: '/canonical-t3-analytics-hifi.html', label: 'A · Sustainability' },
          { href: '/canonical-t3-analytics-hifi-b.html', label: 'B · Capacity planning' },
          { href: '/canonical-t3-analytics-hifi-c.html', label: 'C · Utilization' },
          { href: '/canonical-t3-analytics-hifi-d.html', label: 'D · Wireless experience' },
          { href: '/canonical-t3-analytics.html', label: 'Lo-fi spec' },
        ]},
        { label: 'T5 · Custom board', children: [
          { href: '/canonical-t5-custom-hifi.html', label: 'A · Personal ops' },
          { href: '/canonical-t5-custom-hifi-b.html', label: 'B · Executive' },
          { href: '/canonical-t5-custom-hifi-c.html', label: 'C · NOC wallboard' },
          { href: '/canonical-t5-custom-hifi-d.html', label: 'D · Sustainability' },
          { href: '/canonical-t5-custom.html', label: 'Lo-fi spec' },
        ]},
      ]},
      { label: 'Details', children: [
        { label: 'T4 · Object detail', children: [
          { href: '/canonical-t4-detail-hifi.html', label: 'A · Server' },
          { href: '/canonical-t4-detail-hifi-b.html', label: 'B · Storage array' },
          { href: '/canonical-t4-detail-hifi-c.html', label: 'C · Network site' },
          { href: '/canonical-t4-detail-hifi-d.html', label: 'D · Subscription' },
          { href: '/canonical-t4-detail.html', label: 'Lo-fi spec' },
        ]},
      ]},
      { label: 'Data collection', children: [
        { href: '/data-collection/index.html', label: 'Overview' },
        { label: 'D1 · Inventory table', children: [
          { href: '/data-collection/servers-inventory.html', label: 'Hi-fi · Servers' },
          { href: '/data-collection/inventory-table.html', label: 'Lo-fi spec' },
        ]},
        { label: 'D2 · Card grid catalog', children: [
          { href: '/data-collection/catalog-hifi.html', label: 'Hi-fi · Service catalog' },
          { href: '/data-collection/card-catalog.html', label: 'Lo-fi spec' },
        ]},
        { label: 'D3 · Faceted event stream', children: [
          { href: '/data-collection/events-hifi.html', label: 'Hi-fi · Audit log' },
          { href: '/data-collection/event-stream.html', label: 'Lo-fi spec' },
        ]},
        { label: 'D4 · Analytics explorer', children: [
          { href: '/data-collection/analytics-cards-c.html', label: 'Hi-fi · Sustainability insights' },
          { href: '/data-collection/analytics-explorer.html', label: 'Lo-fi spec' },
        ]},
        { label: 'D5 · Map / spatial view', children: [
          { href: '/data-collection/map-hifi.html', label: 'Hi-fi · Sites map' },
          { href: '/data-collection/map-view.html', label: 'Lo-fi spec' },
        ]},
      ]},
    ]},
    { label: 'UI compositions', children: [
      { href: '/card-gallery.html', label: 'Card gallery' },
      { href: '/exception-card-options.html', label: 'Status card exploration' },
      { href: '/trend-card-options.html', label: 'Trend card options' },
      { href: '/needs-attention/needs-attention-exploration.html', label: 'Needs attention exploration' },
    ]},
    { label: 'Applied exercises', children: [
      { href: '/storage-overview-b.html', label: 'Storage overview · sectioned' },
      { href: '/storage-overview.html', label: 'Storage overview · bento' },
      { href: '/com-overview-remap-hifi.html', label: 'COM remap · A' },
      { href: '/com-overview-remap-hifi-b.html', label: 'COM remap · B' },
      { href: '/dashboard-lofi.html', label: 'Original lo-fi exploration' },
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
    .libnav-drawer a { display: block; padding: 7px 10px; border-radius: 6px; font-size: 13.5px; text-decoration: none;
      color: var(--gl-ink, #444E54); }
    .libnav-drawer a:hover { background: #F0F1F2; }
    .libnav-drawer a.cur { background: #EDF6F2; box-shadow: inset 0 0 0 1.5px var(--gl-green-dark, #01754F); font-weight: 600; color: var(--gl-heading, #202B30); }
    .libnav-drawer .twig { display: flex; align-items: center; gap: 6px; width: 100%; border: none; background: none;
      text-align: left; padding: 7px 10px; border-radius: 6px; cursor: pointer; font-family: inherit;
      font-size: 13.5px; font-weight: 600; color: var(--gl-heading, #202B30); }
    .libnav-drawer .twig:hover { background: #F0F1F2; }
    .libnav-drawer .twig .chev { flex: none; width: 12px; transition: transform .15s; transform: rotate(-90deg); color: #7A868C; }
    .libnav-drawer .branch.exp > .twig .chev { transform: none; }
    .libnav-drawer .branch > .kids { display: none; margin-left: 14px; padding-left: 6px; border-left: 1px solid var(--line, #D4D8DB); }
    .libnav-drawer .branch.exp > .kids { display: block; }
    .libnav-drawer .lv0 > .twig { font-size: 11px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; color: #7A868C; margin-top: 14px; }
    .libnav-drawer .lv0 > .kids { margin-left: 8px; padding-left: 0; border-left: none; }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const here = location.pathname + location.search;
  const isCur = (href) => href === here || href === location.pathname;

  const root = document.createElement('div');
  const chev = '<svg class="chev" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 4.5 6 8l3.5-3.5"/></svg>';

  // A branch containing the current page starts expanded.
  const hasCur = (node) => node.href ? isCur(node.href) : (node.children || []).some(hasCur);

  function render(node, depth) {
    if (node.href) return `<a href="${node.href}"${isCur(node.href) ? ' class="cur"' : ''}>${node.label}</a>`;
    const exp = hasCur(node) || depth === 0;
    return `<div class="branch lv${depth}${exp ? ' exp' : ''}">
      <button class="twig">${chev}${node.label}</button>
      <div class="kids">${node.children.map(c => render(c, depth + 1)).join('')}</div>
    </div>`;
  }
  const links = NAV.map(n => render(n, 0)).join('');
  root.innerHTML = `
    <div class="libnav-scrim" hidden></div>
    <nav class="libnav-drawer" aria-label="Library navigation">
      <div class="hd"><b>Examples library</b><button class="x" aria-label="Close">✕</button></div>
      ${links}
    </nav>`;
  document.body.appendChild(root);

  // The page header's hamburger opens the drawer; pages without one get a floating button.
  let trigger = document.querySelector('.header .burger, .burger');
  if (!trigger) {
    trigger = document.createElement('button');
    trigger.className = 'libnav-btn';
    trigger.setAttribute('aria-label', 'Open library navigation');
    trigger.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M1 3h12M1 7h12M1 11h12"/></svg> Library';
    document.body.appendChild(trigger);
  }

  const scrim = root.querySelector('.libnav-scrim');
  const open = () => { scrim.hidden = false; requestAnimationFrame(() => root.classList.add('libnav-open')); };
  const close = () => { root.classList.remove('libnav-open'); setTimeout(() => { scrim.hidden = true; }, 200); };
  trigger.addEventListener('click', open);
  root.querySelector('.x').addEventListener('click', close);
  root.querySelectorAll('.twig').forEach(t =>
    t.addEventListener('click', () => t.parentElement.classList.toggle('exp')));
  scrim.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();
