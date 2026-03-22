# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static personal portfolio website for Karthik Padmanabhan, deployed via GitHub Pages at [karthikpadmanabhan.com](https://karthikpadmanabhan.com). Built with plain HTML5, CSS3, and JavaScript — no framework, no build system, no package manager.

## Development

**To preview locally**, open `index.html` directly in a browser, or serve it with any static file server:

```bash
python3 -m http.server 8000
```

There are no tests, no linting tools, and no CI beyond GitHub Pages deployment (pushing to `master` triggers a live deploy).

## CSS Architecture

There are two CSS files, each with a corresponding minified version:

- [css/style.css](css/style.css) — layout, typography, spacing, responsive breakpoints
- [css/theme.css](css/theme.css) — colors only, using CSS custom properties defined in `:root`

**Important:** `index.html` loads the `.min.css` versions (`style.min.css`, `theme.min.css`). After editing the source CSS files, the minified files must be updated manually. Use any CSS minifier (e.g., `npx csso-cli`, an online tool, or the VSCode minify extension) and overwrite the corresponding `.min.css` file.

Brand-colored links use semantic class names like `.brand-nw`, `.brand-yt`, `.brand-ad`, `.brand-tw`, `.brand-li`, etc. — all defined as CSS variables in `theme.css`.

## File Structure

- `index.html` — entire site content (single page)
- `404.html` / `404.md` — custom 404 page
- `css/` — source and minified stylesheets
- `js/` — jQuery, unorphanize plugin, Google Analytics helper (source + minified)
- `icons/` — favicons and app icons for all platforms
- `manifest.json` — PWA web app manifest
- `CNAME` — custom domain configuration for GitHub Pages
- `_config.yml` — Jekyll config (only sets `jekyll-theme-cayman`; the actual site bypasses Jekyll layouts via plain HTML)
- `local/` — local-only image assets, not served by the site
