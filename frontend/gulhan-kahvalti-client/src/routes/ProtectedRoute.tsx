import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { useAuth } from '../hooks/useAuth'

export function ProtectedRoute() {
  const { isAdmin, isAuthenticated, isUser, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <LoadingSpinner label="Oturum kontrol ediliyor" />
  }

  if (!isAuthenticated) {
    return <Navigate replace state={{ from: location }} to="/login" />
  }

  if (!isUser) {
    return <Navigate replace to={isAdmin ? '/admin' : '/login'} />
  }

  return <Outlet />
}
