# Reppien & Cie — website

The public website of Reppien & Cie, St. Gallen (reppienandcie.ch). Plain static HTML, CSS and JavaScript — no build step, no frameworks, no cookies and no third-party requests.

## Files
| Path | Content |
|---|---|
| `index.html` + `<page>/index.html` | One folder per page, same URLs as before (`/what-we-do/`, `/our-people/` …) |
| `kode/styles.css` | All styling; colours, fonts and spacing are variables in `:root` |
| `kode/site.js` | Menu, dropdown, fade-in, scroll-to-top, year in footer, mailto contact form |
| `assets/` | Logo, favicon, images (webp) and self-hosted fonts (Lato, Playfair Display — SIL Open Font License) |
| `404.html`, `sitemap.xml`, `robots.txt`, `CNAME` | GitHub Pages plumbing |

## Editing
- Text is edited directly in the page's `index.html`. Header and footer are repeated in every page — change all of them together.
- When `styles.css` or `site.js` changes, bump the `?v=` value in every page so visitors get the new file.
- Open any `index.html` in a browser to preview; no server needed.

## Hosting
Served by GitHub Pages from the `main` branch (root). The domain is set in `CNAME`.
