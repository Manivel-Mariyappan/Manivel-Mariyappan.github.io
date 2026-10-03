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

## Deploy

Live at **https://manivel-mariyappan.github.io/**

Hosted free on GitHub Pages. Every push to `main` builds and deploys automatically via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) — just edit, commit and push.
