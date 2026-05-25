import { useAuth } from '../hooks/useAuth'
import { useLanguage } from '../hooks/useLanguage'

export function AccountPage() {
  const { t } = useLanguage()
  const { user } = useAuth()

  return (
    <section className="mx-auto max-w-2xl space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-stone-950 sm:text-3xl">{t('account')}</h1>
        <p className="mt-2 text-stone-600">{t('accountDescription')}</p>
      </div>

      <div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm sm:p-5">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-stone-500">{t('name')}</dt>
            <dd className="mt-1 font-semibold text-stone-950">{user?.fullName}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-stone-500">{t('email')}</dt>
            <dd className="mt-1 break-words font-semibold text-stone-950">{user?.email}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-stone-500">{t('role')}</dt>
            <dd className="mt-1 font-semibold text-stone-950">{user?.role}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
