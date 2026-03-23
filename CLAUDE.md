# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static personal portfolio website for Karthik Padmanabhan, deployed via GitHub Pages at [karthikpadmanabhan.com](https://karthikpadmanabhan.com). Built with plain HTML5, CSS3, and JavaScript — no framework, no build system, no package manager. Includes a Jekyll-powered blog for articles.

## Technology Stack

- **HTML5** — semantic markup, no frameworks
- **CSS3** — Grid, Flexbox, backdrop filters, keyframe animations, responsive design
- **Vanilla JavaScript** — single IIFE in `js/layout.js`, no dependencies
- **Jekyll** — used only for the blog (`_posts/`, `_layouts/`, `blog/index.html`)
- **GitHub Pages** — deployment target (pushing to `master` triggers live deploy)
- **Google Analytics** — GA4 (tag ID: `G-FV5T4XKX3P`) included in `index.html`

## Development

**To preview locally**, serve with a static file server (required — `file://` won't load `js/layout.js` due to CORS):

```bash
python3 -m http.server 8000
```

**To preview the blog locally** (requires Jekyll for Liquid templating):

```bash
bundle exec jekyll serve
```

There are no tests, no linting tools, and no CI beyond GitHub Pages deployment.

## File Structure

```
index.html              — entire portfolio (single page)
404.html                — custom 404 page with animations
blog/
  index.html            — blog listing (Jekyll Liquid templating)
_layouts/
  post.html             — Jekyll template for individual blog posts
_posts/                 — blog posts as Markdown with YAML frontmatter
css/
  apple.css             — source stylesheet (edit this)
  apple.min.css         — minified version (loaded by HTML; regenerate after edits)
js/
  layout.js             — shared nav, footer, scroll behaviour, Connect dropdown
img/
  portrait.svg          — hero dot-matrix SVG animation (248 KB)
  projects/             — project images (.jpg originals + .webp optimised)
  blog/                 — blog post images (SVG diagrams/illustrations)
  avatars/              — testimonial author photos (named by initials, e.g. am.jpg)
icons/
  favicons/             — per-company favicons used in the experience timeline
  apple-touch-icon-*.png — Apple app icons (57×57 to 180×180)
  android-icon-*.png    — Android icons (144×144, 192×192)
  favicon-*.png         — Standard favicons (16×16, 32×32, 96×96)
manifest.json           — PWA web app manifest
CNAME                   — custom domain: karthikpadmanabhan.com
_config.yml             — Jekyll config (permalink, excludes, site metadata)
Gemfile / Gemfile.lock  — Ruby deps for local Jekyll preview
sitemap.xml             — SEO sitemap
local/                  — local-only assets, not served by the site
```

## CSS Architecture

Single stylesheet with a minified counterpart:

- `css/apple.css` — source (1400+ lines); edit this file
- `css/apple.min.css` — minified; loaded by `index.html`, `404.html`, and `blog/index.html`

**After editing `apple.css`, always regenerate the minified file:**

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

### Naming Convention

All classes use the `ap-` prefix (Apple-inspired design system). Key namespaces:

| Prefix | Purpose |
|---|---|
| `ap-nav-*` | Navigation bar, dropdown, scroll states |
| `ap-hero-*` | Hero/banner section |
| `ap-section-*` | Page section wrappers (`.ap-section-dark`, `.ap-section-gray`) |
| `ap-card-*` | Project cards and grid |
| `ap-timeline-*` | Experience horizontal timeline |
| `ap-testimonial-*` | Testimonial quote cards |
| `ap-btn`, `ap-btn-ghost` | CTA buttons |
| `ap-post-*` | Blog post layout and typography |
| `ap-bio`, `ap-skills-*`, `ap-skill-tag` | About/skills area |
| `ap-footer-*` | Footer, social icons |

### Design Tokens

- **Primary blue**: `#2997ff` / `#0071e3`
- **Dark background**: `#000`
- **Light background**: `#f5f5f7`, `#fff`
- **Body text (dark)**: `#1d1d1f`
- **Body text (light)**: `#f5f5f7`
- **Muted text**: `#6e6e73`, `#aeaeb2`
- **Font stack**: `-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif`
- **Base font size**: 17px / line-height 1.47

### Responsive Breakpoints

| Max-width | Target |
|---|---|
| 1000px | Large desktop adjustments |
| 900px | Tablet landscape |
| 860px | Large tablet |
| 600px | Mobile (padding → 20px) |
| 560px | Small mobile |

## Shared Layout (Nav + Footer)

The nav and footer are defined once in `js/layout.js` and injected at runtime:

```html
<nav class="ap-nav" id="ap-nav"></nav>
...
<footer class="ap-footer" id="ap-footer"></footer>
<script src="js/layout.js"></script>
```

**To update nav or footer, only edit `js/layout.js`** — changes apply to all pages automatically.

`layout.js` also handles:
- **Path-aware nav links**: homepage uses `#about`/`#projects`; subpages use `/#about`/`/#projects`
- **Scroll behaviour**: toggles `.scrolled` class on `<nav>` at 60px scroll depth (changes background from dark glassmorphic to light)
- **Connect dropdown**: GitHub, LinkedIn, Email links; click-outside-to-close with `aria-expanded` management
- **Footer copyright year**: uses `new Date().getFullYear()` — no manual update needed

## Blog

The blog uses Jekyll for Markdown rendering. Posts live in `_posts/` with YAML frontmatter.

**Frontmatter schema for blog posts:**

```yaml
---
layout: post
title: "Post Title"
date: YYYY-MM-DD
excerpt: "Short description for listing page."
hero_image: /img/blog/hero-image.svg   # optional
---
```

- The layout template is `_layouts/post.html`
- Blog images go in `img/blog/` as SVG files
- `blog/index.html` uses Jekyll Liquid (`{% for post in site.posts %}`) — requires Jekyll to render
- Jekyll permalink format: `/blog/YYYY/MM/DD/title/` (set in `_config.yml`)
- Reading time is computed by an inline JS snippet in `_layouts/post.html`

## Images

- **Project images**: stored as both `.jpg` (original) and `.webp` (optimised) in `img/projects/`
  - HTML references `.webp` with `loading="lazy"` on all below-fold images
  - To convert: `cwebp -q 82 input.jpg -o output.webp`
- **Blog images**: SVG format only, stored in `img/blog/`, named descriptively (e.g. `mcp-layers.svg`)
- **Avatars**: JPEG, named by author initials (e.g. `am.jpg`), in `img/avatars/`
- **Hero portrait**: `img/portrait.svg` — dot-matrix SVG animation, 248 KB
- **Company favicons**: PNG icons in `icons/favicons/`, used in the experience timeline section

## index.html Sections (in order)

1. **Hero** — dot-matrix portrait, gradient headline, subtitle, scroll arrow
2. **About** — biography text, skills grouped by category (Languages & Engine, Game Development, Specializations, Platforms, Leadership, Tools)
3. **Experience** — horizontal scrollable timeline with company, role, dates, location
4. **Projects** — grouped project cards in a 2-column grid
5. **Testimonials** — quote cards with avatars and author links
6. **Contact** — CTA section with buttons
7. **Footer** — social links (GitHub, LinkedIn, Email), dynamic copyright year

## Key Conventions

- **No build tools**: no npm, webpack, babel, or similar — keep it that way
- **No inline styles** on `index.html` or `404.html` (except 404's own animation; blog post layout uses some inline styles)
- **WebP images only in HTML** — keep `.jpg` originals locally but reference `.webp` in markup
- **Edit `apple.css`, never `apple.min.css` directly** — always regenerate after changes
- **Edit `layout.js` for nav/footer** — never duplicate nav/footer HTML across pages
- **Jekyll is only for blog** — `index.html` and `404.html` are plain HTML, not Jekyll templates
- **Deployment is automatic**: pushing to `master` deploys to GitHub Pages; no staging environment
- **Google Analytics tag** is in the `<head>` of `index.html`; do not duplicate it
