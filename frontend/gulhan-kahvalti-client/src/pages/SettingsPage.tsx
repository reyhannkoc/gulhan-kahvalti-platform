import { useLanguage } from '../hooks/useLanguage'
import { useTheme } from '../hooks/useTheme'

export function SettingsPage() {
  const { language, t } = useLanguage()
  const { theme, setTheme } = useTheme()

  return (
    <section className="mx-auto max-w-2xl space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-stone-950 sm:text-3xl dark:text-white">{t('settings')}</h1>
        <p className="mt-2 text-stone-600 dark:text-slate-300">{t('settingsDescription')}</p>
      </div>

      <div className="rounded-3xl border border-cyan-100 bg-white p-4 shadow-sm sm:p-5 dark:border-white/10 dark:bg-slate-900">
        <h2 className="font-semibold text-stone-950 dark:text-white">{t('preferences')}</h2>
        <div className="mt-4 flex flex-col gap-3 border-b border-cyan-50 pb-4 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
          <div>
            <p className="text-sm font-medium text-stone-700 dark:text-slate-200">{t('language')}</p>
            <p className="text-sm text-stone-500 dark:text-slate-400">
              {t('selectedLanguage')}: {language.toUpperCase()}
            </p>
          </div>
          <span className="rounded-full border border-brand-turquoise bg-brand-light px-4 py-2 text-sm font-semibold text-cyan-800">
            Türkçe
          </span>
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-stone-700 dark:text-slate-200">{t('theme')}</p>
            <p className="text-sm text-stone-500 dark:text-slate-400">{t('selectedTheme')}: {theme === 'dark' ? t('themeDark') : t('themeLight')}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex">
            <button
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                theme === 'light'
                  ? 'border-brand-turquoise bg-brand-light text-cyan-800'
                  : 'border-cyan-100 text-stone-700 hover:bg-brand-light dark:border-white/15 dark:text-slate-200 dark:hover:bg-white/10'
              }`}
              onClick={() => setTheme('light')}
              type="button"
            >
              {t('themeLight')}
            </button>
            <button
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                theme === 'dark'
                  ? 'border-brand-turquoise bg-brand-light text-cyan-800'
                  : 'border-cyan-100 text-stone-700 hover:bg-brand-light dark:border-white/15 dark:text-slate-200 dark:hover:bg-white/10'
              }`}
              onClick={() => setTheme('dark')}
              type="button"
            >
              {t('themeDark')}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
