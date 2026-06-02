import { Link } from 'react-router-dom'
import { useLanguage } from '../../hooks/useLanguage'
import type { TranslationKey } from '../../utils/translations'

const quickLinks = [
  {
    titleKey: 'manageProducts',
    descriptionKey: 'manageProductsDescription',
    to: '/admin/products',
  },
  {
    titleKey: 'manageCategories',
    descriptionKey: 'manageCategoriesDescription',
    to: '/admin/categories',
  },
  {
    titleKey: 'manageOrders',
    descriptionKey: 'manageOrdersDescription',
    to: '/admin/orders',
  },
] satisfies Array<{ titleKey: TranslationKey; descriptionKey: TranslationKey; to: string }>

export function AdminDashboardPage() {
  const { t } = useLanguage()

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-cyan-100 bg-brand-light p-5 dark:border-white/10 dark:bg-cyan-400/10">
        <h1 className="text-2xl font-bold text-stone-950">{t('adminDashboard')}</h1>
        <p className="mt-2 text-stone-600">
          {t('adminDashboardDescription')}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {quickLinks.map((link) => (
          <Link
            className="rounded-2xl border border-cyan-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-brand dark:border-white/10 dark:bg-slate-950"
            key={link.to}
            to={link.to}
          >
            <h2 className="font-semibold text-stone-950">{t(link.titleKey)}</h2>
            <p className="mt-2 text-sm text-stone-600">{t(link.descriptionKey)}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
