# SK Gold Jewels Makers – Website

Static bilingual (English / Tamil) site. No build step.

## Run locally
```
python3 -m http.server 8000
```
Open http://localhost:8000 (`?lang=ta` opens the Tamil version).

## Edit text
All copy is in `js/i18n.js` (`en` and `ta` must have the same keys). Have a native Tamil speaker proofread the `ta` block.

## Replace photos
Swap the placeholder SVGs in `assets/images/` (keep names or update `index.html`):
- `hero.svg` – 1200×800 shop/jewellery hero
- `owner.svg` – 800×800 portrait of Suresh Kumar
- `g1`–`g6` – 800×800 gallery photos (ring, chain, earrings, bangles, necklace, pendant)

Only use photos the owner owns or has permission to use.

## Before launch
- Once the domain is known, add `sitemap.xml` and canonical/OG URLs.
- Add geo coordinates to the JSON-LD in `index.html` once verified.
- Add the website URL to the Google Business Profile.

## Deploy
Netlify or GitHub Pages (publish the repo root).
