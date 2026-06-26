<p align="center">
  <img src="public/images/site-logo.webp" alt="MabEcare Foundation Logo" width="60px" height="auto" />
</p>

<h1 align="center">MabEcare Foundation</h1>

<p align="center">
  Official website for the MabEcare Foundation — empowering mothers, nurturing children, and building stronger communities across Ghana.
</p>

<p align="center">
  <a href="https://mabecare-foundation.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/live-mabecare--foundation.vercel.app-green" alt="Live Site" />
  </a>
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT License" />
  <img src="https://img.shields.io/badge/built%20with-Astro-FF5D01" alt="Built with Astro" />
  <img src="https://img.shields.io/badge/styled%20with-Tailwind%20CSS%20v4-38BDF8" alt="Tailwind CSS" />
</p>
- 🌐 [https://samuel-dorkey.vercel.app](https://samuel-dorkey.vercel.app)
- 🐙 [https://github.com/Sloane-J](https://github.com/Sloane-J)

## About the Foundation

MabEcare Foundation is a non-profit organisation based in Ho, Volta Region, Ghana. We are dedicated to supporting pregnant women, empowering mothers, and protecting children through healthcare, education, and community outreach. Our programmes serve families in underserved communities across Ghana, ensuring every mother and child has access to care, dignity, and opportunity.

### Our Programmes

- **Mother and Child Welfare Fund** — Basic needs support, home visits, and care packages for vulnerable mothers and children
- **Women Skills Training Programme** — Vocational training in baking, sewing, and soap making to help mothers earn sustainably
- **Children Outreach and Support** — Educational materials, nutritional support, and safe spaces for children in underserved communities
- **Blood Donation Drive** — Community blood drives ensuring safe supply for mothers and newborns in emergencies
- **Maternal Mental Health** — Counselling, peer support groups, and community-based care for postpartum depression and anxiety
- **Early Childhood Education** — Play-based learning for children aged 0–6 with trained caregivers and materials
- **Special Needs Children Welfare** — Adaptive care, therapy referrals, and advocacy for inclusive education and dignity

---

## Table of Contents

- [About the Foundation](#about-the-foundation)
- [Features](#features)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Available Commands](#available-commands)
- [Configuration](#configuration)
- [SEO](#seo)
- [Contact Form](#contact-form)
- [Deployment](#deployment)
- [Developer](#developer)

---

## Features

- 🚀 **Built with Astro** — Fast static site generation with minimal JavaScript
- ⚛️ **React Islands** — Interactive components where needed, static everywhere else
- 🎨 **shadcn/ui** — Accessible, composable UI components
- 📱 **Mobile First** — Fully responsive across all screen sizes
- 🌙 **Dark Mode** — System-aware theme with manual toggle
- ⚡ **Optimised Performance** — HTML compression, CSS minification, code splitting
- 🔍 **SEO Ready** — Structured data (JSON-LD), Open Graph, Twitter cards, sitemap, robots.txt
- 📧 **Contact Form** — Powered by Web3Forms, no backend required
- 🗺️ **Auto Sitemap** — Generated at build time via `@astrojs/sitemap`
- 📡 **RSS Feed** — Auto-generated for blog content
- 🔒 **TypeScript** — Full type safety throughout

---

## Project Structure

```text
mabecare-foundation/
├── public/                         # Static assets served as-is
│   ├── favicon/                    # Favicon files
│   ├── images/                     # Public images (logos, hero, OG image)
│   ├── robots.txt                  # Crawler rules
│   └── site.webmanifest            # PWA manifest
│
├── src/
│   ├── assets/                     # SVGs and processed assets
│   │
│   ├── components/
│   │   ├── blocks/                 # Page section components
│   │   │   ├── about-section/
│   │   │   ├── call-to-action/
│   │   │   ├── contact-us-section/
│   │   │   ├── donation-programmes-section/
│   │   │   ├── gallery-section/
│   │   │   ├── health-resources-section/
│   │   │   ├── hero-section/
│   │   │   ├── impact-metrics/
│   │   │   ├── results-section/
│   │   │   ├── volunteer-impact-section/
│   │   │   └── ways-to-help-section/
│   │   ├── ui/                     # Base shadcn/ui components
│   │   └── SmoothScroll.tsx        # Smooth scroll wrapper
│   │
│   ├── layouts/
│   │   ├── HeadSeo.astro           # SEO head (meta, OG, schema)
│   │   └── Layout.astro            # Main site layout
│   │
│   ├── pages/
│   │   ├── 404.astro               # Custom 404 page
│   │   ├── index.astro             # Homepage
│   │   ├── about-us.astro          # About Us page
│   │   ├── contact-us.astro        # Contact Us page
│   │   ├── donate.astro            # Donate page
│   │   └── rss.xml.js              # RSS feed generator
│   │
│   ├── styles/
│   │   └── global.css              # Global styles and Tailwind imports
│   │
│   └── consts.ts                   # Site-wide constants and SEO metadata
│
├── astro.config.mjs                # Astro + integrations config
├── content.config.ts               # Content collections config
├── .env.example                    # Environment variable template
├── components.json                 # shadcn/ui config
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript config
└── vercel.json                     # Vercel deployment config
```

---

## Quick Start

### Prerequisites

- Node.js 18, 20, or 22+
- pnpm (recommended)

### Installation

1. **Clone the repository:**

2. **Install dependencies:**

```bash
   pnpm install
```

3. **Set up environment variables:**

```bash
   cp .env.example .env
```

Fill in your values (see [Configuration](#configuration)).

4. **Start the development server:**

```bash
   pnpm run dev
```

The site will be available at `http://localhost:4321`

5. **Build for production:**

```bash
   pnpm run build
```

6. **Preview the production build:**

```bash
   pnpm run preview
```

> Always use `pnpm run preview` — not `pnpm run dev` — to check the sitemap and other build-only outputs.

---

## Available Commands

| Command                | Action                                                    |
| :--------------------- | :-------------------------------------------------------- |
| `pnpm run dev`         | Start local development server at `http://localhost:4321` |
| `pnpm run build`       | Build for production, output to `dist/`                   |
| `pnpm run preview`     | Preview the production build locally                      |
| `pnpm run lint`        | Run ESLint across the codebase                            |
| `pnpm run lint:fix`    | Run ESLint and auto-fix issues                            |
| `pnpm run format`      | Format all files with Prettier                            |
| `pnpm run check-types` | Run TypeScript type checking                              |

---

## Configuration

Edit `src/consts.ts` to update site-wide metadata:

```typescript
export const SITE_METADATA = {
  title: {
    default: 'MabEcare Foundation | Empowering Mothers & Children in Ghana'
  },
  description:
    'MabEcare Foundation supports pregnant women, empowers mothers, and protects children in Ghana through healthcare, education, blood donation drives, and community outreach.',
  siteUrl: 'https://mabecare-foundation.vercel.app/',
  locale: 'en_US',
  language: 'en-US',
  creator: 'Samuel Dorkey',
  publisher: 'MabEcare Foundation',
  twitter: {
    handle: '@mabecarefoundation'
  }
  // ... other fields
}
```

### Environment Variables

| Variable                    | Description                               |
| :-------------------------- | :---------------------------------------- |
| `VITE_WEB3FORMS_ACCESS_KEY` | Web3Forms access key for the contact form |

---

## SEO

The site is fully optimised for search engines:

- **Structured data** — JSON-LD schema on every page (`NGO`, `AboutPage`, `ContactPage`)
- **Open Graph** — Full OG tags for Facebook and LinkedIn sharing
- **Twitter cards** — `summary_large_image` card type
- **Sitemap** — Auto-generated at `/sitemap-index.xml` on build, submitted to Google Search Console
- **Robots.txt** — Located at `/public/robots.txt`, allows all crawlers
- **Canonical URLs** — Set on every page to prevent duplicate content

To verify the sitemap after a build:

```bash
pnpm run build && pnpm run preview
# Then visit: http://localhost:4321/sitemap-index.xml
```

---

## Contact Form

The contact form is powered by [Web3Forms](https://web3forms.com) — no backend or domain verification required. Form submissions are delivered directly to the foundation's inbox.

To set it up:

1. Go to [web3forms.com](https://web3forms.com) and enter the foundation's email
2. Copy the access key sent to that inbox
3. Add it to your `.env` file:

```bash
   VITE_WEB3FORMS_ACCESS_KEY=your-access-key-here
```

4. Add it to your Vercel environment variables under **Settings → Environment Variables**

Spam protection is handled via a honeypot field — no CAPTCHA friction for users.

---

## Deployment

The site is deployed on **Vercel** with automatic deployments on every push to `main`.

**Live URL:** [https://mabecare-foundation.vercel.app/](https://mabecare-foundation.vercel.app/)

To deploy manually, push to the `main` branch or run:

```bash
pnpm run build
# Upload contents of dist/ to any static host
```

The site works on any static hosting platform — Vercel, Netlify, Cloudflare Pages, or GitHub Pages.

> When the custom domain is ready, update `site` in `astro.config.mjs` and `siteUrl` in `src/consts.ts`, then redeploy.

---

## Developer

Built and maintained by **Samuel Dorkey**

- 🌐 [sloanedev.vercel.app](https://samuel-dorkey.vercel.app)
- 🐙 [github.com/Sloane-J](https://github.com/Sloane-J)

Built on top of the [shadcn/studio](https://shadcnstudio.com) Astro template.

---

© 2026 MabEcare Foundation. All rights reserved.
