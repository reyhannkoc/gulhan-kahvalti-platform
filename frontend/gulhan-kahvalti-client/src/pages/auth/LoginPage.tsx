import { type FormEvent, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { FormField } from '../../components/ui/FormField'
import { Input } from '../../components/ui/Input'
import { useAuth } from '../../hooks/useAuth'
import { getApiErrorMessage } from '../../services/api'

interface LocationState {
  from?: {
    pathname?: string
  }
}

export function LoginPage() {
  const { isAuthenticated, loading, login } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const from = (location.state as LocationState | null)?.from?.pathname ?? '/'

  if (isAuthenticated) {
    return <Navigate replace to={from} />
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    try {
      await login({ email, password })
      navigate(from, { replace: true })
    } catch (err) {
      setError(getApiErrorMessage(err, 'Giris yapilamadi.'))
    }
  }

  return (
    <section className="mx-auto max-w-md rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-950">Giris yap</h1>
        <p className="mt-2 text-sm text-stone-600">Hesabiniza giris yaparak devam edin.</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
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
          <Input
            autoComplete="current-password"
            id="password"
            minLength={6}
            onChange={(event) => setPassword(event.target.value)}
            required
            type="password"
            value={password}
          />
        </FormField>

        {error ? <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}

        <Button disabled={loading} fullWidth type="submit">
          {loading ? 'Giris yapiliyor' : 'Giris yap'}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-stone-600">
        Hesabiniz yok mu?{' '}
        <Link className="font-semibold text-emerald-700 hover:text-emerald-800" to="/register">
          Kayit olun
        </Link>
      </p>
    </section>
  )
}
