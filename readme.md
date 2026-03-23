# Personal Website

Personal portfolio and blog for **Karthik Padmanabhan** — Principal Software Engineer and Game Developer.

**Live site**: [karthikpadmanabhan.com](https://karthikpadmanabhan.com)

---

## About

This repository contains the source for my personal portfolio site. It showcases my game development work, professional experience, and includes a blog covering topics like multiplayer netcode, procedural generation, Unity performance, VR simulations, and AI/ML in games.

---

## Stack

- **HTML5 / CSS3 / Vanilla JS** — no frameworks, no build tools
- **Jekyll** — used for the blog (`_posts/`, `_layouts/`)
- **GitHub Pages** — deployment (pushing to `master` deploys live)
- **Custom domain** via `CNAME`: `karthikpadmanabhan.com`

---

## Local Development

Serve with a static file server (required for `js/layout.js` to load — `file://` triggers CORS errors):

```bash
python3 -m http.server 8000
```

To preview the blog with Jekyll rendering:

```bash
bundle exec jekyll serve
```

---

## Project Structure

```
index.html          — portfolio (single page)
404.html            — custom 404 page
blog/index.html     — blog listing (Jekyll)
_posts/             — blog posts in Markdown
_layouts/post.html  — blog post template
css/apple.css       — source stylesheet (edit this)
css/apple.min.css   — minified (regenerate after CSS edits)
js/layout.js        — shared nav, footer, and interactions
img/                — portrait SVG, project images, blog SVGs, avatars
icons/              — favicons and app icons
manifest.json       — PWA manifest
_config.yml         — Jekyll configuration
CNAME               — custom domain
```

---

## CSS Workflow

Edit `css/apple.css`, then regenerate the minified version:

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

---

## Clone

```bash
git clone https://github.com/karlogin/Personal-Website.git
```
