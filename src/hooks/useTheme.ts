import { useCallback, useEffect, useState } from 'react'
import { flushSync } from 'react-dom'

export type Theme = 'light' | 'dark'
export type Origin = { x: number; y: number }

type ViewTransition = { ready: Promise<void> }
type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => void) => ViewTransition
}

const STORAGE_KEY = 'theme'
const DURATION = 260

function currentTheme(): Theme {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

/** Browsers without view transitions still get a colour cross-fade. */
function crossFadeColours() {
  const root = document.documentElement
  root.classList.add('theme-transition')
  window.setTimeout(() => root.classList.remove('theme-transition'), DURATION)
}

/**
 * Reads the theme the inline script in index.html already applied, and keeps
 * <html class="dark">, localStorage and React state in sync from there.
 *
 * `toggle` takes the point the click came from so the new theme can be wiped
 * in as a circle growing out of the button.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(currentTheme)

  useEffect(() => {
    applyTheme(theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Private mode or blocked storage. The class on <html> still applies.
    }
  }, [theme])

  // Follow the OS only while the visitor has not made an explicit choice.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (event: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem(STORAGE_KEY)) return
      } catch {
        // fall through and follow the OS
      }
      setTheme(event.matches ? 'dark' : 'light')
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const toggle = useCallback(
    (origin?: Origin) => {
      const next: Theme = theme === 'dark' ? 'light' : 'dark'
      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      const startViewTransition = (document as DocumentWithViewTransition)
        .startViewTransition

      if (reduceMotion) {
        setTheme(next)
        return
      }

      if (!startViewTransition || !origin) {
        crossFadeColours()
        setTheme(next)
        return
      }

      const transition = startViewTransition.call(document, () => {
        applyTheme(next)
        flushSync(() => setTheme(next))
      })

      transition.ready
        .then(() => {
          const { x, y } = origin
          const radius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y),
          )
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${radius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: DURATION,
              easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
              pseudoElement: '::view-transition-new(root)',
            },
          )
        })
        .catch(() => {
          // Transition was skipped, so the theme class is already applied.
        })
    },
    [theme],
  )

  return { theme, toggle }
}
