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

## Colour rules
- **Never use colour in typography.** All text renders in the ink palette (`--gl-heading`, `--gl-ink`, `--gl-ink-soft`); this includes status words ("Expires soon"), severity labels, metric values, and up/down deltas. Semantic colour is carried only by tinted pill/badge backgrounds, status dots, meter fills, chart marks, and icons. Green anchor links are the one exception.
