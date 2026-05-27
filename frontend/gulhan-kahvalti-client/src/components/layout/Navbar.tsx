import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Button } from '../ui/Button'
import { useAuth } from '../../hooks/useAuth'
import { useLanguage } from '../../hooks/useLanguage'
import { siteSettings } from '../../config/siteSettings'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'w-full rounded-full px-3 py-2 text-sm font-semibold transition md:w-auto md:whitespace-nowrap',
    isActive ? 'bg-cyan-50 text-cyan-800' : 'text-slate-700 hover:bg-cyan-50 hover:text-cyan-800',
  ].join(' ')

const ctaClass = ({ isActive }: { isActive: boolean }) =>
  [
    'inline-flex w-full items-center justify-center rounded-full border px-4 py-2 text-sm font-bold transition md:w-auto',
    isActive
      ? 'border-cyan-700 bg-cyan-700 text-white'
      : 'border-cyan-700 bg-white text-cyan-800 hover:bg-cyan-700 hover:text-white',
  ].join(' ')

const plainLinkClass =
  'w-full rounded-full px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-cyan-50 hover:text-cyan-800 md:w-auto md:whitespace-nowrap'

export function Navbar() {
  const { isAdmin, isAuthenticated, isUser, logout } = useAuth()
  const { language, t, toggleLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  function closeMenu() {
    setIsOpen(false)
  }

  function handleLogout() {
    setIsOpen(false)
    logout()
  }

  return (
    <header className="sticky top-0 z-30 border-b border-cyan-100 bg-white/95 shadow-sm backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-col gap-3 px-3 py-3 sm:px-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-3">
          <Link className="flex min-w-0 items-center gap-3" onClick={closeMenu} to="/">
            <span aria-label="Logo alanı" className="h-11 w-11 shrink-0 rounded-2xl border border-dashed border-cyan-400 bg-cyan-50" />
            <span className="min-w-0 truncate text-lg font-bold text-cyan-900">{t('brand')}</span>
          </Link>
          <button
            aria-expanded={isOpen}
            aria-label="Menüyü aç veya kapat"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-200 text-cyan-900 lg:hidden"
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
        <div className={`${isOpen ? 'flex' : 'hidden'} flex-col gap-3 lg:flex lg:flex-1 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between`}>
          <div className="flex flex-col gap-2 lg:flex-row lg:flex-wrap lg:items-center lg:justify-center">
          {!isAuthenticated ? (
            <>
              <NavLink className={linkClass} onClick={closeMenu} to="/">
                {t('home')}
              </NavLink>
              <Link className={plainLinkClass} onClick={closeMenu} to="/">
                {t('institutional')}
              </Link>
              <NavLink className={linkClass} onClick={closeMenu} to="/products">
                {t('ourProducts')}
              </NavLink>
              <Link className={plainLinkClass} onClick={closeMenu} to="/">
                {t('contact')}
              </Link>
              <NavLink className={linkClass} onClick={closeMenu} to="/login">
                {t('login')}
              </NavLink>
              <NavLink className={linkClass} onClick={closeMenu} to="/register">
                {t('register')}
              </NavLink>
            </>
          ) : null}

          {isUser ? (
            <>
              <NavLink className={linkClass} onClick={closeMenu} to="/products">
                {t('ourProducts')}
              </NavLink>
              <NavLink className={linkClass} onClick={closeMenu} to="/menu">
                {t('menu')}
              </NavLink>
              <NavLink className={linkClass} onClick={closeMenu} to="/cart">
                {t('cart')}
              </NavLink>
              <NavLink className={linkClass} onClick={closeMenu} to="/my-orders">
                {t('myOrders')}
              </NavLink>
              <NavLink className={linkClass} onClick={closeMenu} to="/account">
                {t('account')}
              </NavLink>
              <NavLink className={linkClass} onClick={closeMenu} to="/settings">
                {t('settings')}
              </NavLink>
            </>
          ) : null}

          {isAdmin ? (
            <>
              <NavLink className={linkClass} end onClick={closeMenu} to="/admin">
                {t('adminDashboard')}
              </NavLink>
              <NavLink className={linkClass} onClick={closeMenu} to="/admin/products">
                {t('products')}
              </NavLink>
              <NavLink className={linkClass} onClick={closeMenu} to="/admin/categories">
                {t('categories')}
              </NavLink>
              <NavLink className={linkClass} onClick={closeMenu} to="/admin/orders">
                {t('orders')}
              </NavLink>
            </>
          ) : null}
          </div>

          <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          {isAuthenticated ? (
            <Button className="w-full justify-center lg:w-auto lg:justify-start" onClick={handleLogout} variant="ghost">
              {t('logout')}
            </Button>
          ) : null}
          {!isAuthenticated ? (
            <div className="grid gap-2 sm:grid-cols-2 lg:flex lg:items-center">
              <div className="flex items-center gap-2">
                <a
                  aria-label="Facebook"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-200 text-sm font-bold text-cyan-800 transition hover:bg-cyan-50"
                  href={siteSettings.social.facebook}
                  rel="noreferrer"
                  target="_blank"
                >
                  f
                </a>
                <a
                  aria-label="Instagram"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-200 text-sm font-bold text-cyan-800 transition hover:bg-cyan-50"
                  href={siteSettings.social.instagram}
                  rel="noreferrer"
                  target="_blank"
                >
                  ig
                </a>
                <a
                  aria-label="E-posta"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-200 text-sm font-bold text-cyan-800 transition hover:bg-cyan-50"
                  href={siteSettings.contact.emailHref}
                >
                  @
                </a>
              </div>
              <a
                className="inline-flex min-h-10 items-center justify-center rounded-full bg-cyan-600 px-4 text-sm font-bold text-white transition hover:bg-cyan-700"
                href={siteSettings.contact.phoneHref}
                rel="noreferrer"
                target="_blank"
              >
                WhatsApp
              </a>
              <NavLink className={ctaClass} onClick={closeMenu} to="/menu">
                {t('menu')}
              </NavLink>
            </div>
          ) : null}
          <button
            aria-label={t('language')}
            className="w-full rounded-full border border-cyan-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-cyan-50 lg:w-auto"
            onClick={toggleLanguage}
            type="button"
          >
            {language === 'tr' ? t('switchToEnglish') : t('switchToTurkish')}
          </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
