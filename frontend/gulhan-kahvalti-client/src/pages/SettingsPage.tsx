import { useLanguage } from '../hooks/useLanguage'

export function SettingsPage() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <section className="mx-auto max-w-2xl space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-stone-950 sm:text-3xl">{t('settings')}</h1>
        <p className="mt-2 text-stone-600">{t('settingsDescription')}</p>
      </div>

      <div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm sm:p-5">
        <h2 className="font-semibold text-stone-950">{t('preferences')}</h2>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-stone-700">{t('language')}</p>
            <p className="text-sm text-stone-500">
              {t('selectedLanguage')}: {language.toUpperCase()}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex">
            <button
              className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                language === 'tr'
                  ? 'border-emerald-700 bg-emerald-50 text-emerald-800'
                  : 'border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
              onClick={() => setLanguage('tr')}
              type="button"
            >
              TR
            </button>
            <button
              className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                language === 'en'
                  ? 'border-emerald-700 bg-emerald-50 text-emerald-800'
                  : 'border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
              onClick={() => setLanguage('en')}
              type="button"
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
