# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static personal portfolio website for Karthik Padmanabhan, deployed via GitHub Pages at [karthikpadmanabhan.com](https://karthikpadmanabhan.com). Built with plain HTML5, CSS3, and JavaScript — no framework, no build system, no package manager.

## Development

**To preview locally**, serve it with a static file server (required — `file://` won't load `js/layout.js` due to CORS):

```bash
python3 -m http.server 8000
```

There are no tests, no linting tools, and no CI beyond GitHub Pages deployment (pushing to `master` triggers a live deploy).

## CSS Architecture

Single stylesheet with a corresponding minified version:

- [css/apple.css](css/apple.css) — all styles: layout, typography, spacing, colors, responsive breakpoints
- [css/apple.min.css](css/apple.min.css) — minified version loaded by HTML files

**Important:** `index.html` and `404.html` load `apple.min.css`. After editing `apple.css`, regenerate the minified file:

```bash
python3 -c "
import re
css = open('css/apple.css').read()
css = re.sub(r'/\*.*?\*/', '', css, flags=re.DOTALL)
css = re.sub(r'\s+', ' ', css)
css = re.sub(r'\s*([{};:,>~+])\s*', r'\1', css)
css = re.sub(r';}', '}', css)
open('css/apple.min.css', 'w').write(css.strip())
"
```

## Shared Layout (Nav + Footer)

The nav and footer are defined once in [js/layout.js](js/layout.js) and injected into empty placeholder elements at runtime:

```html
<nav class="ap-nav" id="ap-nav"></nav>
...
<footer class="ap-footer" id="ap-footer"></footer>
<script src="js/layout.js"></script>
```

`layout.js` also handles nav scroll behaviour and the Connect dropdown. To update the nav or footer, **only edit `js/layout.js`** — changes apply to all pages automatically.

Nav links are path-aware: on the homepage they use `#about`/`#projects`; on other pages they use `/#about`/`/#projects`.

## Images

- Project images are stored as both `.jpg` (originals) and `.webp` (optimised) in `img/projects/`
- HTML references `.webp` versions with `loading="lazy"` on all below-fold images
- The hero portrait is `img/portrait.svg` — an SVG dot-matrix animation (248 KB)
- To convert new images to WebP: `cwebp -q 82 input.jpg -o output.webp`

## File Structure

- `index.html` — entire site content (single page)
- `404.html` — custom 404 page
- `css/apple.css` — source stylesheet
- `css/apple.min.css` — minified stylesheet (loaded by HTML)
- `js/layout.js` — shared nav, footer, and common JS behaviours
- `img/portrait.svg` — hero dot-matrix portrait
- `img/projects/` — project images (jpg originals + webp)
- `img/avatars/` — testimonial profile photos
- `icons/` — favicons and app icons
- `manifest.json` — PWA web app manifest
- `CNAME` — custom domain configuration for GitHub Pages
- `_config.yml` — Jekyll config (only sets `jekyll-theme-cayman`; the actual site bypasses Jekyll layouts via plain HTML)
- `local/` — local-only image assets, not served by the site
