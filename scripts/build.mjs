// Builds the store into out/. No dependencies.
// Text and products live in content/ (edit them at https://app.pagescms.org, or by hand).
// site/assets is copied as-is. The GitHub Pages workflow runs `npm ci && npm run build` and publishes out/.
import { cpSync, rmSync, mkdirSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';

const read = (p) => JSON.parse(readFileSync(p, 'utf8'));
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const site = read('content/site.json');
const products = read('content/products.json');
const pages = Object.fromEntries(readdirSync('content/pages').filter((f) => f.endsWith('.json')).map((f) => [f.replace(/\.json$/, ''), read(`content/pages/${f}`)]));
const BASE = 'https://adrielvent.github.io/vnua-apparel/';

rmSync('out', { recursive: true, force: true });
mkdirSync('out', { recursive: true });
cpSync('site/assets', 'out/assets', { recursive: true });

const favicon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%230b5cad'/%3E%3Cpath d='M8 8h4l4 12 4-12h4l-6 16h-4z' fill='%23fff'/%3E%3C/svg%3E";

function layout(file, title, description, body, current) {
  const menu = site.menu.map((m) => `<li><a href="${esc(m.url)}"${m.url === current ? ' aria-current="page"' : ''}>${esc(m.label)}</a></li>`).join('\n    ');
  const foot = site.menu.map((m) => `<li><a href="${esc(m.url)}">${esc(m.label)}</a></li>`).join('');
  const url = BASE + (file === 'index.html' ? '' : file);
  writeFileSync(`out/${file}`, `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title === 'Store' ? 'Vnua Apparel' : `${title} | Vnua Apparel`)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#f4f4f4">
<script>(function(){var t;try{t=localStorage.getItem('vnua-theme')}catch(e){}if(t!=='light'&&t!=='dark'){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)})();</script>
<link rel="icon" type="image/svg+xml" href="${favicon}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Vnua Apparel">
<meta property="og:title" content="${esc(title)}">
<meta property="og:url" content="${url}">
<link rel="preload" href="assets/fonts/barlow-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/site.css">
</head>
<body>
<a href="#main" class="skip-link">Skip to content</a>
<header class="masthead">
  <div class="top-icons">
    <a href="https://www.linkedin.com/in/adrielvent/" aria-label="LinkedIn" title="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3.5a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4zM3.1 9.3h3.8V21H3.1zM9.3 9.3h3.6v1.6h.1c.5-.9 1.7-1.9 3.6-1.9 3.8 0 4.5 2.5 4.5 5.8V21h-3.8v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H9.3z"/></svg></a>
    <a href="https://github.com/AdrielVent" aria-label="GitHub" title="GitHub"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .8a11.2 11.2 0 0 0-3.5 21.8c.6.1.8-.2.8-.5v-2c-3.1.7-3.8-1.4-3.8-1.4-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.6 1.2 3.3.9.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.2-5.1-5.5 0-1.2.4-2.2 1.2-3-.1-.3-.5-1.4.1-3 0 0 .9-.3 3.1 1.2a10.6 10.6 0 0 1 5.6 0c2.1-1.5 3.1-1.2 3.1-1.2.6 1.6.2 2.7.1 3 .7.8 1.2 1.8 1.2 3 0 4.3-2.6 5.2-5.1 5.5.4.3.8 1 .8 2.1v3.1c0 .3.2.6.8.5A11.2 11.2 0 0 0 12 .8z"/></svg></a>
    <a href="mailto:adriel@adrielv.me" aria-label="Email" title="Email"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 5h19v14h-19zm2 2.3V17h15V7.3L12 12.6zM5.6 7l6.4 4.5L18.4 7z"/></svg></a>
    <button class="theme-toggle" type="button" hidden aria-label="Switch to dark mode" title="Switch to dark mode"><svg class="moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7z"/></svg><svg class="sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5.3 5.3l1.7 1.7M17 17l1.7 1.7M5.3 18.7 7 17M17 7l1.7-1.7" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/></svg><span class="label vh">Dark</span></button>
  </div>
  <a class="wordmark" href="./">
    <span class="name"><b>${esc(site.name_bold)}</b> <span>${esc(site.name_light)}</span></span>
    <span class="rule"></span>
    <span class="tag">${esc(site.tagline)}</span>
  </a>
</header>
<nav class="menu" aria-label="Site">
  <ul>
    ${menu}
  </ul>
</nav>
<main id="main">
${body}
</main>
<footer class="site-footer">
  <div class="wrap">
    <ul>${foot}</ul>
    <p>${esc(site.footer_note)}</p>
    <p>${esc(site.footer_small)}</p>
  </div>
</footer>
<script src="assets/theme.js"></script>
</body>
</html>
`);
}

const crumbs = (trail) => `<nav class="crumbs" aria-label="Breadcrumb"><ol>${trail.map(([label, href], i) =>
  i === trail.length - 1 ? `<li aria-current="page">${esc(label)}</li>` : `<li><a href="${href}">${esc(label)}</a></li>`).join('')}</ol></nav>`;
const head = (p) => `<div class="page-title"><h1>${esc(p.title)}</h1>${p.lead ? `<p class="lead">${esc(p.lead)}</p>` : ''}</div>`;
const picture = (p) => p.image
  ? `<img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy">`
  : `<span class="sketch">${p.sketch}</span>`;
const tile = (p) => `<li class="tile">
  <a class="pic" href="${p.slug}.html" tabindex="-1" aria-hidden="true">${picture(p)}</a>
  <h3><a href="${p.slug}.html">${esc(p.name)}</a></h3>
  <p><span class="swatch" style="--swatch:${esc(p.swatch)}"></span>${esc(p.color)}</p>
</li>`;
const grid = (list) => `<ul class="tiles">\n${list.map(tile).join('\n')}\n</ul>`;
const group = (g) => products.filter((p) => p.group === g);

// Store home: the full grid, like a gallery store page
{
  const p = pages.index;
  layout('index.html', p.title, p.lead, `<div class="wrap">
${crumbs([['Home', './'], ['Store', '']])}
${head(p)}
<section class="block" style="padding-top:24px"><div class="block-head"><h2>Club merch</h2><a class="all" href="club-merch.html">How it works</a></div>${grid(group('Club merch'))}</section>
<section class="block" style="padding-top:0"><div class="block-head"><h2>Drop 01</h2><a class="all" href="drop-01.html">About Drop 01</a></div>${grid(group('Drop 01'))}</section>
</div>`, 'index.html');
}

// Club merch and Drop 01 pages: text, then their pieces
for (const [key, g] of [['club-merch', 'Club merch'], ['drop-01', 'Drop 01']]) {
  const p = pages[key];
  layout(`${key}.html`, p.title, p.lead, `<div class="wrap">
${crumbs([['Store', './'], [p.title, '']])}
${head(p)}
<div class="page-body">
  ${p.body ? `<div class="prose">${p.body}</div>` : ''}
  ${grid(group(g))}
</div>
</div>`, `${key}.html`);
}

// One page per piece
for (const p of products) {
  const parent = p.group === 'Club merch' ? ['Club Merch', 'club-merch.html'] : ['Drop 01', 'drop-01.html'];
  const views = p.image
    ? `<figure class="figure"><img src="${esc(p.image)}" alt="${esc(p.name)}"></figure>`
    : p.sketch_back
      ? `<div class="pair"><figure>${p.sketch}<figcaption>Front</figcaption></figure><figure>${p.sketch_back}<figcaption>Back</figcaption></figure></div>`
      : `<div class="pair" style="grid-template-columns:1fr;max-width:520px"><figure>${p.sketch}<figcaption>Sketch</figcaption></figure></div>`;
  const rows = [['Club', p.club], ['Color', `<span class="swatch" style="--swatch:${esc(p.swatch)}"></span>${esc(p.color)}`], ['Status', esc(p.status)], ['Price', esc(p.price)]]
    .filter(([, v]) => v).map(([k, v]) => `<tr><th scope="row">${k}</th><td>${v}</td></tr>`).join('');
  layout(`${p.slug}.html`, p.name, p.text, `<div class="wrap">
${crumbs([['Store', './'], parent, [p.name, '']])}
<div class="page-title"><h1>${esc(p.name)}</h1><p class="lead">${esc(p.text)}</p></div>
<div class="page-body has-side">
  <div>${views}</div>
  <aside class="side"><table class="facts"><caption>Details</caption>${rows}</table>
  <p style="margin-top:18px"><a class="btn" href="${p.group === 'Club merch' ? 'club-merch.html' : 'contact.html'}">${p.group === 'Club merch' ? 'How preorders work' : 'Tell me when it drops'}</a></p></aside>
</div>
</div>`, parent[1]);
}

// Plain pages
for (const key of ['about', 'contact', '404']) {
  const p = pages[key];
  layout(`${key}.html`, p.title, p.lead, `<div class="wrap">
${crumbs([['Store', './'], [p.title, '']])}
${head(p)}
<div class="page-body"><div class="prose">${p.body}</div></div>
</div>`, `${key}.html`);
}

console.log(`Built ${readdirSync('out').filter((f) => f.endsWith('.html')).length} pages into out/`);

// Old address from Nov 22, 2026: send it to the new page.
writeFileSync('out/club-drops.html', '<!DOCTYPE html><meta charset="UTF-8"><title>Club Merch</title><meta http-equiv="refresh" content="0; url=club-merch.html"><link rel="canonical" href="club-merch.html"><p><a href="club-merch.html">Club Merch moved here.</a></p>\n');
