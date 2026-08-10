# Moore Bonsai — Version 3.5

## GitHub Pages / static CMS-style website

This version is deliberately **100% static** so it can be hosted free with GitHub Pages.

There is:
- no Node.js server
- no database
- no paid hosting requirement
- no admin server
- no backend

### How the "static CMS" works

Products live in `/products/*.json`.

Journal articles live in `/journal/*.json`.

The website JavaScript automatically loads these files and creates:
- product cards
- filters
- individual product views
- journal cards
- individual journal articles

This means you can maintain the content from GitHub without editing the main HTML.

### Add a new bonsai

1. Copy an existing JSON file in `/products`.
2. Rename it.
3. Edit its fields.
4. Add your photograph to `/images/products/`.
5. Change the `image` path in the JSON.
6. Add the new JSON filename to `productFiles` in `/js/app.js`.
7. Commit the changes to GitHub.

GitHub Pages will publish the updated site.

### Add a new journal article

1. Copy a JSON file in `/journal`.
2. Rename it.
3. Edit the title, date, excerpt, content and SEO fields.
4. Add the photograph.
5. Add the filename to `postFiles` in `/js/app.js`.
6. Commit and push.

### Important limitation

Because this is static, it does **not** have a web-based CMS dashboard. GitHub is the content-management interface.

### Images

The supplied image files are deliberately placeholders. Replace them with your own bonsai photographs.

### Contact form

The contact page currently uses a placeholder `mailto:` action. Replace `YOUR-EMAIL-HERE` with your real email address.

For a more reliable contact form without paying for hosting, use a free form provider or a serverless form service.

### GitHub Pages setup

In your repository:
1. Upload these files.
2. Commit to your main branch.
3. Open Settings → Pages.
4. Select Deploy from a branch.
5. Choose `main` and `/ (root)`.
6. Save.
7. GitHub will provide the free `github.io` website address.

### Before launch

Replace:
- placeholder images
- placeholder email
- GitHub username/repository in `sitemap.xml` and `robots.txt`
- sample products
- sample journal articles
- business details
- social links

Also add your legal/business pages as appropriate for UK ecommerce: privacy notice, cookies, terms, delivery, returns/refunds and any other information required for your selling model.

### SEO

This version includes:
- page titles
- meta descriptions
- canonical links
- Open Graph metadata
- robots.txt
- sitemap.xml
- semantic headings
- descriptive URLs where practical
- image alt text
- product structured data on individual product views

Version 3.5.1 now creates separate static HTML pages for the supplied products and journal articles, improving crawlability and SEO.


## Version 3.5.1 SEO upgrade

Important product and journal pages are now generated as real static HTML:
- `/products/<slug>/index.html`
- `/journal/<slug>/index.html`

Each page contains its own:
- title
- meta description
- canonical URL
- Open Graph metadata
- image alt text
- Schema.org structured data

This means Google can crawl individual tree and article pages directly without depending on JavaScript to create the page.

When adding a new product or article, create the JSON file as before and generate its corresponding static page before publishing. For the simplest workflow, keep a local copy of the repository and use the included generation workflow described in the project notes.


## Version 3.5.2 fixes
- Fixed CSS/JavaScript paths on nested product and journal pages.
- Replaced the demo image files that had SVG content saved with a `.jpg` extension. Demo artwork is now valid `.svg`.
- Product detail pages have a darker forest/khaki/grey palette, breadcrumbs and information cards.
- Replace demo `.svg` files with your own real `.jpg`, `.jpeg`, `.png` or `.webp` photographs and update each JSON `image` field accordingly.
