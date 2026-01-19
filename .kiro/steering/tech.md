# Technology Stack

## Core Technologies

- **HTML5**: Semantic markup with single-page structure
- **CSS3**: Custom styling with responsive design
- **JavaScript**: jQuery-based interactions
- **Jekyll**: Static site generation (GitHub Pages compatible)

## Libraries & Dependencies

- **jQuery**: DOM manipulation and event handling
- **jquery-unorphanize**: Typography plugin to prevent orphaned words
- **Google Analytics**: User tracking and analytics (gtag.js)

## Build System

No build system or package manager. This is a static site with:
- Minified versions of CSS/JS files maintained manually
- Direct file serving without compilation
- Jekyll theme configuration via `_config.yml`

## Hosting & Deployment

- **Primary**: Custom domain (karthikpadmanabhan.com)
- **Secondary**: GitHub Pages (karlogin.github.io/Personal-Website/)
- Static file hosting with no server-side processing

## File Conventions

- Minified files use `.min.css` and `.min.js` extensions
- Both full and minified versions are maintained
- HTML references minified versions in production

## Common Commands

Since this is a static site with no build process:

```bash
# No build commands needed
# Files are edited directly and deployed as-is

# For local testing with Jekyll (if needed):
jekyll serve

# For GitHub Pages deployment:
git push origin main
```

## Browser Support

Modern browsers with focus on mobile responsiveness. Breakpoints at 800px and 500px for responsive design.
