# Vnua Apparel

https://adrielvent.github.io/vnua-apparel/

The Vnua Industries clothing line. Drop 01 is designed but not made yet, so the site shows flat sketches
(inline SVG) instead of photos, and nothing is for sale.

Plain HTML in `site/`. On every push to `main`, `.github/workflows/deploy.yml` runs `npm ci && npm run build`,
which only copies `site/` to `out/` (no dependencies), and publishes `out/` to GitHub Pages.

| Page | What's on it |
| --- | --- |
| `site/index.html` | Home: Drop 01 intro and three pieces |
| `site/drop-01.html` | All six pieces |
| `site/about.html`, `site/contact.html` | About and contact |
| `site/404.html` | Not-found page |

Same type and colors as the hub (https://adrielvent.github.io/vnua-systems/): Tinos with Cousine for labels,
served from `site/assets/fonts/` under the SIL Open Font License.

The previous Next.js store (cart, Stripe and Printful stubs) is in this repo's history before the
"Rebuild as a plain site" commit, and on the `archive/next-store` branch.
