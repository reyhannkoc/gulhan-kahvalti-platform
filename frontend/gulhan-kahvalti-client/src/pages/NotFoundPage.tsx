import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export function NotFoundPage() {
  return (
    <section className="mx-auto max-w-xl rounded-3xl border border-cyan-100 bg-white p-8 text-center shadow-brand dark:border-white/10 dark:bg-slate-900">
      <h1 className="text-2xl font-bold text-stone-950 sm:text-3xl">Sayfa bulunamadı</h1>
      <p className="mt-3 text-stone-600">Aradığınız rota mevcut değil.</p>
      <Link className="mt-5 inline-flex" to="/">
        <Button>Ana sayfaya dön</Button>
      </Link>
    </section>
  )
}
