import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { useLanguage } from '../hooks/useLanguage'

export function HomePage() {
  const { t } = useLanguage()

  return (
    <section className="grid gap-6 sm:gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div className="space-y-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Yerel kahvalti lezzetleri
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-stone-950 sm:text-5xl">
          {t('brand')}
        </h1>
        <p className="max-w-2xl text-base leading-7 text-stone-600">
          Menuyu inceleyebileceginiz, urunleri sepete ekleyebileceginiz ve demo
          siparis akisini deneyebileceginiz MVP vitrin.
        </p>
        <div className="grid gap-3 sm:flex sm:flex-wrap">
          <Link to="/menu">
            <Button>{t('menu')}</Button>
          </Link>
          <Link to="/register">
            <Button variant="ghost">{t('register')}</Button>
          </Link>
        </div>
      </div>
      <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm sm:p-8">
        <h2 className="text-xl font-semibold text-stone-900">MVP kapsam</h2>
        <p className="mt-3 text-sm leading-6 text-stone-600">
          Bu ekranda ilerleyen fazlarda isletme tanitimi, one cikan urunler ve
          iletisim alanlari yer alacak.
        </p>
      </div>
    </section>
  )
}
