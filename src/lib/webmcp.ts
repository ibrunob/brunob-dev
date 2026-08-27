import type {} from '@mcp-b/webmcp-types'
import { featuredProjects, site } from '@/content/site'

/**
 * WebMCP: exposes the portfolio as callable tools so an agent browsing the
 * page can query it structurally instead of scraping the rendered text.
 *
 * The canonical surface is `document.modelContext` (the W3C draft at
 * webmachinelearning.github.io/webmcp); `navigator.modelContext` is a
 * deprecated compatibility alias and is not used here. Nothing runs unless the
 * browser exposes the API, so this is pure progressive enhancement.
 *
 * Every tool answers from `site.ts`, which keeps the agent-facing data and the
 * rendered page from drifting apart.
 */

/** Strips the `**...**` emphasis markers that only mean something to `Rich`. */
const plain = (text: string) => text.replace(/\*\*/g, '')

function projectPayload(project: (typeof site.projects)[number]) {
  return {
    title: project.title,
    description: plain(project.description),
    year: project.year,
    technologies: project.tags,
    repository: project.repo ?? null,
    liveUrl: project.demo ?? null,
  }
}

export function registerWebMcpTools(): () => void {
  const modelContext = document.modelContext
  if (!modelContext?.registerTool) return () => {}

  const controller = new AbortController()
  const options = { signal: controller.signal }

  const register = (
    name: string,
    description: string,
    inputSchema: Record<string, unknown>,
    execute: (args: never) => unknown,
  ) => {
    void Promise.resolve(
      modelContext.registerTool(
        { name, description, inputSchema, execute },
        options,
      ),
    ).catch(() => {
      // A browser that advertises the API but rejects a registration should
      // not take the page down with it.
    })
  }

  const noArgs = {
    type: 'object',
    properties: {},
    additionalProperties: false,
  } as const

  register(
    'get_profile',
    `Who ${site.name} is: role, location, studies and a short introduction.`,
    noArgs,
    () => ({
      name: site.name,
      role: site.role,
      url: site.url,
      introduction: plain(site.intro),
      ...Object.fromEntries(site.meta.map((m) => [m.label, m.value])),
      about: site.about.map(plain),
    }),
  )

  register(
    'list_projects',
    'Projects built by Bruno Ortiz Blanco, newest first. Optionally filter by a technology such as React, Python or Next.js.',
    {
      type: 'object',
      properties: {
        technology: {
          type: 'string',
          description: 'Only return projects tagged with this technology.',
        },
        featuredOnly: {
          type: 'boolean',
          description: 'Only return the projects highlighted on the home page.',
        },
      },
      additionalProperties: false,
    },
    (args: { technology?: string; featuredOnly?: boolean }) => {
      const source = args?.featuredOnly ? featuredProjects : site.projects
      const technology = args?.technology?.toLowerCase()
      const matches = technology
        ? source.filter((p) =>
            p.tags.some((tag) => tag.toLowerCase().includes(technology)),
          )
        : source
      return { count: matches.length, projects: matches.map(projectPayload) }
    },
  )

  register(
    'get_experience',
    'Work experience and education, most recent first.',
    noArgs,
    () => ({
      entries: site.timeline.map((entry) => ({
        title: entry.title,
        organisation: entry.organisation,
        period: entry.period,
        description: plain(entry.description),
      })),
    }),
  )

  register(
    'get_stack',
    'The technologies Bruno works with, grouped by area.',
    noArgs,
    () => ({
      groups: site.stack.map((group) => ({
        area: group.label,
        technologies: group.items,
      })),
    }),
  )

  register(
    'get_contact',
    `How to reach ${site.name}.`,
    noArgs,
    () => ({
      email: site.email,
      website: site.url,
      profiles: site.social.map((link) => ({
        platform: link.label,
        url: link.href,
      })),
    }),
  )

  return () => controller.abort()
}
