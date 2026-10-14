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
Gallery photos live in `assets/images/` (~1200px JPEGs). To add one: drop the file there, add a `<button class="thumb" data-cat="rings|necklaces|pendants|bangles">` in the gallery section of `index.html`, and add its caption key to both `en` and `ta` in `js/i18n.js`. The gallery shows the first 9 under "All" with a View more button. Only use photos the owner owns.

## Before launch
- Once the domain is known, add `sitemap.xml` and canonical/OG URLs.
- Add geo coordinates to the JSON-LD in `index.html` once verified.
- Add the website URL to the Google Business Profile.

## Deploy
Netlify or GitHub Pages (publish the repo root).

## Images
`assets/images/logo.png` (hero, circular crop) and `owner.jpg` (About section) are the brand images. Originals are not kept in the repo.
