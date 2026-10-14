# SK Gold Jewels Makers – Website

Static bilingual (English / Tamil) site. No build step.

## Run locally
```
python3 -m http.server 8000
```
Open http://localhost:8000 (`?lang=ta` opens the Tamil version).

## Edit text
All copy is in `js/i18n.js` (`en` and `ta` must have the same keys). Have a native Tamil speaker proofread the `ta` block.

## Photos
Gallery photos are in `assets/images/` (`rings`, `bangles`, `murugan-ring`, `heart-pendant`, `ruby-necklace`, `bracelet`, all .jpg). To add one, put a ~1200px JPEG there and add a `<button class="thumb">` in `index.html` plus a caption key in `js/i18n.js`. Only use photos the owner owns.

## Before launch
- Once the domain is known, add `sitemap.xml` and canonical/OG URLs.
- Add geo coordinates to the JSON-LD in `index.html` once verified.
- Add the website URL to the Google Business Profile.

## Deploy
Netlify or GitHub Pages (publish the repo root).
