// Runs after `vite build`. Everything it emits is derived from
// src/content/site.ts, so the crawlable metadata cannot drift from the page.
//
//   1. dist/sitemap.xml
//   2. dist/llms.txt   the plain-language summary answer engines read
//   3. JSON-LD injected into index.html
//   4. dist/404.html   GitHub Pages serves it for unknown paths, which is what
//                      lets the SPA resolve a deep link on a hard refresh
import { readFileSync, writeFileSync, copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { site, nav } from '../src/content/site.ts'

const dist = resolve(import.meta.dirname, '..', 'dist')
const origin = site.url.replace(/\/$/, '')
const today = new Date().toISOString().slice(0, 10)
const routes = nav.map((item) => item.href)

/** `**...**` marks emphasis for the page; it means nothing to a crawler. */
const plain = (text) => text.replace(/\*\*/g, '')

// ---------------------------------------------------------------- sitemap
const urls = routes
  .map(
    (route) =>
      [
        '  <url>',
        `    <loc>${origin}${route}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        `    <priority>${route === '/' ? '1.0' : '0.8'}</priority>`,
        '  </url>',
      ].join('\n'),
  )
  .join('\n')

writeFileSync(
  resolve(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
  'utf8',
)

// ---------------------------------------------------------------- llms.txt
const projectLine = (project) => {
  const link = project.demo ?? project.repo
  const title = link ? `[${project.title}](${link})` : project.title
  const tags = project.tags.join(', ')
  return `- **${title}** (${project.year}, ${tags}): ${plain(project.description)}`
}

writeFileSync(
  resolve(dist, 'llms.txt'),
  `# ${site.name}

> ${plain(site.intro)}

${site.meta.map((m) => `${m.label}: ${m.value}`).join('. ')}.

## About

${site.about.map(plain).join('\n\n')}

## Projects

${site.projects.map(projectLine).join('\n')}

## Experience and education

${site.timeline
  .map((e) => `- **${e.title}**, ${e.organisation} (${e.period}): ${plain(e.description)}`)
  .join('\n')}

## Stack

${site.stack.map((g) => `- **${g.label}**: ${g.items.join(', ')}`).join('\n')}

## Contact

- Email: ${site.email}
${site.social.map((s) => `- ${s.label}: ${s.href}`).join('\n')}

## Pages

${nav.map((n) => `- [${n.label}](${origin}${n.href})`).join('\n')}
`,
  'utf8',
)

// ---------------------------------------------------------------- JSON-LD
const education = site.timeline.filter((entry) => entry.kind === 'education')
const work = site.timeline.filter((entry) => entry.kind === 'work')

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${origin}/#person`,
      name: site.name,
      alternateName: site.shortName,
      url: origin,
      jobTitle: site.role,
      email: `mailto:${site.email}`,
      description: plain(site.intro),
      address: {
        '@type': 'PostalAddress',
        addressLocality: (site.meta[0]?.value ?? '').split(',')[0].trim(),
        addressCountry: 'ES',
      },
      alumniOf: education.map((entry) => ({
        '@type': 'EducationalOrganization',
        name: entry.organisation,
      })),
      worksFor: work.map((entry) => ({
        '@type': 'Organization',
        name: entry.organisation,
      })),
      knowsAbout: [...new Set(site.stack.flatMap((group) => group.items))],
      sameAs: site.social.map((link) => link.href),
    },
    {
      '@type': 'WebSite',
      '@id': `${origin}/#website`,
      url: origin,
      name: `${site.name} portfolio`,
      inLanguage: 'en',
      author: { '@id': `${origin}/#person` },
    },
  ],
}

const indexPath = resolve(dist, 'index.html')
let html = readFileSync(indexPath, 'utf8')
if (!html.includes('application/ld+json')) {
  const tag = `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
  html = html.replace('</head>', `  ${tag}\n  </head>`)
  writeFileSync(indexPath, html, 'utf8')
}

// 404.html is a copy of the finished index.html, structured data included.
copyFileSync(indexPath, resolve(dist, '404.html'))

console.log(
  `postbuild: sitemap (${routes.length} urls), llms.txt, JSON-LD, 404.html`,
)
