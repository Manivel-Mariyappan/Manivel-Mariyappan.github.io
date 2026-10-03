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
- **Contact form:** create a free form at <https://formspree.io>, then paste its ID into `PROFILE.formspreeId`. Without it, the form opens the visitor's email client.
- **Résumé:** replace `public/Manivel_Resume.pdf`.

## Structure

```
src/app/
  core/       theme service, scroll-reveal directive, icon component
  data/       portfolio content
  sections/   header, hero, about, services, skills, experience, projects, contact, footer
```

## Deploy

Live at **https://manivel-mariyappan.github.io/**

Hosted free on GitHub Pages. Every push to `main` builds and deploys automatically via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) — just edit, commit and push.
