// GitHub Pages serves 404.html for any path it cannot find as a static file.
// Duplicating index.html there lets the SPA boot and let React Router resolve
// deep links like brunob.dev/work on a hard refresh.
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

const dist = resolve(import.meta.dirname, '..', 'dist')
copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))
console.log('copied dist/index.html -> dist/404.html')
