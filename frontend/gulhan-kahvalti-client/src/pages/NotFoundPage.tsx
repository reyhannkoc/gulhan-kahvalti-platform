import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export function NotFoundPage() {
  return (
    <section className="space-y-4 text-center">
      <h1 className="text-2xl font-bold text-stone-950 sm:text-3xl">Sayfa bulunamadı</h1>
      <p className="text-stone-600">Aradığınız rota mevcut değil.</p>
      <Link to="/">
        <Button>Ana sayfaya dön</Button>
      </Link>
    </section>
  )
}
