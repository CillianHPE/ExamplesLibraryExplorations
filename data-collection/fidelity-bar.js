// Injects a fidelity toggle bar. Usage:
// <script src="fidelity-bar.js" data-name="1 · Filterable inventory table"
//         data-lofi="inventory-table.html" data-hifi="servers-inventory.html" data-mode="lofi"></script>
(function () {
  var s = document.currentScript;
  var name = s.dataset.name, lofi = s.dataset.lofi, hifi = s.dataset.hifi, mode = s.dataset.mode;
  function seg(label, href, on) {
    return '<a href="' + href + '" style="text-decoration:none; padding:3px 12px; border-radius:12px; font-weight:600; color:' +
      (on ? '#fff; background:#444' : '#555') + ';">' + label + '</a>';
  }
  var bar = document.createElement('div');
  bar.setAttribute('style',
    'position:sticky; top:0; z-index:9999; display:flex; align-items:center; gap:14px;' +
    'background:#1f1f1f; color:#bbb; font:12.5px "Helvetica Neue",Arial,sans-serif; padding:7px 16px;');
  bar.innerHTML =
    '<a href="index.html" style="color:#bbb; text-decoration:none; font-weight:600;">‹ All archetypes</a>' +
    '<span style="color:#eee; font-weight:600;">' + name + '</span>' +
    '<span style="margin-left:auto; display:flex; gap:4px; background:#333; border-radius:14px; padding:2px;">' +
    seg('Lo-fi', lofi, mode === 'lofi') + seg('Hi-fi', hifi, mode === 'hifi') + '</span>';
  function insert() { document.body.insertBefore(bar, document.body.firstChild); }
  if (document.body) insert(); else document.addEventListener('DOMContentLoaded', insert);
})();
