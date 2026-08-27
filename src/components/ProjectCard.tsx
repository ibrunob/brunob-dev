import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/content/site'
import { Rich } from './Rich'
import { TechTag } from './TechTag'

export function ProjectCard({ project }: { project: Project }) {
  const primary = project.demo ?? project.repo

  return (
    <article className="-mx-4 rounded-xl px-4 py-4 transition-colors duration-150 hover:bg-subtle">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-medium text-fg">
          {primary ? (
            <a
              href={primary}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1 rounded-sm transition-colors duration-150 hover:text-accent"
            >
              {project.title}
              <ArrowUpRight
                className="size-3.5 text-muted transition-colors duration-150 group-hover:text-accent"
                aria-hidden
              />
            </a>
          ) : (
            project.title
          )}
        </h3>
        <span className="shrink-0 text-sm tabular-nums text-muted">
          {project.year}
        </span>
      </div>

      <p className="text-justify hyphens-auto mt-1 text-muted">
        <Rich text={project.description} />
      </p>

      {project.tags.length > 0 && (
        <ul className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          {project.tags.map((tag, i) => (
            <TechTag key={`${tag}-${i}`} label={tag} />
          ))}
        </ul>
      )}

      {project.demo && project.repo && (
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-block rounded-sm text-sm text-muted underline decoration-border underline-offset-4 transition-colors duration-150 hover:text-accent hover:decoration-accent"
        >
          Source
        </a>
      )}
    </article>
  )
}
