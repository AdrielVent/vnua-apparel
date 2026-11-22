# Vnua Apparel

https://adrielvent.github.io/vnua-apparel/

The Vnua Industries store: club drops for Hofstra SHPE and Hofstra AIAA, and Drop 01. Nothing is for sale yet.
Club drops are concepts for a member vote; each club runs its own preorder campaign and keeps the money.
Drop 01 is designed but not made, so the site shows flat sketches (inline SVG) instead of photos.

Plain HTML in `site/`. On every push to `main`, `.github/workflows/deploy.yml` runs `npm ci && npm run build`,
which only copies `site/` to `out/` (no dependencies), and publishes `out/` to GitHub Pages.

| Page | What's on it |
| --- | --- |
| `site/index.html` | Home: club drops and four Drop 01 pieces |
| `site/club-drops.html` | SHPE and AIAA concepts, the approval and preorder steps, sources |
| `site/drop-01.html` | All six pieces |
| `site/about.html`, `site/contact.html` | About and contact |
| `site/404.html` | Not-found page |

Same stylesheet and type as the hub (https://adrielvent.github.io/vnua-systems/): Oswald, Source Sans 3 and Cousine,
served from `site/assets/fonts/` under the SIL Open Font License.

The previous Next.js store (cart, Stripe and Printful stubs) is in this repo's history before the
"Rebuild as a plain site" commit, and on the `archive/next-store` branch.
