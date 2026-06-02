import { motion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from '../components/layout/Footer'
import { Navbar } from '../components/layout/Navbar'

export function MainLayout() {
  const location = useLocation()

  return (
    <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_top_left,_#E6FAF8,_transparent_34%),linear-gradient(180deg,#FFFFFF_0%,#F5F7FA_55%,#FFF8EC_100%)] text-brand-text transition-colors dark:bg-[radial-gradient(circle_at_top_left,_rgba(0,166,166,0.18),_transparent_34%),linear-gradient(180deg,#020617_0%,#071A1F_100%)] dark:text-slate-100">
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
