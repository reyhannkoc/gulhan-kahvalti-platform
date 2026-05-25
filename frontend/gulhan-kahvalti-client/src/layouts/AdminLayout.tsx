import { motion } from 'framer-motion'
import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import type { TranslationKey } from '../utils/translations'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition',
    isActive ? 'bg-stone-900 text-white' : 'text-stone-700 hover:bg-stone-100',
  ].join(' ')

const adminLinks: Array<{ icon: string; labelKey: TranslationKey; to: string; end?: boolean }> = [
  { icon: 'D', labelKey: 'adminDashboard', to: '/admin', end: true },
  { icon: 'P', labelKey: 'products', to: '/admin/products' },
  { icon: 'C', labelKey: 'categories', to: '/admin/categories' },
  { icon: 'O', labelKey: 'orders', to: '/admin/orders' },
]

export function AdminLayout() {
  const location = useLocation()
  const { t } = useLanguage()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <section className={`grid min-w-0 gap-4 lg:gap-6 ${isCollapsed ? 'lg:grid-cols-[84px_minmax(0,1fr)]' : 'lg:grid-cols-[220px_minmax(0,1fr)]'}`}>
      <aside className="rounded-lg border border-stone-200 bg-white p-3 sm:p-4">
        <div className="flex items-center justify-between gap-2">
          <h1 className={`text-base font-semibold text-stone-900 ${isCollapsed ? 'lg:sr-only' : ''}`}>
            {t('adminPanel')}
          </h1>
          <button
            aria-label={isCollapsed ? 'Expand admin menu' : 'Collapse admin menu'}
            className="rounded-md border border-stone-200 px-2 py-1 text-sm font-semibold text-stone-700 transition hover:bg-stone-100"
            onClick={() => setIsCollapsed((current) => !current)}
            type="button"
          >
            {isCollapsed ? '>>' : '<<'}
          </button>
        </div>
        <nav className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
          {adminLinks.map((link) => (
            <NavLink
              className={linkClass}
              end={link.end}
              key={link.to}
              title={t(link.labelKey)}
              to={link.to}
            >
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded bg-stone-100 text-xs font-bold text-stone-700">
                {link.icon}
              </span>
              <span className={isCollapsed ? 'lg:sr-only' : ''}>{t(link.labelKey)}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="min-w-0 rounded-lg border border-stone-200 bg-white p-4 sm:p-6">
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
