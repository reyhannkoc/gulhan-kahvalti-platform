import { type FormEvent, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { FormField } from '../../components/ui/FormField'
import { Input } from '../../components/ui/Input'
import { useAuth } from '../../hooks/useAuth'
import { getApiErrorMessage } from '../../services/api'

export function RegisterPage() {
  const { isAdmin, isAuthenticated, loading, register } = useAuth()
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (isAuthenticated) {
    return <Navigate replace to={isAdmin ? '/admin' : '/menu'} />
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    try {
      await register({ fullName, email, password })
      navigate('/menu', { replace: true })
    } catch (err) {
      setError(getApiErrorMessage(err, 'Kayit olusturulamadi.'))
    }
  }

  return (
    <section className="mx-auto max-w-md rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-950">Kayit ol</h1>
        <p className="mt-2 text-sm text-stone-600">MVP hesap olusturma formu.</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <FormField htmlFor="fullName" label="Ad soyad">
          <Input
            autoComplete="name"
            id="fullName"
            onChange={(event) => setFullName(event.target.value)}
            required
            type="text"
            value={fullName}
          />
        </FormField>

        <FormField htmlFor="email" label="E-posta">
          <Input
            autoComplete="email"
            id="email"
            onChange={(event) => setEmail(event.target.value)}
            required
            type="email"
            value={email}
          />
        </FormField>

        <FormField htmlFor="password" label="Sifre">
          <div className="relative">
            <Input
              autoComplete="new-password"
              className="pr-10"
              id="password"
              minLength={6}
              onChange={(event) => setPassword(event.target.value)}
              required
              type={showPassword ? 'text' : 'password'}
              value={password}
            />
            <button
              aria-label={showPassword ? 'Sifreyi gizle' : 'Sifreyi goster'}
              className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-stone-500 transition hover:text-stone-800"
              onClick={() => setShowPassword((current) => !current)}
              type="button"
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </FormField>

        {error ? <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}

        <Button disabled={loading} fullWidth type="submit">
          {loading ? 'Kayit olusturuluyor' : 'Kayit ol'}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-stone-600">
        Zaten hesabiniz var mi?{' '}
        <Link className="font-semibold text-emerald-700 hover:text-emerald-800" to="/login">
          Giris yapin
        </Link>
      </p>
    </section>
  )
}

function EyeIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M3 3l18 18" />
      <path d="M10.6 10.6A3 3 0 0 0 12 15a3 3 0 0 0 2.4-4.8" />
      <path d="M9.9 4.2A10.8 10.8 0 0 1 12 4.0c6.5 0 10 8 10 8a17.8 17.8 0 0 1-3.1 4.4" />
      <path d="M6.1 6.1C3.6 7.8 2 12 2 12s3.5 8 10 8a10.7 10.7 0 0 0 5.9-1.9" />
    </svg>
  )
}
