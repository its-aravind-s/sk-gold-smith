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

## Animations
`js/anim.js` is a GSAP layer (GSAP 3.12.5 + ScrollTrigger from cdnjs): hero word-by-word headline with gold shimmer, spinning logo ring and sparkles, scroll progress bar, scroll reveals, count-up numbers, gallery pop-in and a pulsing WhatsApp button. It is optional: if the CDN is blocked or the visitor prefers reduced motion it exits and the site works as plain HTML. To avoid the CDN, download both files into `js/` and change the two `<script>` URLs in `index.html`. The lightbox (prev/next, swipe, arrow keys) lives in `js/main.js`.

## Before launch
- Once the domain is known, add `sitemap.xml` and canonical/OG URLs.
- Add geo coordinates to the JSON-LD in `index.html` once verified.
- Add the website URL to the Google Business Profile.

## Deploy
Netlify or GitHub Pages (publish the repo root).

## Images
`assets/images/logo.png` (hero, circular crop) and `owner.jpg` (About section) are the brand images. Originals are not kept in the repo.
