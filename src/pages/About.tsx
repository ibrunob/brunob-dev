import { Rich } from '@/components/Rich'
import { Section } from '@/components/Section'
import { site } from '@/content/site'
import { usePageMeta } from '@/hooks/usePageMeta'

const DESCRIPTION = 'About Bruno Ortiz Blanco: background, stack and experience.'

export function About() {
  usePageMeta(`About · ${site.name}`, DESCRIPTION)

  return (
    <div className="space-y-16">
      <header className="space-y-6">
        <h1 className="text-2xl font-medium tracking-tight text-fg">About</h1>
        <div className="text-justify hyphens-auto space-y-4 leading-relaxed text-muted">
          {site.about.map((paragraph, i) => (
            <p key={i}>
              <Rich text={paragraph} />
            </p>
          ))}
        </div>
      </header>

      <Section title="Stack">
        <dl className="space-y-4">
          {site.stack.map((group) => (
            <div key={group.label} className="sm:flex sm:gap-6">
              <dt className="w-36 shrink-0 text-sm text-muted">
                {group.label}
              </dt>
              <dd className="mt-1 text-fg sm:mt-0">{group.items.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Experience & education">
        <ol className="space-y-6">
          {site.timeline.map((entry) => (
            <li key={`${entry.organisation}-${entry.period}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-medium text-fg">
                  {entry.title}{' '}
                  <span className="font-normal text-muted">
                    · {entry.organisation}
                  </span>
                </h3>
                <span className="ml-auto text-sm whitespace-nowrap text-muted">
                  {entry.period}
                </span>
              </div>
              <p className="text-justify hyphens-auto mt-1 text-muted">
                <Rich text={entry.description} />
              </p>
            </li>
          ))}
        </ol>
      </Section>
    </div>
  )
}
