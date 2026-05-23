import { motion } from 'framer-motion'
import { NavLink, Outlet, useLocation } from 'react-router-dom'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-md px-3 py-2 text-sm font-medium transition',
    isActive ? 'bg-stone-900 text-white' : 'text-stone-700 hover:bg-stone-100',
  ].join(' ')

export function AdminLayout() {
  const location = useLocation()

  return (
    <section className="grid gap-6 lg:grid-cols-[220px_1fr]">
      <aside className="rounded-lg border border-stone-200 bg-white p-4">
        <h1 className="text-base font-semibold text-stone-900">Admin Panel</h1>
        <nav className="mt-4 flex flex-col gap-2">
          <NavLink className={linkClass} end to="/admin">
            Dashboard
          </NavLink>
          <NavLink className={linkClass} to="/admin/products">
            Urunler
          </NavLink>
          <NavLink className={linkClass} to="/admin/categories">
            Kategoriler
          </NavLink>
          <NavLink className={linkClass} to="/admin/orders">
            Siparisler
          </NavLink>
        </nav>
      </aside>
      <div className="min-w-0 rounded-lg border border-stone-200 bg-white p-6">
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
