import { Link, NavLink } from 'react-router-dom'
import { Button } from '../ui/Button'
import { useAuth } from '../../hooks/useAuth'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-md px-3 py-2 text-sm font-medium transition',
    isActive ? 'bg-emerald-50 text-emerald-800' : 'text-stone-700 hover:bg-stone-100',
  ].join(' ')

export function Navbar() {
  const { isAdmin, isAuthenticated, isUser, logout } = useAuth()

  return (
    <header className="border-b border-stone-200 bg-white">
      <nav className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
        <Link className="text-lg font-bold text-emerald-800" to="/">
          Gulhan Kahvalti
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          {!isAuthenticated ? (
            <>
              <NavLink className={linkClass} to="/">
                Ana Sayfa
              </NavLink>
              <NavLink className={linkClass} to="/menu">
                Menu
              </NavLink>
              <NavLink className={linkClass} to="/login">
                Giris
              </NavLink>
              <NavLink className={linkClass} to="/register">
                Kayit
              </NavLink>
            </>
          ) : null}

          {isUser ? (
            <>
              <NavLink className={linkClass} to="/menu">
                Menu
              </NavLink>
              <NavLink className={linkClass} to="/cart">
                Sepet
              </NavLink>
              <NavLink className={linkClass} to="/my-orders">
                Siparislerim
              </NavLink>
            </>
          ) : null}

          {isAdmin ? (
            <>
              <NavLink className={linkClass} end to="/admin">
                Admin Dashboard
              </NavLink>
              <NavLink className={linkClass} to="/admin/products">
                Urunler
              </NavLink>
              <NavLink className={linkClass} to="/admin/categories">
                Kategoriler
              </NavLink>
              <NavLink className={linkClass} to="/admin/orders">
                Siparisler
              </NavLink>
            </>
          ) : null}

          {isAuthenticated ? (
            <Button onClick={logout} variant="ghost">
              Cikis
            </Button>
          ) : null}
        </div>
      </nav>
    </header>
  )
}
