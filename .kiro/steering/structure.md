# Project Structure

## Root Files

- `index.html`: Main single-page application entry point
- `404.html` / `404.md`: Custom error page
- `manifest.json`: PWA manifest for mobile app-like experience
- `sitemap.xml`: SEO sitemap
- `_config.yml`: Jekyll configuration for GitHub Pages
- `CNAME`: Custom domain configuration
- `favicon.ico`: Site favicon

## Directory Organization

### `/css/`
Stylesheets with both full and minified versions:
- `style.css` / `style.min.css`: Main layout and component styles
- `theme.css` / `theme.min.css`: Color scheme and theming

### `/js/`
JavaScript files with both full and minified versions:
- `jquery.js` / `jquery.min.js`: jQuery library
- `unorphanize.js` / `unorphanize.min.js`: Typography plugin
- `googletagmanager.js` / `googletagmanager.min.js`: Analytics

### `/icons/`
Complete icon set for multiple platforms:
- Apple touch icons (various sizes)
- Android icons (various densities)
- Favicons (multiple sizes)
- MS tile icons
- `browserconfig.xml`: Browser configuration

### `/local/Images/`
Local image assets:
- Background images
- SVG graphics

### `/.kiro/`
Kiro AI assistant configuration:
- `/steering/`: AI guidance documents

### `/.vscode/`
VS Code workspace settings

### `/.git/`
Git version control

## File Naming Conventions

- Minified files: `.min.css`, `.min.js` suffix
- Icons: Platform-specific naming (e.g., `apple-icon-{size}.png`)
- Lowercase with hyphens for multi-word files

## HTML Structure

Single-page layout with semantic sections:
- `<header>`: Navigation bar with name and links
- `<content>`: Main portfolio content with projects and skills
- `<footer>`: Social icons and copyright

## CSS Architecture

- Mobile-first responsive design
- Media queries at 800px and 500px breakpoints
- Utility classes (`.left`, `.right`, `.caps`, `.clear`)
- Component-specific classes (`.container-*`, `.nav`, `.button`)
- Theme colors defined in `theme.css`

## Asset References

All assets referenced with relative paths from root:
- CSS: `css/style.min.css`
- JS: `./js/jquery.min.js`
- Icons: `./icons/favicon.ico`
- Images: `./local/Images/background.png`
