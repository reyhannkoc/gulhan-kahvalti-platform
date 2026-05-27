import { Navigate, Outlet } from 'react-router-dom'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { useAuth } from '../hooks/useAuth'

export function AdminRoute() {
  const { isAdmin, isAuthenticated, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner label="Yetki kontrol ediliyor" />
  }

  if (!isAuthenticated) {
    return <Navigate replace to="/login" />
  }

  if (!isAdmin) {
    return <Navigate replace to="/products" />
  }

  return <Outlet />
}
