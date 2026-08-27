import { useEffect } from 'react'

/** Keeps <title> and the meta description in step with the current route. */
export function useDocumentTitle(title: string, description?: string) {
  useEffect(() => {
    document.title = title
    if (!description) return
    const meta = document.querySelector('meta[name="description"]')
    meta?.setAttribute('content', description)
  }, [title, description])
}
