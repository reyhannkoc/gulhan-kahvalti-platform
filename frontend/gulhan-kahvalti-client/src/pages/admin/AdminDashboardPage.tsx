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
      <div>
        <h1 className="text-2xl font-bold text-stone-950">{t('adminDashboard')}</h1>
        <p className="mt-2 text-stone-600">
          {t('adminDashboardDescription')}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {quickLinks.map((link) => (
          <Link
            className="rounded-lg border border-stone-200 bg-stone-50 p-4 transition hover:border-emerald-300 hover:bg-emerald-50"
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
