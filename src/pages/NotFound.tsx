import { Link } from 'react-router'
import { site } from '@/content/site'
import { usePageMeta } from '@/hooks/usePageMeta'

export function NotFound() {
  usePageMeta(`Not found · ${site.name}`)

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-medium tracking-tight text-fg">
        Page not found
      </h1>
      <p className="text-muted">
        That page does not exist. It may have moved, or it may never have
        been here.
      </p>
      <Link
        to="/"
        className="inline-block rounded-sm text-fg underline decoration-border underline-offset-4 transition-colors duration-150 hover:text-accent hover:decoration-accent"
      >
        Back home
      </Link>
    </div>
  )
}
