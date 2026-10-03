# Manivel M — Portfolio

Personal portfolio for freelance Angular work, built with **Angular 21** (standalone components, signals, OnPush, new control flow, reactive forms).

## Run locally

```bash
npm install
npm start          # http://localhost:4200
```

## Edit content

All text lives in [`src/app/data/portfolio.data.ts`](src/app/data/portfolio.data.ts) — profile, stats, services, skills, experience, projects.

- **GitHub link:** set `PROFILE.github` to show the icon.
- **Contact form:** messages are sent with [EmailJS](https://www.emailjs.com) (`@emailjs/browser`, free 200/month). Until the three IDs below are set, the form falls back to opening the visitor's email client.
  1. **Email Services → Add Service → Gmail** — connect your inbox, copy the *Service ID*.
  2. **Email Templates → Create Template** — use the variables `{{name}}`, `{{email}}`, `{{type}}`, `{{message}}`, `{{mail_subject}}`, `{{submitted_date}}`, `{{submitted_time}}` (IST); set *Reply To* to `{{email}}`. Copy the *Template ID*.
  3. **Account → General** — copy the *Public Key*.
  4. Paste all three into `PROFILE.emailjs`, then commit and push.
- **Résumé:** replace `public/Manivel_Resume.pdf`.

## Structure

```
src/app/
  core/       theme service, scroll-reveal directive, icon component
  data/       portfolio content
  sections/   header, hero, about, services, skills, experience, projects, contact, footer
```

## SEO

- The page is **prerendered at build time** (`outputMode: "static"`), so search engines get the full HTML without running JavaScript.
- Meta tags, canonical URL, Open Graph / Twitter cards and JSON-LD structured data (Person, ProfessionalService, WebSite) live in [`src/index.html`](src/index.html).
- [`public/robots.txt`](public/robots.txt), [`public/sitemap.xml`](public/sitemap.xml), [`public/og-image.png`](public/og-image.png) (1200×630 share image), [`public/site.webmanifest`](public/site.webmanifest), [`public/404.html`](public/404.html).
- **Google Search Console:** add the property `https://manivel-mariyappan.github.io/`, choose the *HTML tag* method, paste the tag into `src/index.html` (placeholder comment is there), push, verify, then submit `sitemap.xml`. Use *URL Inspection → Request indexing* to speed up the first crawl.
- Update `<lastmod>` in `sitemap.xml` after big content changes.

## Deploy

Live at **https://manivel-mariyappan.github.io/**

Hosted free on GitHub Pages. Every push to `main` builds and deploys automatically via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) — just edit, commit and push.
