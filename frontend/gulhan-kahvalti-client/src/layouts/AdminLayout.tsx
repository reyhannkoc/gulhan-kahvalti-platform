import { motion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'

export function AdminLayout() {
  const location = useLocation()

  return (
    <section className="min-w-0">
      <div className="min-w-0 rounded-3xl border border-cyan-100 bg-white p-4 shadow-sm sm:p-6 dark:border-white/10 dark:bg-slate-900">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 8 }}
          key={location.pathname}
          transition={{ duration: 0.2 }}
        >
          <Outlet />
        </motion.div>
      </div>
    </section>
  )
}
