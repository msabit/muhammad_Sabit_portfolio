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
| `npm run deploy`  | Build and publish `dist/` to GitHub Pages    |

## Contact form

Copy `.env.example` to `.env.local` and set `VITE_WEB3FORMS_KEY` to a free key from
[web3forms.com](https://web3forms.com). Without a key the form falls back to opening the
visitor's email app with the message filled in. The key is public by design: it only lets
the form send to your inbox.

## Editing content

All copy lives in `src/data/portfolio.js`: profile, stats, about, experience, education,
skills and projects.

- Projects: set `href: null` for apps without a public listing. Cards draw a monogram
  tile; add `imageSrc` (plus `contain: true` for a logo) to show real artwork instead.
- The project filter is shareable: `?filter=health#projects`.
- Images live in `src/assets/` as WebP; the social preview image is `public/og-image.jpg`.
