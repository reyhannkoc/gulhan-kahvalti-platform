import { motion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from '../components/layout/Footer'
import { Navbar } from '../components/layout/Navbar'

export function MainLayout() {
  const location = useLocation()

  return (
    <div className="flex min-h-screen flex-col bg-brand-gray text-brand-text transition-colors dark:bg-slate-950 dark:text-slate-100">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-3 py-5 sm:px-4 sm:py-8">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 8 }}
          key={location.pathname}
          transition={{ duration: 0.2 }}
        >
          <Outlet />
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
