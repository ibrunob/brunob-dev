import { useRef } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/cn'

/**
 * A switch, not a button, so it does not read as another social icon in the
 * row: a rounded track with a knob that slides to the side matching the theme
 * currently in use. Semantics match the visual (`role="switch"` plus
 * `aria-checked`), and the knob travel is a 200ms transform that
 * `prefers-reduced-motion` flattens along with everything else.
 */
export function ThemeToggle() {
  const ref = useRef<HTMLButtonElement>(null)
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  function onClick() {
    const rect = ref.current?.getBoundingClientRect()
    toggle(
      rect
        ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
        : undefined,
    )
  }

  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Dark mode"
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      onClick={onClick}
      className="relative flex h-8 w-14 shrink-0 items-center rounded-full bg-fg/5 px-1 transition-colors duration-150 hover:bg-fg/10"
    >
      <span
        className={cn(
          'flex size-6 items-center justify-center rounded-full border border-border bg-surface text-fg shadow-sm transition-transform duration-200 ease-out',
          isDark && 'translate-x-6',
        )}
      >
        {isDark ? (
          <Moon className="size-3.5" aria-hidden />
        ) : (
          <Sun className="size-3.5" aria-hidden />
        )}
      </span>
    </button>
  )
}
