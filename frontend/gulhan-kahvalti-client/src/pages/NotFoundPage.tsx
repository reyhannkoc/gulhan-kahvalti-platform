import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export function NotFoundPage() {
  return (
    <section className="space-y-4 text-center">
      <h1 className="text-2xl font-bold text-stone-950 sm:text-3xl">Sayfa bulunamadi</h1>
      <p className="text-stone-600">Aradiginiz rota mevcut degil.</p>
      <Link to="/">
        <Button>Ana sayfaya don</Button>
      </Link>
    </section>
  )
}
