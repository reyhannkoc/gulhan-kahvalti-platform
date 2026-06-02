import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { siteSettings } from '../../config/siteSettings'
import { useAuth } from '../../hooks/useAuth'
import { useLanguage } from '../../hooks/useLanguage'
import { useTheme } from '../../hooks/useTheme'
import { Button } from '../ui/Button'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'w-full rounded-full px-3 py-2 text-sm font-semibold transition lg:w-auto lg:whitespace-nowrap',
    isActive
      ? 'bg-brand-light text-cyan-800 dark:bg-cyan-400/15 dark:text-cyan-100'
      : 'text-slate-700 hover:bg-brand-light hover:text-cyan-800 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-cyan-100',
  ].join(' ')

const menuCtaClass = ({ isActive }: { isActive: boolean }) =>
  [
    'inline-flex w-full items-center justify-center rounded-full border px-4 py-2 text-sm font-bold transition lg:w-auto',
    isActive
      ? 'border-brand-turquoise bg-brand-turquoise text-white'
      : 'border-brand-turquoise bg-white text-cyan-800 hover:bg-brand-turquoise hover:text-white dark:bg-slate-950 dark:text-cyan-100 dark:hover:bg-brand-turquoise dark:hover:text-white',
  ].join(' ')

const iconButtonClass =
  'inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-200 text-cyan-800 transition hover:bg-brand-light dark:border-white/15 dark:text-cyan-100 dark:hover:bg-white/10'

export function Navbar() {
  const { isAdmin, isAuthenticated, isUser, logout } = useAuth()
  const { language, t, toggleLanguage } = useLanguage()
  const { isDark, toggleTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  function closeMenu() {
    setIsOpen(false)
  }

  function handleLogout() {
    setIsOpen(false)
    logout()
  }

  return (
    <header className="sticky top-0 z-30 border-b border-cyan-100 bg-white/95 shadow-sm backdrop-blur transition-colors dark:border-white/10 dark:bg-slate-950/95">
      <nav className="mx-auto flex max-w-6xl flex-col gap-3 px-3 py-3 sm:px-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center justify-between gap-3">
          <Link className="flex min-w-0 items-center gap-3" onClick={closeMenu} to="/">
            <span
              aria-label="Logo alanı"
              className="h-11 w-11 shrink-0 rounded-2xl border border-dashed border-brand-turquoise bg-gradient-to-br from-brand-light to-white shadow-sm dark:from-cyan-400/15 dark:to-slate-900"
            />
            <span className="min-w-0">
              <span className="block truncate text-lg font-bold text-cyan-900 dark:text-cyan-100">{t('brand')}</span>
              <span className="hidden text-xs font-semibold text-brand-turquoise sm:block">{siteSettings.slogan}</span>
            </span>
          </Link>
          <button
            aria-expanded={isOpen}
            aria-label="Menüyü aç veya kapat"
            className={iconButtonClass + ' xl:hidden'}
            onClick={() => setIsOpen((current) => !current)}
            type="button"
          >
            <span className="sr-only">Menü</span>
            <span className="flex flex-col gap-1">
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </span>
          </button>
        </div>

        <div className={`${isOpen ? 'flex' : 'hidden'} flex-col gap-3 xl:flex xl:flex-1 xl:flex-row xl:flex-wrap xl:items-center xl:justify-between`}>
          <div className="flex flex-col gap-2 xl:flex-row xl:flex-wrap xl:items-center xl:justify-center">
            {!isAuthenticated ? (
              <>
                <NavLink className={linkClass} onClick={closeMenu} to="/">{t('home')}</NavLink>
                <NavLink className={menuCtaClass} onClick={closeMenu} to="/menu">{t('menu')}</NavLink>
                <NavLink className={linkClass} onClick={closeMenu} to="/products">{t('ourProducts')}</NavLink>
                <NavLink className={linkClass} onClick={closeMenu} to="/about">{t('about')}</NavLink>
                <NavLink className={linkClass} onClick={closeMenu} to="/contact">{t('contact')}</NavLink>
                <NavLink className={linkClass} onClick={closeMenu} to="/login">{t('login')}</NavLink>
                <NavLink className={linkClass} onClick={closeMenu} to="/register">{t('register')}</NavLink>
              </>
            ) : null}

            {isUser ? (
              <>
                <NavLink className={linkClass} onClick={closeMenu} to="/">{t('home')}</NavLink>
                <NavLink className={menuCtaClass} onClick={closeMenu} to="/menu">{t('menu')}</NavLink>
                <NavLink className={linkClass} onClick={closeMenu} to="/products">{t('ourProducts')}</NavLink>
                <NavLink className={linkClass} onClick={closeMenu} to="/cart">{t('cart')}</NavLink>
                <NavLink className={linkClass} onClick={closeMenu} to="/my-orders">{t('myOrders')}</NavLink>
                <NavLink className={linkClass} onClick={closeMenu} to="/account">{t('account')}</NavLink>
                <NavLink className={linkClass} onClick={closeMenu} to="/settings">{t('settings')}</NavLink>
              </>
            ) : null}

            {isAdmin ? (
              <>
                <NavLink className={linkClass} end onClick={closeMenu} to="/admin">{t('adminDashboard')}</NavLink>
                <NavLink className={linkClass} onClick={closeMenu} to="/admin/products">{t('products')}</NavLink>
                <NavLink className={linkClass} onClick={closeMenu} to="/admin/categories">{t('categories')}</NavLink>
                <NavLink className={linkClass} onClick={closeMenu} to="/admin/orders">{t('orders')}</NavLink>
                <span className="w-full rounded-full px-3 py-2 text-sm font-semibold text-slate-400 xl:w-auto">{t('siteSettings')}</span>
              </>
            ) : null}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center xl:justify-end">
            {!isAuthenticated ? (
              <a
                className="inline-flex min-h-10 items-center justify-center rounded-full bg-brand-turquoise px-4 text-sm font-bold text-white transition hover:bg-cyan-700 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
                href={siteSettings.contact.phoneHref}
                rel="noreferrer"
                target="_blank"
              >
                WhatsApp
              </a>
            ) : null}

            {isAuthenticated ? (
              <Button className="w-full justify-center sm:w-auto" onClick={handleLogout} variant="ghost">
                {t('logout')}
              </Button>
            ) : null}

            <button aria-label={t('language')} className={iconButtonClass} onClick={toggleLanguage} type="button">
              {language === 'tr' ? 'EN' : 'TR'}
            </button>
            <button
              aria-label={isDark ? 'Açık tema' : 'Koyu tema'}
              className={iconButtonClass}
              onClick={toggleTheme}
              type="button"
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

function SunIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path d="M12 4V2m0 20v-2m8-8h2M2 12h2m14.95-6.95 1.42-1.42M3.63 20.37l1.42-1.42m0-13.9L3.63 3.63m16.74 16.74-1.42-1.42" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path d="M20 14.2A7.8 7.8 0 0 1 9.8 4 8 8 0 1 0 20 14.2Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}
