# Advocate App

A multi-page website for advertising lawyer services, showcasing legal expertise across various fields of law. The site offers different forms of collaboration, from one-time consultations to client representation in courts of various instances. It also highlights successful case studies from practice and allows visitors to submit requests for feedback.

## Features

- 🏛️ Comprehensive information about legal services in various fields
- 💼 Multiple collaboration options, from consultations to court representation
- 📊 Showcase of successful case studies
- 📝 Contact form for client inquiries
- 🎨 Custom UI/UX design
- 🔍 SEO-friendly semantic markup
- 📱 Responsive design for all device types

## Technologies Used

- HTML
- SASS
- JavaScript
- jQuery
- PHP
- Parcel bundler

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine

### Installation

1. Clone this repository: `git clone https://github.com/AdvocateIgorTarasenko/advocateapp/`

2. Install dependencies: `npm install`

3. Start the local development server: `npm start`

4. Open your browser and navigate to [http://localhost:1234](http://localhost:1234)

## Deployment

### GitHub Pages Deployment

The production version of the project will be automatically built and deployed to GitHub Pages, in the `gh-pages` branch, each time the `main` branch is updated (e.g., after a direct push or an accepted pull request).

```json
 "homepage": "https://advocateigortarasenko.github.io/advocateapp/",
  "scripts": {
    "start": "parcel src/*.html",
    "build:cpanel": "parcel build src/*.html",
    "build": "parcel build src/*.html --public-url /advocatapp/"
  },
```

[Live Github URL page](https://advocateigortarasenko.github.io/advocateapp/)

### Building a Production Version

## Deploying to Host IQ

This application with the domain igor-tarasenko.com is hosted by HostIQ.

## Automated cPanel Deployment (main branch)

Pushes to `main` can be deployed automatically by GitHub Actions using the workflow in `.github/workflows/deploy-cpanel.yml`.

### Required GitHub Secrets

- `CPANEL_HOST`
- `CPANEL_USER`
- `CPANEL_SSH_KEY`
- `CPANEL_TARGET_PATH` (for this project: `/home2/igortar1/public_html`)

### Deployment behavior

- Builds project with `npm run build:cpanel`.
- Copies `dist/*` directly into `/public_html` (not into `/public_html/dist`).
- Also deploys `src/mail.php` and `src/phpmailer/**` without modifying PHP files.
- Uses selective cleanup for old build artifacts while preserving hosting system entries such as `.well-known`, `cgi-bin`, and `.htaccess`.

### Manual build for cPanel

Run this command locally if you need a manual artifact check before push:

```bash
npm run build:cpanel
```

Then confirm output in `dist/`.

## License

This project is open-source and available under the MIT License.

## Acknowledgments

- Parcel for the fast, zero configuration web application bundler
- HostIQ for reliable hosting services
