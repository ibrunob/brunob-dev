import { site } from '@/content/site'

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border pt-8 pb-12 text-sm text-muted">
      <p>
        © {new Date().getFullYear()} {site.name}
      </p>
    </footer>
  )
}
