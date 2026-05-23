import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export function HomePage() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div className="space-y-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Yerel kahvalti lezzetleri
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-stone-950 sm:text-5xl">
          Gulhan Kahvalti
        </h1>
        <p className="max-w-2xl text-base leading-7 text-stone-600">
          Menuyu inceleyebileceginiz, urunleri sepete ekleyebileceginiz ve demo
          siparis akisini deneyebileceginiz MVP vitrin.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/menu">
            <Button>Menuyu incele</Button>
          </Link>
          <Link to="/register">
            <Button variant="ghost">Kayit ol</Button>
          </Link>
        </div>
      </div>
      <div className="rounded-lg border border-stone-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-stone-900">MVP kapsam</h2>
        <p className="mt-3 text-sm leading-6 text-stone-600">
          Bu ekranda ilerleyen fazlarda isletme tanitimi, one cikan urunler ve
          iletisim alanlari yer alacak.
        </p>
      </div>
    </section>
  )
}
