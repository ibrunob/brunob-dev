# brunob.dev

Personal portfolio — React + TypeScript + Vite + Tailwind CSS v4, deployed to
GitHub Pages at [brunob.dev](https://brunob.dev).

## Development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + build to dist/ + emit dist/404.html
npm run preview    # serve the production build
npm run typecheck
npm run lint
```

## Editing content

All copy lives in [`src/content/site.ts`](src/content/site.ts) — name, intro,
badges, projects, stack, timeline and links. Components read from it and never
hardcode content, so that is the only file to touch for a text change.

Anything still marked `TODO:` is placeholder scaffolding.

## Discoverability

`npm run build` also emits, all derived from `src/content/site.ts`:

- `sitemap.xml` and `robots.txt` (which explicitly welcomes answer-engine crawlers)
- `llms.txt`, a plain-language summary of the whole portfolio for AI search
- JSON-LD structured data (`Person` + `WebSite`) injected into the HTML

The page also registers five read-only [WebMCP](https://webmachinelearning.github.io/webmcp/)
tools on `document.modelContext`, so an agent in the browser can call
`list_projects` or `get_experience` rather than scraping the rendered text.

## Deploying

Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds the site and publishes `dist/` to GitHub Pages.

Two things keep the custom domain and deep links working:

- `public/CNAME` is copied into `dist/` on every build — without it Pages drops
  the `brunob.dev` domain.
- `scripts/copy-404.mjs` duplicates `index.html` as `404.html`, so hard-loading
  `/work` or `/about` boots the SPA instead of hitting a GitHub 404.

The repo's *Settings → Pages → Source* must be set to **GitHub Actions**.
