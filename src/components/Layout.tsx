import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { motion } from 'motion/react'
import { Nav } from './Nav'
import { Footer } from './Footer'

export function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-md bg-surface px-4 py-2 text-sm focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:border focus:border-border"
      >
        Skip to content
      </a>

      <Nav />

      <div className="mx-auto w-full max-w-2xl px-6 pt-16 md:pt-24">
        {/* Keyed on the route so each page fades in once. 200ms, short enough
            to feel like part of the click, per Emil Kowalski's rule. */}
        <motion.main
          id="main"
          key={pathname}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
        >
          <Outlet />
        </motion.main>

        <Footer />
      </div>
    </>
  )
}
