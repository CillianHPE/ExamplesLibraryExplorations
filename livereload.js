// Dev-only auto-reload: polls the current page's Last-Modified header and
// reloads when it changes. Served by the local python http.server.
(function () {
  if (location.protocol === "file:") return;
  var stamp = null;
  setInterval(function () {
    fetch(location.pathname, { method: "HEAD", cache: "no-store" })
      .then(function (r) {
        var lm = r.headers.get("Last-Modified");
        if (stamp === null) { stamp = lm; return; }
        if (lm && lm !== stamp) location.reload();
      })
      .catch(function () {});
  }, 2000);
})();
