# ExamplesLibrary

A static library of GreenLake design examples: page archetypes (T1–T5, D1–D5), dashboard widgets (W1–W14), layouts and UI compositions, each with a low-fidelity spec and a high-fidelity build.

## Run locally

```sh
python3 -m http.server 8642
```

Pages use absolute paths (`/hifi-shared.css`, `/library-nav.js`), so serve from the repo root.

## Browsing

- `index.html` — home, with a "Browse all examples" entry point and the archetype list.
- `browse.html` — catalogue view of every example as a card. Filter by kind (widgets, pages, layouts, compositions), by the job it does ("Show a trend", "Report an exception", …), family, space on the dashboard and where it takes you. Search with the box (press `/`). State is kept in the URL, e.g. `browse.html?kind=widget&job=show-trend`.
- `item.html?id=w3` — detail page for one example: live preview, use when / not when, spec, where it is seen in use, alternatives and related items, and other examples doing the same job.

## Adding or editing examples

- `catalogue-data.js` — the single source of truth for what is browsable: jobs, families, the page registry and every item (title, question it answers, use when / not when, tags, `seenIn`, `related`, `variants`, and a `preview` pointing at the markup to render).
- `catalogue.js` — shared runtime: loads previews live from the source pages (so cards never go stale), renders cards.
- `catalogue.css` — styles for the browse and detail pages.

Widget previews are pulled from `widgets/index.html` (`#wN .ex`) and `card-gallery.html`; page previews are scaled iframes of the hi-fi pages. Add a new widget or page to its source page first, then register it in `catalogue-data.js`.
