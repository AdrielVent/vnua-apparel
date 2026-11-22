# Vnua Apparel

https://adrielvent.github.io/vnua-apparel/

The Vnua Industries store: club merch for Hofstra SHPE and Hofstra AIAA, and Drop 01. Nothing is for sale yet.
Club merch pieces are concepts for a member vote; each club runs its own preorder and keeps the money.

## Editing

The easy way: go to https://app.pagescms.org, sign in with GitHub, and open `AdrielVent/vnua-apparel`.
You get forms for products, page text, the menu and the footer. Saving commits to `main` and the site rebuilds.

By hand: everything you see is in `content/`.

| File | What's in it |
| --- | --- |
| `content/products.json` | Every piece: name, section, color, status, price, sketch or photo |
| `content/pages/*.json` | Store, Club Merch, Drop 01, About, Contact, 404 text |
| `content/site.json` | Name at the top, menu, footer |
| `site/assets/` | Stylesheet, Barlow font (SIL Open Font License), light/dark script and uploaded images |

## Building

`npm run build` runs `scripts/build.mjs` (no dependencies), which writes the whole site to `out/`. On every push to
`main`, `.github/workflows/deploy.yml` runs `npm ci && npm run build` and publishes `out/` to GitHub Pages.
Each product gets its own page at `<slug>.html`.

The previous Next.js store is on the `archive/next-store` branch.
