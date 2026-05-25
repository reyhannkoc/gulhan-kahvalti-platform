import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  defaultLanguage,
  translations,
  type Language,
  type TranslationKey,
} from '../utils/translations'

const languageStorageKey = 'gulhan_language'

interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
  t: (key: TranslationKey) => string
}

export const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
}

function getStoredLanguage(): Language {
  const storedLanguage = localStorage.getItem(languageStorageKey)
  return storedLanguage === 'en' || storedLanguage === 'tr' ? storedLanguage : defaultLanguage
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => getStoredLanguage())

  const setLanguage = useCallback((nextLanguage: Language) => {
    localStorage.setItem(languageStorageKey, nextLanguage)
    setLanguageState(nextLanguage)
  }, [])

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'tr' ? 'en' : 'tr')
  }, [language, setLanguage])

  const t = useCallback(
    (key: TranslationKey) => translations[language][key],
    [language],
  )

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t,
    }),
    [language, setLanguage, t, toggleLanguage],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
