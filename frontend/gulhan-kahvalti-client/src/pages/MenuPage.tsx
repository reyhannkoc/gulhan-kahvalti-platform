import { brandImages } from '../config/brandImages'
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
          </div>
          <div className="overflow-hidden rounded-3xl border border-cyan-300/30 bg-white/10 p-4">
            {brandImages.menuPhoto ? (
              <img
                alt="Gülhan Kahvaltı fiziksel menü fotoğrafı"
                className="h-64 w-full rounded-2xl object-cover"
                loading="lazy"
                src={brandImages.menuPhoto}
              />
            ) : (
              <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-cyan-200/50 bg-white/5 p-5 text-center text-sm text-cyan-100">
                Fiziksel menü fotoğrafı için placeholder
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="rounded-3xl border border-cyan-100 bg-brand-light p-4 text-sm font-semibold text-cyan-900 dark:border-white/10 dark:bg-cyan-400/10 dark:text-cyan-100">
        Menü içerikleri bilgilendirme amaçlıdır. Sipariş için Ürünlerimiz sayfasını ziyaret edebilirsiniz.
      </p>

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
