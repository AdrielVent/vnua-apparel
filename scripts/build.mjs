// The site is plain HTML in site/. The GitHub Pages workflow runs `npm ci && npm run build`
// and uploads out/, so "building" is just copying site/ to out/.
import { cpSync, rmSync } from 'node:fs';

rmSync('out', { recursive: true, force: true });
cpSync('site', 'out', { recursive: true });
console.log('Copied site/ to out/');
