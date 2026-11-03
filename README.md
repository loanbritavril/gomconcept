# Dear Solé

Static bilingual ceramics website, hosted on GitHub Pages.

## Update content

- `assets/products.js`: product data and SVG placeholders.
- `templates/base.html`: shared navigation, branding, footer and product dialog.
- `scripts/build_site.py`: page content, category membership and sitemap generation.
- `assets/style.css` and `assets/app.js`: presentation and interactions.

After editing products, the template or page content, run:

```sh
python3 scripts/build_site.py
```

Commit the generated HTML pages and `sitemap.xml` along with source changes. Preview with `python3 -m http.server 8000`.

The Small objects and One of a kind pages deliberately show empty states until their inventory and imagery are supplied. Current email and Instagram links are retained from the original website.
