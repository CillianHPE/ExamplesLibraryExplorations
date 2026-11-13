/* GreenLake hi-fi icon library.
   Outline style matching brand reference: 24px grid, 1.8px stroke,
   round caps/joins, currentColor, no fills (sparkle is the one filled glyph).
   Usage: <span data-i="bell"></span> — injected on DOMContentLoaded. */
(function () {
  const S = 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
  const ICONS = {
    /* nav rail */
    panel:     `<rect x="3.2" y="4.2" width="17.6" height="15.6" rx="3"/><path d="M9.6 4.2v15.6"/>`,
    cube:      `<path d="M12 3.2l7.4 4.2v9.2L12 20.8l-7.4-4.2V7.4L12 3.2z"/><path d="M4.6 7.4L12 11.6l7.4-4.2M12 11.6v9.2"/>`,
    terminal:  `<rect x="3.2" y="4.2" width="17.6" height="15.6" rx="3"/><path d="M7.4 9.2l3 2.8-3 2.8M12.8 15.2h4"/>`,
    grid:      `<rect x="3.6" y="3.6" width="7" height="7" rx="2"/><rect x="13.4" y="3.6" width="7" height="7" rx="2"/><rect x="3.6" y="13.4" width="7" height="7" rx="2"/><rect x="13.4" y="13.4" width="7" height="7" rx="2"/>`,
    plusbadge: `<path d="M9.2 4.4h5.6v4.8h4.8v5.6h-4.8v4.8H9.2v-4.8H4.4V9.2h4.8V4.4z"/>`,
    database:  `<ellipse cx="12" cy="6" rx="7.4" ry="2.9"/><path d="M4.6 6v12c0 1.6 3.3 2.9 7.4 2.9s7.4-1.3 7.4-2.9V6"/><path d="M4.6 12c0 1.6 3.3 2.9 7.4 2.9s7.4-1.3 7.4-2.9"/>`,
    layers:    `<ellipse cx="12" cy="6.6" rx="7" ry="2.8"/><path d="M5 10.6c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8"/><path d="M5 14.6c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8"/><path d="M5 6.6v8M19 6.6v8"/>`,
    broadcast: `<circle cx="12" cy="11" r="1.6" fill="currentColor" stroke="none"/><path d="M12 13v7"/><path d="M8.6 7.6a5 5 0 000 6.8M15.4 7.6a5 5 0 010 6.8"/><path d="M5.8 5a9 9 0 000 12M18.2 5a9 9 0 010 12"/>`,
    /* global header */
    sparkle:   `<path d="M12 3.4l1.9 5.4 5.4 1.9-5.4 1.9-1.9 5.4-1.9-5.4-5.4-1.9 5.4-1.9L12 3.4z" fill="currentColor" stroke="none"/><path d="M18.6 15.4l.9 2.4 2.4.9-2.4.9-.9 2.4-.9-2.4-2.4-.9 2.4-.9.9-2.4z" fill="currentColor" stroke="none"/>`,
    bell:      `<path d="M6.2 10a5.8 5.8 0 0111.6 0c0 4 1.6 5.4 1.6 5.4H4.6S6.2 14 6.2 10z"/><path d="M10.4 18.9a1.7 1.7 0 003.2 0"/>`,
    help:      `<circle cx="12" cy="12" r="8.4"/><path d="M9.6 9.6a2.4 2.4 0 114 1.8c-.8.7-1.6 1.1-1.6 2.2"/><path d="M12 16.6h.01"/>`,
    chat:      `<path d="M20.4 7a3 3 0 00-3-3H6.6a3 3 0 00-3 3v7a3 3 0 003 3H8v3.4L12.4 17h5a3 3 0 003-3V7z"/><path d="M8 8.6h8M8 11.9h5"/>`,
    user:      `<circle cx="12" cy="8.4" r="3.7"/><path d="M5 19.8c1-3.4 3.8-4.9 7-4.9s6 1.5 7 4.9"/>`,
    search:    `<circle cx="11" cy="11" r="6.4"/><path d="M15.7 15.7l4.6 4.6"/>`,
    /* body / data views */
    info:      `<circle cx="12" cy="12" r="8.4"/><path d="M12 11v5"/><path d="M12 7.8h.01"/>`,
    filter:    `<path d="M4 5h16l-6.2 7.2v5.4l-3.6-2v-3.4L4 5z"/>`,
    map:       `<path d="M9 4.4l6 2 5.4-2v13.2l-5.4 2-6-2-5.4 2V6.4l5.4-2z"/><path d="M9 4.4v13.2M15 6.4v13.2"/>`,
    globe:     `<circle cx="12" cy="12" r="8.4"/><path d="M3.6 12h16.8M12 3.6c-2.4 2.2-3.6 5.1-3.6 8.4s1.2 6.2 3.6 8.4c2.4-2.2 3.6-5.1 3.6-8.4S14.4 5.8 12 3.6z"/>`,
    warning:   `<path d="M12 4.6L21 19.4H3L12 4.6z" fill="currentColor" stroke="none"/>`,
    table:     `<rect x="3.4" y="4.4" width="17.2" height="15.2" rx="2.6"/><path d="M3.4 9.6h17.2M9.6 9.6v10"/>`,
    list:      `<path d="M4 6.2h2.4M4 12h2.4M4 17.8h2.4M10 6.2h10M10 12h10M10 17.8h10"/>`,
    chevron:   `<path d="M7 10l5 5 5-5"/>`,
  };
  function render() {
    document.querySelectorAll('[data-i]').forEach(el => {
      const body = ICONS[el.getAttribute('data-i')];
      if (body) el.innerHTML = `<svg viewBox="0 0 24 24" ${S} aria-hidden="true">${body}</svg>`;
    });
  }
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', render) : render();
  window.renderIcons = render; // for markup injected after load (catalogue previews)
})();
