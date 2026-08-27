import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Layout } from '@/components/Layout'
import { Home } from '@/pages/Home'
import { Work } from '@/pages/Work'
import { About } from '@/pages/About'
import { NotFound } from '@/pages/NotFound'
import { registerWebMcpTools } from '@/lib/webmcp'

export default function App() {
  // Offers the portfolio as WebMCP tools where the browser supports it.
  useEffect(() => registerWebMcpTools(), [])

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="work" element={<Work />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
