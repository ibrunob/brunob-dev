import {
  siCalendly,
  siDocker,
  siFastapi,
  siCplusplus,
  siGithub,
  siGooglechrome,
  siJavascript,
  siNextdotjs,
  siPhp,
  siPython,
  siReact,
  siSpringboot,
  siStripe,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVite,
  siYolo,
} from 'simple-icons'

type SimpleIcon = { title: string; path: string }

/**
 * Tag label to its Simple Icons mark. Anything missing here keeps its plain
 * text label, so a tag is never dropped just because no icon fits: LoRa and
 * Recharts have no Simple Icons entry at all, non-technology tags like "Web"
 * were never going to have one, and spaCy and MySQL are deliberately
 * excluded because their marks carry a wordmark that turns to mush at 16px.
 *
 * Icons are drawn in currentColor rather than their brand colour: the site
 * runs on one accent and a neutral ramp, and fourteen brand colours in a row
 * would fight it.
 */
const icons: Record<string, SimpleIcon> = {
  'C++': siCplusplus,
  Calendly: siCalendly,
  Docker: siDocker,
  FastAPI: siFastapi,
  'Chrome extension': siGooglechrome,
  'GitHub OAuth': siGithub,
  JavaScript: siJavascript,
  'Next.js': siNextdotjs,
  PHP: siPhp,
  Python: siPython,
  React: siReact,
  'Spring Boot': siSpringboot,
  Stripe: siStripe,
  'Tailwind CSS': siTailwindcss,
  TypeScript: siTypescript,
  Vercel: siVercel,
  Vite: siVite,
  YOLOv8: siYolo,
}

export function TechTag({ label }: { label: string }) {
  const icon = icons[label]

  if (!icon) {
    return (
      <li className="text-xs text-muted">{label}</li>
    )
  }

  // The accessible name goes on the <svg>, not on the <li>: putting role="img"
  // on the list item would strip its listitem role and leave the <ul> with
  // children that are not list items.
  return (
    <li
      title={label}
      className="text-muted transition-colors duration-150 hover:text-fg"
    >
      <svg
        role="img"
        aria-label={label}
        viewBox="0 0 24 24"
        className="size-4"
        fill="currentColor"
      >
        <path d={icon.path} />
      </svg>
    </li>
  )
}
