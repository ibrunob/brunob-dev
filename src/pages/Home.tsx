import { Link } from 'react-router'
import { CopyEmail } from '@/components/CopyEmail'
import { ExternalLink } from '@/components/ExternalLink'
import { ProjectCard } from '@/components/ProjectCard'
import { Rich } from '@/components/Rich'
import { Section } from '@/components/Section'
import { featuredProjects, site } from '@/content/site'
import { usePageMeta } from '@/hooks/usePageMeta'

export function Home() {
  usePageMeta(`${site.name} · ${site.role}`, site.intro)

  return (
    <div className="space-y-16">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-medium tracking-tight text-fg">
            {site.name}
          </h1>
          <p className="text-muted">{site.role}</p>
        </div>

        <p className="text-justify hyphens-auto text-lg leading-relaxed text-fg"><Rich text={site.intro} />
        </p>

        <dl className="space-y-1.5 text-sm">
          {site.meta.map((item) => (
            <div key={item.label} className="flex gap-5">
              <dt className="w-20 shrink-0 text-muted">{item.label}</dt>
              <dd className="text-fg">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="text-justify hyphens-auto space-y-4 leading-relaxed text-muted">
        {site.home.map((paragraph, i) => (
          <p key={i}>
            <Rich text={paragraph} />
          </p>
        ))}
      </div>

      <Section
        title="Selected work"
        action={
          <Link
            to="/work"
            className="rounded-sm text-sm text-muted transition-colors duration-150 hover:text-accent"
          >
            All projects →
          </Link>
        }
      >
        <div className="divide-y divide-border">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      <Section title="Get in touch">
        <ul className="space-y-2 text-muted">
          <li>
            <CopyEmail />
          </li>
          {site.social.map((link) => (
            <li key={link.href}>
              <ExternalLink href={link.href}>{link.label}</ExternalLink>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  )
}
