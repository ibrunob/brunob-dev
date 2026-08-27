import type { ReactNode } from 'react'

export function Section({
  title,
  action,
  children,
}: {
  title: string
  action?: ReactNode
  children: ReactNode
}) {
  return (
    <section className="space-y-5">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-base font-medium tracking-wide text-muted uppercase">
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  )
}
