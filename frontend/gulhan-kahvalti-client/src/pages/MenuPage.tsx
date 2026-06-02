import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { restaurantMenu } from '../config/restaurantMenu'

export function MenuPage() {
  return (
    <section className="space-y-8">
      <div className="overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-brand">
        <div className="grid gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10 lg:py-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Restoran menüsü</p>
            <h1 className="mt-3 text-3xl font-bold sm:text-5xl">Gülhan Kahvaltı Menü</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
              Kahvaltılar, sıkmalar, gözlemeler, yumurta çeşitleri ve içecekler için bilgilendirme menüsü.
              Bu sayfada sepete ekleme veya ödeme akışı bulunmaz.
            </p>
            <div className="mt-6">
              <Link to="/products">
                <Button>Sipariş İçin Ürünlerimiz</Button>
              </Link>
            </div>
          </div>

          <CoastalMenuPanel />
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-3xl border border-cyan-100 bg-brand-light p-4 text-sm font-semibold text-cyan-900 sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:bg-cyan-400/10 dark:text-cyan-100">
        <p>Menü içerikleri bilgilendirme amaçlıdır. Sipariş vermek için Ürünlerimiz sayfasını ziyaret edin.</p>
        <Link className="shrink-0 text-cyan-800 underline-offset-4 hover:underline dark:text-cyan-100" to="/products">
          Ürünlerimiz
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {restaurantMenu.map((section) => (
          <article
            className="rounded-3xl border border-cyan-100 bg-white p-5 shadow-sm transition hover:shadow-brand sm:p-6 dark:border-white/10 dark:bg-slate-900"
            key={section.category}
          >
            <div className="border-b border-cyan-50 pb-4 dark:border-white/10">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">{section.category}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{section.description}</p>
            </div>
            <div className="mt-5 space-y-4">
              {section.items.map((item) => (
                <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start" key={item.name}>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-slate-900 dark:text-white">{item.name}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.description}</p>
                  </div>
                  <p className="w-fit rounded-full bg-brand-light px-3 py-1 text-sm font-bold text-cyan-800 sm:justify-self-end dark:bg-cyan-400/10 dark:text-cyan-100">
                    {item.price}
                  </p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function CoastalMenuPanel() {
  return (
    <div className="relative min-h-72 overflow-hidden rounded-3xl border border-cyan-300/30 bg-gradient-to-br from-cyan-300/25 via-white/10 to-brand-accent/20 p-5">
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-300/30 blur-2xl" />
      <div className="absolute -bottom-12 left-6 h-36 w-36 rounded-full bg-brand-accent/25 blur-2xl" />
      <div className="absolute inset-x-8 top-10 h-20 rounded-full border border-white/15" />

      <div className="relative flex min-h-64 flex-col justify-between rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100">Gülhan Kahvaltı</p>
          <h2 className="mt-3 text-2xl font-bold text-white">Deniz Esintili Menü</h2>
          <p className="mt-3 text-sm leading-6 text-slate-200">
            Kahvaltı sofraları, ev yapımı lezzetler ve sıcak içecekler tek sayfada.
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {['Kahvaltılar', 'Sıkmalar', 'İçecekler'].map((item) => (
            <div className="rounded-2xl bg-white/10 p-3 text-center text-sm font-semibold text-cyan-50" key={item}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
