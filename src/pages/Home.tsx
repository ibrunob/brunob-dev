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
          <h1 className="text-4xl font-medium tracking-tight text-fg">
            {site.name}
          </h1>
          <p className="text-lg text-muted">{site.role}</p>
        </div>

        <p className="text-center text-xl leading-relaxed text-fg"><Rich text={site.intro} />
        </p>
      </div>

      <div className="space-y-4 leading-relaxed text-muted">
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
          <li>
            <ExternalLink href={site.cv} download>
              Download CV
            </ExternalLink>
          </li>
        </ul>
      </Section>
    </div>
  )
}
