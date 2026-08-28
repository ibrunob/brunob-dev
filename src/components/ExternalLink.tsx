import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/cn'

export function ExternalLink({
  href,
  children,
  className,
  download,
}: {
  href: string
  children: React.ReactNode
  className?: string
  download?: boolean
}) {
  const external = href.startsWith('http')

  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      {...(download ? { download: '' } : {})}
      className={cn(
        'group inline-flex items-center gap-0.5 rounded-sm text-fg underline decoration-border underline-offset-4 transition-colors duration-150 hover:decoration-accent hover:text-accent',
        className,
      )}
    >
      {children}
      <ArrowUpRight className="size-3.5 text-muted transition-colors duration-150 group-hover:text-accent" aria-hidden />
    </a>
  )
}
