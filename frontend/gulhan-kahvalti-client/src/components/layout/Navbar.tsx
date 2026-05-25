import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Button } from '../ui/Button'
import { useAuth } from '../../hooks/useAuth'
import { useLanguage } from '../../hooks/useLanguage'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'w-full rounded-md px-3 py-2 text-sm font-medium transition md:w-auto md:whitespace-nowrap',
    isActive ? 'bg-emerald-50 text-emerald-800' : 'text-stone-700 hover:bg-stone-100',
  ].join(' ')

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
    <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-col gap-3 px-3 py-3 sm:px-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between gap-3">
          <Link className="min-w-0 truncate text-lg font-bold text-emerald-800" onClick={closeMenu} to="/">
            {t('brand')}
          </Link>
          <button
            aria-expanded={isOpen}
            aria-label="Menuyu ac veya kapat"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-stone-200 text-stone-700 md:hidden"
            onClick={() => setIsOpen((current) => !current)}
            type="button"
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1">
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </span>
          </button>
        </div>
        <div className={`${isOpen ? 'flex' : 'hidden'} flex-col gap-2 md:flex md:flex-row md:flex-wrap md:items-center md:justify-end`}>
          {!isAuthenticated ? (
            <>
              <NavLink className={linkClass} onClick={closeMenu} to="/">
                {t('home')}
              </NavLink>
              <NavLink className={linkClass} onClick={closeMenu} to="/menu">
                {t('menu')}
              </NavLink>
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

          {isAuthenticated ? (
            <Button className="w-full justify-center md:w-auto md:justify-start" onClick={handleLogout} variant="ghost">
              {t('logout')}
            </Button>
          ) : null}
          <button
            aria-label={t('language')}
            className="w-full rounded-md border border-stone-200 px-3 py-2 text-sm font-semibold text-stone-700 transition hover:bg-stone-100 md:w-auto"
            onClick={toggleLanguage}
            type="button"
          >
            {language === 'tr' ? t('switchToEnglish') : t('switchToTurkish')}
          </button>
        </div>
      </nav>
    </header>
  )
}
