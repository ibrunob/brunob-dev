import { useEffect, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { site } from '@/content/site'

/**
 * The mailto link stays a plain link. It opens the mail client, as expected.
 * Copying is a separate, explicit button next to it.
 */
export function CopyEmail() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const id = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(id)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
    } catch {
      // Clipboard unavailable (insecure context, denied permission). The
      // mailto link beside this button still works.
    }
  }

  return (
    <span className="inline-flex items-center gap-1">
      <a
        href={`mailto:${site.email}`}
        className="rounded-sm text-fg underline decoration-border underline-offset-4 transition-colors duration-150 hover:decoration-accent hover:text-accent"
      >
        {site.email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? 'Email copied' : 'Copy email address'}
        className="flex size-7 items-center justify-center rounded-md text-muted transition-colors duration-150 hover:bg-subtle hover:text-fg"
      >
        {copied ? (
          <Check className="size-3.5 text-accent" aria-hidden />
        ) : (
          <Copy className="size-3.5" aria-hidden />
        )}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? 'Email copied to clipboard' : ''}
      </span>
    </span>
  )
}
