import { useLayoutEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { Github, Linkedin } from 'lucide-react'
import { nav, site } from '@/content/site'
import type { SocialLink } from '@/content/site'
import { cn } from '@/lib/cn'
import { XIcon } from './icons'
import { ThemeToggle } from './ThemeToggle'

const icons = {
  github: Github,
  linkedin: Linkedin,
  x: XIcon,
} as const

/** Slack between the stroke and the word it sits under, in px. */
const OVERHANG = 3

function SocialButton({ link }: { link: SocialLink }) {
  const Icon = icons[link.icon]

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer"
      aria-label={link.label}
      title={link.label}
      className="flex size-8 items-center justify-center rounded-lg bg-fg/5 text-fg transition-colors duration-150 hover:bg-fg/10"
    >
      <Icon className="size-4" />
    </a>
  )
}

/**
 * Top bar, following surya.website: wordmark left, links centred on the
 * viewport, 32px square icon buttons right. It sits in the document flow and
 * scrolls away with the page rather than sticking.
 *
 * Below the `bar` breakpoint (810px, the same one surya switches at) the bar
 * stops spanning the width and becomes a centred cluster: the wordmark drops
 * out, and links and buttons centre themselves on one row, wrapping onto two
 * centred rows once they no longer fit.
 *
 * The marker stroke is a single element in the link row rather than one per
 * link, so it can travel between them. It is positioned imperatively here and
 * animated by the CSS transition on `.nav-ink`: the trick is that the two
 * edges get different durations, and which edge is the fast one flips with
 * the direction of travel. Moving right, the right edge arrives first and the
 * left edge trails, so the stroke stretches across both words before pulling
 * itself back in.
 */
export function Nav() {
  const { pathname } = useLocation()
  const rowRef = useRef<HTMLDivElement>(null)
  const inkRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const row = rowRef.current
    const ink = inkRef.current
    if (!row || !ink) return

    function place() {
      if (!row || !ink) return
      const active = row.querySelector<HTMLElement>('[aria-current="page"]')
      if (!active) {
        ink.style.opacity = '0'
        return
      }

      const rowBox = row.getBoundingClientRect()
      const activeBox = active.getBoundingClientRect()
      const left = activeBox.left - rowBox.left - OVERHANG
      const right = rowBox.right - activeBox.right - OVERHANG

      // Whichever edge leads the move gets the short duration. The order here
      // matches `transition-property: left, right, opacity` in globals.css.
      const movingRight = left > (parseFloat(ink.style.left) || 0)
      ink.style.transitionDuration = movingRight
        ? '300ms, 170ms, 150ms'
        : '170ms, 300ms, 150ms'

      ink.style.left = `${left}px`
      ink.style.right = `${right}px`
      ink.style.opacity = '1'
    }

    place()
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [pathname])

  return (
    <header className="relative z-20 mx-6 mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 bar:h-12 bar:flex-nowrap bar:justify-between bar:gap-4">
      <Link
        to="/"
        className="hidden rounded-sm text-[13px] font-medium text-fg transition-colors duration-150 hover:text-accent bar:block"
      >
        {site.shortName}
      </Link>

      <nav
        aria-label="Main"
        className="bar:absolute bar:left-1/2 bar:-translate-x-1/2"
      >
        <div ref={rowRef} className="relative flex items-center gap-6">
          {nav.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-sm pb-1 text-[13px] transition-colors duration-150',
                  isActive ? 'text-fg' : 'text-muted hover:text-fg',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}

          <span ref={inkRef} aria-hidden className="nav-ink">
            <span className="nav-ink-stroke" />
          </span>
        </div>
      </nav>

      <div className="flex items-center gap-3">
        {site.social.map((link) => (
          <SocialButton key={link.href} link={link} />
        ))}
        <ThemeToggle />
      </div>
    </header>
  )
}
