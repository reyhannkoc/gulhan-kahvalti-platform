import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { siteSettings } from '../../config/siteSettings'
import { useAuth } from '../../hooks/useAuth'
import { useCartCount } from '../../hooks/useCartCount'
import { useLanguage } from '../../hooks/useLanguage'
import { useTheme } from '../../hooks/useTheme'
import { GulhanLogo } from '../ui/GulhanLogo'

// ── Class factories ────────────────────────────────────────────────────────────

// Desktop pill nav link
const desktopLink = ({ isActive }: { isActive: boolean }) =>
  [
    'px-3 py-1.5 rounded-full text-sm font-medium transition duration-200 whitespace-nowrap',
    isActive
      ? 'bg-brand-turquoise text-white shadow-sm'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white',
  ].join(' ')

// Mobile drawer row link
const drawerLink = ({ isActive }: { isActive: boolean }) =>
  [
    'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition duration-200 w-full',
    isActive
      ? 'bg-brand-turquoise text-white'
      : 'text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-white/8',
  ].join(' ')

// Shared icon button (theme/lang/cart)
const iconBtn =
  'relative inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition duration-200 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white shrink-0'

// ── Component ──────────────────────────────────────────────────────────────────

export function Navbar() {
  const { isAdmin, isAuthenticated, isUser, logout } = useAuth()
  const { language, t, toggleLanguage } = useLanguage()
  const { isDark, toggleTheme } = useTheme()
  const cartCount = useCartCount(isUser)
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Stronger shadow once user scrolls past navbar height
  useEffect(() => {
    function onScroll() {
      const next = window.scrollY > 4
      setScrolled((prev) => (prev === next ? prev : next))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function close() {
    setIsOpen(false)
  }

  function handleLogout() {
    close()
    logout()
  }

  return (
    <>
      <header
        className={[
          'sticky top-0 z-40 border-b bg-white/92 backdrop-blur-xl transition-all duration-300 dark:bg-slate-950/92',
          scrolled
            ? 'border-slate-200/70 shadow-card dark:border-white/8'
            : 'border-slate-200/40 dark:border-white/6',
        ].join(' ')}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">

          {/* ── Brand logo ── */}
          <Link className="flex shrink-0 items-center gap-2.5" onClick={close} to="/">
            <GulhanLogo className="h-10 w-auto shrink-0 text-slate-900 dark:text-white" />
            <span className="hidden min-w-0 flex-col leading-none sm:flex">
              <span className="truncate font-display text-[15px] font-bold text-slate-900 dark:text-white">
                {t('brand')}
              </span>
              <span className="mt-0.5 truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-turquoise">
                {siteSettings.slogan}
              </span>
            </span>
          </Link>

          {/* ── Desktop nav links (center) ── */}
          <div className="hidden flex-1 items-center justify-center gap-0.5 xl:flex">
            {!isAuthenticated && (
              <>
                <NavLink className={desktopLink} end onClick={close} to="/">{t('home')}</NavLink>
                <NavLink className={desktopLink} onClick={close} to="/menu">{t('menu')}</NavLink>
                <NavLink className={desktopLink} onClick={close} to="/products">{t('ourProducts')}</NavLink>
                <NavLink className={desktopLink} onClick={close} to="/about">{t('about')}</NavLink>
                <NavLink className={desktopLink} onClick={close} to="/contact">{t('contact')}</NavLink>
              </>
            )}
            {isUser && (
              <>
                <NavLink className={desktopLink} end onClick={close} to="/">{t('home')}</NavLink>
                <NavLink className={desktopLink} onClick={close} to="/menu">{t('menu')}</NavLink>
                <NavLink className={desktopLink} onClick={close} to="/products">{t('ourProducts')}</NavLink>
                <NavLink className={desktopLink} onClick={close} to="/my-orders">{t('myOrders')}</NavLink>
                <NavLink className={desktopLink} onClick={close} to="/account">{t('account')}</NavLink>
              </>
            )}
            {isAdmin && (
              <>
                <NavLink className={desktopLink} end onClick={close} to="/admin">{t('adminDashboard')}</NavLink>
                <NavLink className={desktopLink} onClick={close} to="/admin/products">{t('products')}</NavLink>
                <NavLink className={desktopLink} onClick={close} to="/admin/categories">{t('categories')}</NavLink>
                <NavLink className={desktopLink} onClick={close} to="/admin/orders">{t('orders')}</NavLink>
              </>
            )}
          </div>

          {/* ── Desktop right actions ── */}
          <div className="hidden shrink-0 items-center gap-1 xl:flex">
            {!isAuthenticated && (
              <>
                <NavLink
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-full text-sm font-medium transition duration-200 ${
                      isActive
                        ? 'text-brand-turquoise'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                    }`
                  }
                  to="/login"
                >
                  {t('login')}
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    `px-4 py-1.5 rounded-full text-sm font-semibold transition duration-200 ${
                      isActive
                        ? 'bg-brand-deep text-white'
                        : 'bg-brand-turquoise text-white hover:bg-cyan-700 dark:hover:bg-cyan-500'
                    }`
                  }
                  to="/register"
                >
                  {t('register')}
                </NavLink>
                <div className="mx-1 h-4 w-px bg-slate-200 dark:bg-white/10" />
              </>
            )}

            {isAuthenticated && (
              <button
                className="px-3 py-1.5 rounded-full text-sm font-medium text-slate-600 transition duration-200 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                onClick={handleLogout}
              >
                {t('logout')}
              </button>
            )}

            {isUser && (
              <NavLink className="block" to="/cart">
                {({ isActive }) => (
                  <span
                    className={`${iconBtn} ${
                      isActive ? 'bg-brand-light text-brand-turquoise dark:bg-cyan-400/15 dark:text-cyan-300' : ''
                    }`}
                  >
                    <CartIcon />
                    {cartCount > 0 && <CartBadge count={cartCount} />}
                  </span>
                )}
              </NavLink>
            )}

            <button
              aria-label={language === 'tr' ? 'Switch to English' : 'Türkçeye geç'}
              className={iconBtn}
              onClick={toggleLanguage}
            >
              <span className="text-[11px] font-bold">{language === 'tr' ? 'EN' : 'TR'}</span>
            </button>

            <button
              aria-label={isDark ? 'Açık temaya geç' : 'Koyu temaya geç'}
              className={iconBtn}
              onClick={toggleTheme}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>

          {/* ── Mobile: cart badge + animated hamburger ── */}
          <div className="flex shrink-0 items-center gap-1 xl:hidden">
            {isUser && (
              <NavLink className="block" onClick={close} to="/cart">
                {({ isActive }) => (
                  <span
                    className={`${iconBtn} ${
                      isActive ? 'bg-brand-light text-brand-turquoise dark:bg-cyan-400/15' : ''
                    }`}
                  >
                    <CartIcon />
                    {cartCount > 0 && <CartBadge count={cartCount} />}
                  </span>
                )}
              </NavLink>
            )}

            <button
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Menüyü kapat' : 'Menüyü aç'}
              className={iconBtn}
              onClick={() => setIsOpen((v) => !v)}
              type="button"
            >
              <HamburgerIcon isOpen={isOpen} />
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile drawer ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-x-0 top-16 z-30 xl:hidden"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {/* Tap-to-close backdrop */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-slate-950/25 backdrop-blur-[2px]"
              onClick={close}
            />

            {/* Drawer panel */}
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mx-3 mt-2 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card-hover dark:border-white/10 dark:bg-slate-900"
              exit={{ opacity: 0, y: -6 }}
              initial={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Nav links */}
              <div className="p-2">
                {!isAuthenticated && (
                  <nav aria-label="Ana navigasyon">
                    <NavLink className={drawerLink} end onClick={close} to="/">{t('home')}</NavLink>
                    <NavLink className={drawerLink} onClick={close} to="/menu">{t('menu')}</NavLink>
                    <NavLink className={drawerLink} onClick={close} to="/products">{t('ourProducts')}</NavLink>
                    <NavLink className={drawerLink} onClick={close} to="/about">{t('about')}</NavLink>
                    <NavLink className={drawerLink} onClick={close} to="/contact">{t('contact')}</NavLink>
                  </nav>
                )}

                {isUser && (
                  <nav aria-label="Kullanıcı navigasyon">
                    <NavLink className={drawerLink} end onClick={close} to="/">{t('home')}</NavLink>
                    <NavLink className={drawerLink} onClick={close} to="/menu">{t('menu')}</NavLink>
                    <NavLink className={drawerLink} onClick={close} to="/products">{t('ourProducts')}</NavLink>
                    <NavLink className={drawerLink} onClick={close} to="/cart">
                      <span className="flex w-full items-center">
                        {t('cart')}
                        {cartCount > 0 && (
                          <span className="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-accent px-1 text-[10px] font-bold text-slate-950">
                            {cartCount > 9 ? '9+' : cartCount}
                          </span>
                        )}
                      </span>
                    </NavLink>
                    <NavLink className={drawerLink} onClick={close} to="/my-orders">{t('myOrders')}</NavLink>
                    <NavLink className={drawerLink} onClick={close} to="/account">{t('account')}</NavLink>
                    <NavLink className={drawerLink} onClick={close} to="/settings">{t('settings')}</NavLink>
                  </nav>
                )}

                {isAdmin && (
                  <nav aria-label="Yönetici navigasyon">
                    <NavLink className={drawerLink} end onClick={close} to="/admin">{t('adminDashboard')}</NavLink>
                    <NavLink className={drawerLink} onClick={close} to="/admin/products">{t('products')}</NavLink>
                    <NavLink className={drawerLink} onClick={close} to="/admin/categories">{t('categories')}</NavLink>
                    <NavLink className={drawerLink} onClick={close} to="/admin/orders">{t('orders')}</NavLink>
                  </nav>
                )}
              </div>

              {/* Bottom utility bar */}
              <div className="border-t border-slate-100 p-3 dark:border-white/8">
                <div className="flex items-center gap-2">
                  {!isAuthenticated ? (
                    <>
                      <NavLink
                        className="flex-1 rounded-xl border border-slate-200 py-2.5 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/6"
                        onClick={close}
                        to="/login"
                      >
                        {t('login')}
                      </NavLink>
                      <NavLink
                        className="flex-1 rounded-xl bg-brand-turquoise py-2.5 text-center text-sm font-semibold text-white transition hover:bg-cyan-700"
                        onClick={close}
                        to="/register"
                      >
                        {t('register')}
                      </NavLink>
                    </>
                  ) : (
                    <button
                      className="flex-1 rounded-xl border border-slate-200 py-2.5 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/6"
                      onClick={handleLogout}
                    >
                      {t('logout')}
                    </button>
                  )}

                  <div className="flex items-center gap-1">
                    <button
                      aria-label={language === 'tr' ? 'Switch to English' : 'Türkçeye geç'}
                      className={iconBtn}
                      onClick={toggleLanguage}
                    >
                      <span className="text-[11px] font-bold">{language === 'tr' ? 'EN' : 'TR'}</span>
                    </button>
                    <button
                      aria-label={isDark ? 'Açık temaya geç' : 'Koyu temaya geç'}
                      className={iconBtn}
                      onClick={toggleTheme}
                    >
                      {isDark ? <SunIcon /> : <MoonIcon />}
                    </button>
                  </div>
                </div>

                {/* WhatsApp for unauthenticated mobile users */}
                {!isAuthenticated && (
                  <a
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-2.5 text-sm font-semibold text-white transition hover:bg-[#1ebe5d]"
                    href={siteSettings.contact.phoneHref}
                    onClick={close}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp ile ulaşın
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function CartBadge({ count }: { count: number }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-accent px-0.5 text-[9px] font-bold leading-none text-slate-950">
      {count > 9 ? '9+' : count}
    </span>
  )
}

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
      <span
        className={`block h-0.5 w-5 origin-center rounded-full bg-current transition-all duration-300 ${
          isOpen ? 'translate-y-[7px] rotate-45' : ''
        }`}
      />
      <span
        className={`block h-0.5 rounded-full bg-current transition-all duration-300 ${
          isOpen ? 'w-0 opacity-0' : 'w-5'
        }`}
      />
      <span
        className={`block h-0.5 w-5 origin-center rounded-full bg-current transition-all duration-300 ${
          isOpen ? '-translate-y-[7px] -rotate-45' : ''
        }`}
      />
    </span>
  )
}

function CartIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
      <line strokeLinecap="round" x1="3" x2="21" y1="6" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.75" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.75" viewBox="0 0 24 24">
      <path d="M20 14.2A7.8 7.8 0 019.8 4 8 8 0 1020 14.2z" />
    </svg>
  )
}
