// Shared runtime for browse.html and item.html: preview loading and card rendering.
window.Catalogue = (function () {
  const D = window.CATALOGUE;
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // ---- Source documents (fetched once, parsed once) ----
  const docCache = {};
  function fetchDoc(src) {
    if (!docCache[src]) {
      docCache[src] = fetch(src).then(r => r.text()).then(html => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        adoptStyles(src, doc);
        return doc;
      });
    }
    return docCache[src];
  }

  // Scope a source page's inline <style> rules under .pv[data-src="..."] so
  // widget markup renders exactly as it does at home without leaking styles.
  const adopted = new Set();
  function adoptStyles(src, doc) {
    if (adopted.has(src)) return;
    adopted.add(src);
    const scope = `.pv[data-src="${src}"]`;
    const css = [...doc.querySelectorAll('style')].map(s => s.textContent).join('\n');
    const sheet = new CSSStyleSheet();
    try { sheet.replaceSync(css); } catch (e) { return; }
    const out = [];
    const walk = (rules, into) => {
      for (const r of rules) {
        if (r.type === CSSRule.STYLE_RULE) {
          const sel = r.selectorText.split(',').map(s => s.trim())
            .filter(s => !/^(html|body)\b/.test(s))
            .map(s => `${scope} ${s}`).join(', ');
          if (sel) into.push(`${sel} { ${r.style.cssText} }`);
        } else if (r.type === CSSRule.MEDIA_RULE) {
          const inner = []; walk(r.cssRules, inner);
          if (inner.length) into.push(`@media ${r.conditionText} { ${inner.join('\n')} }`);
        }
      }
    };
    walk(sheet.cssRules, out);
    const style = document.createElement('style');
    style.dataset.scopedFrom = src;
    style.textContent = out.join('\n');
    document.head.appendChild(style);
  }

  // ---- Previews ----
  // Widget / gallery previews: real markup from the source page, scaled to fit.
  // Page previews: the hi-fi page in a lazily loaded, scaled-down iframe.
  let io;
  function lazy(el, cb) {
    io = io || new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { io.unobserve(e.target); e.target._cb(); } });
    }, { rootMargin: '300px' });
    el._cb = cb; io.observe(el);
  }

  function mountPreview(host, item, opts = {}) {
    const p = item.preview;
    if (!p) return;
    host.classList.add('pv', 'pv-' + p.type);
    host.dataset.src = p.src;
    if (p.type === 'catalogue') {
      lazy(host, () => fetchDoc(p.src).then(doc => {
        const node = doc.querySelector(p.selector);
        if (!node) { host.classList.add('pv-missing'); return; }
        const stage = document.createElement('div');
        stage.className = 'pv-stage';
        stage.style.width = (opts.stageWidth || 360) + 'px';
        stage.innerHTML = node.matches('.card') ? node.outerHTML : node.innerHTML;
        host.appendChild(stage);
        if (window.renderIcons) window.renderIcons();
        const fit = () => {
          const bw = host.clientWidth, bh = host.clientHeight;
          const sw = stage.offsetWidth, sh = stage.offsetHeight;
          if (!sw || !sh) return;
          const pad = opts.pad ?? 24;
          const s = Math.min((bw - pad * 2) / sw, bh ? (bh - pad * 2) / sh : 1, opts.maxScale || 1);
          stage.style.transform = `translate(-50%, -50%) scale(${s})`;
          host.classList.add('pv-ready');
        };
        requestAnimationFrame(fit);
        new ResizeObserver(fit).observe(host);
      }).catch(() => host.classList.add('pv-missing')));
    } else {
      lazy(host, () => {
        const vw = opts.viewport || 1280;
        const f = document.createElement('iframe');
        f.className = 'pv-frame';
        f.src = p.src;
        f.tabIndex = -1;
        f.setAttribute('aria-hidden', 'true');
        f.style.width = vw + 'px';
        const fit = () => {
          const bw = host.clientWidth, bh = host.clientHeight;
          const s = bw / vw;
          f.style.height = (bh / s) + 'px';
          f.style.transform = `scale(${s})`;
        };
        f.addEventListener('load', () => host.classList.add('pv-ready'));
        host.appendChild(f);
        fit();
        new ResizeObserver(fit).observe(host);
      });
    }
  }

  // ---- Labels ----
  function kindLabel(item) { return D.KINDS[item.kind].one; }
  function groupLabel(item) {
    if (item.kind === 'widget') return D.FAMILIES[item.family].label;
    return D.CATEGORIES[item.category] || '';
  }
  function itemHref(item) { return `/item.html?id=${encodeURIComponent(item.id)}`; }
  function sizeLabel(s) { return s.replace('x', '×'); }

  // ---- Card ----
  function card(item, o = {}) {
    const jobs = (item.jobs || []).slice(0, o.maxJobs ?? 2).map(j => `<span class="cb-tag">${esc(D.JOBS[j])}</span>`).join('');
    const sizes = item.sizes ? `<span class="cb-sizes">${item.sizes.map(s => `<b>${sizeLabel(s)}</b>`).join('')}</span>` : '';
    return `<a class="cb-card cb-kind-${item.kind}" href="${itemHref(item)}" data-id="${esc(item.id)}">
      <div class="cb-thumb"></div>
      <div class="cb-body">
        <div class="cb-eyebrow"><span>${esc(item.code)} · ${esc(groupLabel(item))}</span>${sizes}</div>
        <h3>${esc(item.title)}</h3>
        <p class="cb-q">${esc(item.question || '')}</p>
        ${o.note ? `<p class="cb-note">${esc(o.note)}</p>` : ''}
        <div class="cb-tags">${jobs}</div>
      </div>
    </a>`;
  }

  // Renders cards into a container and mounts their previews.
  function renderCards(container, items, o = {}) {
    container.innerHTML = items.map(i => card(i, typeof o.note === 'function' ? { ...o, note: o.note(i) } : o)).join('');
    container.querySelectorAll('.cb-card').forEach(a => {
      const item = D.byId[a.dataset.id];
      mountPreview(a.querySelector('.cb-thumb'), item, { stageWidth: 360, pad: 20 });
    });
  }

  return { D, esc, mountPreview, card, renderCards, kindLabel, groupLabel, itemHref, sizeLabel };
})();
