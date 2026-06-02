import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminLayout } from '../layouts/AdminLayout'
import { MainLayout } from '../layouts/MainLayout'
import { AdminCategoriesPage } from '../pages/admin/AdminCategoriesPage'
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage'
import { AdminProductsPage } from '../pages/admin/AdminProductsPage'
import { AdminOrdersPage } from '../pages/admin/AdminOrdersPage'
import { LoginPage } from '../pages/auth/LoginPage'
import { RegisterPage } from '../pages/auth/RegisterPage'
import { AccountPage } from '../pages/AccountPage'
import { CartPage } from '../pages/CartPage'
import { CheckoutPage } from '../pages/CheckoutPage'
import { HomePage } from '../pages/HomePage'
import { MenuPage } from '../pages/MenuPage'
import { MyOrdersPage } from '../pages/MyOrdersPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ProductDetailPage } from '../pages/ProductDetailPage'
import { ProductsPage } from '../pages/ProductsPage'
import { SettingsPage } from '../pages/SettingsPage'
import { AdminRoute } from './AdminRoute'
import { ProtectedRoute } from './ProtectedRoute'
import { AboutPage } from '../pages/AboutPage'
import { ContactPage } from '../pages/ContactPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route element={<HomePage />} index />
        <Route element={<AboutPage />} path="about" />
        <Route element={<ContactPage />} path="contact" />
        <Route element={<MenuPage />} path="menu" />
        <Route element={<ProductsPage />} path="products" />
        <Route element={<ProductDetailPage />} path="products/:id" />
        <Route element={<LoginPage />} path="login" />
        <Route element={<RegisterPage />} path="register" />

        <Route element={<ProtectedRoute />}>
          <Route element={<CartPage />} path="cart" />
          <Route element={<CheckoutPage />} path="checkout" />
          <Route element={<MyOrdersPage />} path="my-orders" />
          <Route element={<AccountPage />} path="account" />
          <Route element={<SettingsPage />} path="settings" />
        </Route>

        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />} path="admin">
            <Route element={<AdminDashboardPage />} index />
            <Route element={<AdminProductsPage />} path="products" />
            <Route element={<AdminCategoriesPage />} path="categories" />
            <Route element={<AdminOrdersPage />} path="orders" />
          </Route>
        </Route>

        <Route element={<NotFoundPage />} path="*" />
      </Route>
      <Route element={<Navigate replace to="/" />} path="" />
    </Routes>
  )
}
