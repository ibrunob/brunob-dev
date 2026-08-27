// Renders public/og.png, the 1200x630 card that social platforms and answer
// engines show when the site is linked.
//
// Run it by hand with `npm run og` after changing the name, role or palette.
// It is not part of `npm run build`: the output is a committed asset, and the
// build should not need a native rasteriser.
//
// Inter ships as woff2 only, which resvg cannot read, so the weights are
// decompressed to TTF in a temp dir first.
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { resolve, join } from 'node:path'
import { Resvg } from '@resvg/resvg-js'
import { decompress } from 'wawoff2'
import { site } from '../src/content/site.ts'

const root = resolve(import.meta.dirname, '..')
const work = mkdtempSync(join(tmpdir(), 'og-fonts-'))

/** woff2 -> ttf, because resvg only reads TTF/OTF. */
async function ttf(name) {
  const source = readFileSync(resolve(root, 'node_modules/inter-ui/web', `${name}.woff2`))
  const out = join(work, `${name}.ttf`)
  writeFileSync(out, Buffer.from(await decompress(source)))
  return out
}

const fontFiles = [await ttf('Inter-Regular'), await ttf('Inter-SemiBold')]

// Palette lifted from the light theme in globals.css.
const bg = '#fafafa'
const fg = '#18181b'
const muted = '#71717a'
const border = '#e4e4e7'
const ink = '#ff5100'

const escape = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const location = site.meta.find((m) => m.label === 'Based in')?.value ?? ''
const host = site.url.replace(/^https?:\/\//, '').replace(/\/$/, '')

// The marker stroke under the surname echoes the highlight used in the copy.
// Tilted the same 1.8 degrees, drawn behind the text.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${bg}"/>

  <g transform="rotate(-1.8 284 310)">
    <rect x="88" y="284" width="392" height="50" rx="9" fill="${ink}" opacity="0.38"/>
  </g>

  <text x="96" y="250" font-family="Inter" font-weight="600" font-size="86" fill="${fg}">${escape(site.name)}</text>
  <text x="96" y="322" font-family="Inter" font-weight="400" font-size="40" fill="${fg}">${escape(site.role)}</text>

  <text x="96" y="416" font-family="Inter" font-weight="400" font-size="30" fill="${muted}">${escape(location)}</text>

  <rect x="96" y="486" width="1008" height="1" fill="${border}"/>

  <text x="96" y="546" font-family="Inter" font-weight="600" font-size="30" fill="${fg}">${escape(host)}</text>
  <text x="1104" y="546" text-anchor="end" font-family="Inter" font-weight="400" font-size="30" fill="${muted}">${escape(site.social.map((s) => s.label).join('  ·  '))}</text>
</svg>`

const png = new Resvg(svg, {
  font: { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Inter' },
  fitTo: { mode: 'width', value: 1200 },
})
  .render()
  .asPng()

const target = resolve(root, 'public', 'og.png')
writeFileSync(target, png)
console.log(`og-image: public/og.png, 1200x630, ${(png.length / 1024).toFixed(0)} kB`)
