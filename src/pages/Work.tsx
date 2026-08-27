import { ProjectCard } from '@/components/ProjectCard'
import { site } from '@/content/site'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

const DESCRIPTION = 'Projects built by Bruno Ortiz Blanco.'

export function Work() {
  useDocumentTitle(`Work · ${site.name}`, DESCRIPTION)

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-medium tracking-tight text-fg">Work</h1>
        <p className="text-justify hyphens-auto text-muted">
          Things I have built, newest first. The ones with a link are public;
          the rest live in private repositories.
        </p>
      </header>

      <div className="divide-y divide-border">
        {site.projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  )
}
