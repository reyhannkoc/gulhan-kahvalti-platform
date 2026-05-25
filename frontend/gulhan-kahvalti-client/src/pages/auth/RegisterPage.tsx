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
          <Input
            autoComplete="new-password"
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
