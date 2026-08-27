import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { site } from '@/content/site'

function setMeta(selector: string, content: string) {
  document.querySelector(selector)?.setAttribute('content', content)
}

/**
 * Keeps the crawlable head in step with the current route: title, description,
 * Open Graph, and the canonical URL.
 *
 * The canonical matters more than it looks. Every route is served by the same
 * index.html, so without it a crawler can treat /, /work and /about as three
 * copies of one document.
 */
export function usePageMeta(title: string, description?: string) {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = title
    setMeta('meta[property="og:title"]', title)

    if (description) {
      setMeta('meta[name="description"]', description)
      setMeta('meta[property="og:description"]', description)
      setMeta('meta[name="twitter:description"]', description)
    }

    const url = `${site.url.replace(/\/$/, '')}${pathname}`
    setMeta('meta[property="og:url"]', url)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url)
  }, [title, description, pathname])
}
