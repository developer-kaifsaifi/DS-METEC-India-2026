# METEC India 2026

## Run locally

```sh
npm ci
npm run dev
```

## Deploy

- **GitHub Pages:** The workflow in `.github/workflows/deploy.yml` builds and deploys `main`. In repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.
- **Vercel:** Import the repository and use the Vite defaults: build command `npm run build`, output directory `dist`.
