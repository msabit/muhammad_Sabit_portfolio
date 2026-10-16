<h1 align="center">Muhammad Sabit Portfolio</h1>

Personal portfolio of Muhammad Sabit, Senior React Native developer. Live at
https://msabit.github.io/muhammad_Sabit_portfolio/

Built with React 18, Vite and Tailwind CSS.

## Run locally

```bash
git clone https://github.com/msabit/muhammad_Sabit_portfolio.git
cd muhammad_Sabit_portfolio
npm install
npm run dev
```

## Scripts

| Command           | What it does                                 |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start the dev server                         |
| `npm run build`   | Production build to `dist/`                  |
| `npm run preview` | Serve the production build locally           |
| `npm run lint`    | Run ESLint                                   |
| `npm test`        | Run unit tests (Vitest)                      |
| `npm run test:e2e` | Browser smoke tests on the built site (Playwright); run `npm run build` first |
| `npm run deploy`  | Build and publish `dist/` to GitHub Pages    |

## Pre-rendering

`npm run build` renders the page to static HTML at build time
(`src/entry-server.jsx` + `scripts/prerender.js`), and the browser hydrates it. The page
paints before JavaScript loads and reads fine with JavaScript off. Components must not
read `window`, `document` or `localStorage` while rendering: do that in effects.

## Deploying

Every push to `main` runs lint, unit tests, the build and browser smoke tests on
GitHub Actions, then publishes
`dist/` to the `gh-pages` branch (`.github/workflows/deploy.yml`). Pull requests get the
same checks without deploying. `npm run deploy` still works as a manual fallback.

## Contact form

Copy `.env.example` to `.env.local` and set `VITE_WEB3FORMS_KEY` to a free key from
[web3forms.com](https://web3forms.com). Without a key the form falls back to opening the
visitor's email app with the message filled in. The key is public by design: it only lets
the form send to your inbox. For the automatic deploy, add the same key as a repository
secret named `VITE_WEB3FORMS_KEY` (Settings → Secrets and variables → Actions).

## Editing content

All copy lives in `src/data/portfolio.js`: profile, stats, about, experience, education,
skills and projects.

- Projects: set `href: null` for apps without a public listing. Cards draw a monogram
  tile; add `imageSrc` (plus `contain: true` for a logo) to show real artwork instead.
- The project filter is shareable: `?filter=health#projects`.
- Images live in `src/assets/` as WebP; the social preview image is `public/og-image.jpg`.
