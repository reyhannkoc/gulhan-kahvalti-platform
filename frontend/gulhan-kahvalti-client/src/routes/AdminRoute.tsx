import { Navigate, Outlet } from 'react-router-dom'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { useAuth } from '../hooks/useAuth'

export function AdminRoute() {
  const { isAuthenticated, loading, user } = useAuth()

  if (loading) {
    return <LoadingSpinner label="Yetki kontrol ediliyor" />
  }

  if (!isAuthenticated) {
    return <Navigate replace to="/login" />
  }

  if (user?.role !== 'Admin') {
    return <Navigate replace to="/" />
  }

  return <Outlet />
}
