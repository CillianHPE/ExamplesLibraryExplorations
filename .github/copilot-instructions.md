# ExamplesLibrary — design prototype rules

## Copy rules
- **Never use an em dash with spaces (" — ") in any displayed copy** (body text, labels, subtitles, `<title>` tags, tooltips). Instead use, in order of preference: a new sentence (". "), a colon (": "), a comma (", "), or a middot separator (" · ") for data fragments.
- Button copy: verb-only when the surrounding context names the object (e.g. "Connect", not "Connect servers"). Keep the noun only to disambiguate. Icons in buttons only when meaningful (＋ add, ▾ menu), never decorative.
- Ban the word "fleet" in UI copy; use "servers", "inventory", or "environment". (The device-group name "Edge-North-Fleet" is a proper noun and may remain.)
- Don't render zero counts in legends or lists; absence is communicated by the chart itself.

## Layout rules
- 64px between primary and secondary areas; 32px between content sections; 16px between containers within a section.
- Grey containment (#F7F7F7) signals a contained module; tables on the page body are uncontained and full width.
- Secondary rail: no grey by default, no underline below headings; order = interrupt callout → quick links → recommendations → ambient metrics.
- One action, one home per view: never duplicate a CTA between the primary area and the rail.
- Status ordering: critical → warning → ok → unknown.
- Max one `.btn.primary` per view.

## Chart rules
- **Default sparkline/trend style** (canonical spec, reused everywhere): `<svg viewBox="0 0 220 72" preserveAspectRatio="none">` rendered at `width:100%; height:72px`. Primary line: 2px solid `var(--c-blue)`, `stroke-linecap="round"`, `vector-effect="non-scaling-stroke"`. Gradient area fill fading to transparent (0.22 → 0 opacity) down to y=70. Endpoint dot: fixed 12×12 px, drawn as `<path d="Mx y h0.01" stroke-width="12" vector-effect="non-scaling-stroke" stroke-linecap="round">`. Prior-period reference line: 2px `var(--line)`, `stroke-dasharray="1 4"`, rounded caps, non-scaling. No text inside the plot area; values live in the axis row below as "date · value" at both ends. Dashed reference lines get a `.legend-inline` row with a `.dash-sw` swatch; single solid series never get a legend entry.

## Colour rules
- **Never use colour in typography.** All text renders in the ink palette (`--gl-heading`, `--gl-ink`, `--gl-ink-soft`); this includes status words ("Expires soon"), severity labels, metric values, and up/down deltas. Semantic colour is carried only by tinted pill/badge backgrounds, status dots, meter fills, chart marks, and icons. Green anchor links are the one exception.

## Workflow rules
- **Auto-refresh the preview after every change.** Once an edit to a page is made and committed, verify the server responds (curl the page; restart `python3 -m http.server 8642` detached if it returns 000), then re-open the browser canvas (instanceId `com-remap`) pointing at the edited page so the user always sees the latest state without asking.
- **HARD RULE: always include the live link.** Every reply that reports completed work MUST contain the full `http://localhost:8642/<page>.html` URL of the artefact that was created or changed. No exceptions: even if the preview canvas was refreshed, the link goes in the message text too.
