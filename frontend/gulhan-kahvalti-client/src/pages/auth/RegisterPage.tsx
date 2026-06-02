import { type FormEvent, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { FormField } from '../../components/ui/FormField'
import { Input } from '../../components/ui/Input'
import { useAuth } from '../../hooks/useAuth'
import { useLanguage } from '../../hooks/useLanguage'
import { getApiErrorMessage } from '../../services/api'

export function RegisterPage() {
  const { isAdmin, isAuthenticated, loading, register } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [slowRequest, setSlowRequest] = useState(false)

  if (isAuthenticated) {
    return <Navigate replace to={isAdmin ? '/admin' : '/products'} />
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    setSlowRequest(false)

    const slowTimer = window.setTimeout(() => {
      setSlowRequest(true)
    }, 3000)

    try {
      await register({ fullName, email, password })
      navigate('/products', { replace: true })
    } catch (err) {
      setError(getApiErrorMessage(err, t('registerFailed')))
    } finally {
      window.clearTimeout(slowTimer)
      setSlowRequest(false)
      setSubmitting(false)
    }
  }

  return (
    <section className="mx-auto max-w-md rounded-3xl border border-cyan-100 bg-white p-6 shadow-brand dark:border-white/10 dark:bg-slate-900">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-turquoise">Gülhan Kahvaltı</p>
        <h1 className="mt-2 text-2xl font-bold text-stone-950">{t('register')}</h1>
        <p className="mt-2 text-sm text-stone-600">{t('registerDescription')}</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <FormField htmlFor="fullName" label={t('fullName')}>
          <Input
            autoComplete="name"
            id="fullName"
            onChange={(event) => setFullName(event.target.value)}
            required
            type="text"
            value={fullName}
          />
        </FormField>

        <FormField htmlFor="email" label={t('email')}>
          <Input
            autoComplete="email"
            id="email"
            onChange={(event) => setEmail(event.target.value)}
            required
            type="email"
            value={email}
          />
        </FormField>

        <FormField htmlFor="password" label={t('password')}>
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
              aria-label={showPassword ? t('hidePassword') : t('showPassword')}
              className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-stone-500 transition hover:text-brand-turquoise dark:text-slate-300"
              onClick={() => setShowPassword((current) => !current)}
              type="button"
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </FormField>

        {submitting ? (
          <div
            aria-live="polite"
            className="rounded-2xl border border-cyan-100 bg-brand-light/70 p-3 text-sm text-cyan-900 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-100"
          >
            <div className="flex items-center gap-3">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-brand-turquoise dark:border-white/20 dark:border-t-cyan-300" />
              <span>{t('registering')}</span>
            </div>
            {slowRequest ? (
              <p className="mt-2 text-xs text-cyan-800/80 dark:text-cyan-100/80">
                Sunucu hazırlanıyor olabilir. Lütfen birkaç saniye daha bekleyin.
              </p>
            ) : null}
          </div>
        ) : null}

        {error ? <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}

        <Button disabled={loading || submitting} fullWidth type="submit">
          {submitting ? t('registering') : t('register')}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-stone-600">
        {t('alreadyHaveAccount')}{' '}
        <Link className="font-semibold text-brand-turquoise hover:text-cyan-700 dark:text-cyan-200" to="/login">
          {t('login')}
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
