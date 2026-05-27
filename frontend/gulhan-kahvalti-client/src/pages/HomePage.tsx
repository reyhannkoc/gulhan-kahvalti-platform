import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { siteSettings } from '../config/siteSettings'
import { useLanguage } from '../hooks/useLanguage'

export function HomePage() {
  const { t } = useLanguage()

  return (
    <section className="space-y-12">
      <div className="overflow-hidden rounded-3xl bg-slate-950 text-white">
        <div className="grid gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10 lg:py-16">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
              Erdemli'de kahvaltı ve yöresel lezzetler
            </p>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">{t('brand')}</h1>
              <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Turkuaz ve beyaz marka yönüyle hazırlanan Gülhan Kahvaltı vitrini.
                Restoran menüsünü inceleyin veya sipariş verilebilir ürünlere geçin.
              </p>
            </div>
            <div className="grid gap-3 sm:flex sm:flex-wrap">
              <Link to="/menu">
                <Button>Menü</Button>
              </Link>
              <Link to="/products">
                <span className="inline-flex min-h-10 items-center justify-center rounded-lg border border-cyan-200 px-4 py-2 text-sm font-semibold text-cyan-50 transition hover:bg-white/10">
                  Ürünlerimiz
                </span>
              </Link>
              <a
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-cyan-500 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                href={siteSettings.contact.phoneHref}
                rel="noreferrer"
                target="_blank"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <div className="min-h-72 rounded-3xl border border-cyan-300/30 bg-gradient-to-br from-cyan-400/20 via-white/10 to-slate-900 p-5">
            <div className="flex h-full min-h-64 items-center justify-center rounded-2xl border border-dashed border-cyan-200/50 bg-white/5 text-center text-sm text-cyan-50">
              Görsel alanı
              <br />
              Admin panelinden yönetilecek logo ve vitrin görselleri için placeholder.
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="rounded-3xl border border-cyan-100 bg-cyan-50 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-800">Hakkımızda</p>
          <h2 className="mt-3 text-2xl font-bold text-slate-950 sm:text-3xl">Sade, sıcak ve yerel bir kahvaltı deneyimi</h2>
        </div>
        <p className="text-base leading-8 text-slate-600">
          Gülhan Kahvaltı, kahvaltı kültürünü sade bir dijital vitrin ve ayrı bir sipariş akışıyla sunar.
          Menü sayfası restoran menüsünü tanıtır; Ürünlerimiz sayfası ise sepete eklenebilen ürünleri listeler.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {[
          ['Menü', 'Restoran menüsü ve fiyat bilgilerini inceleyin.', '/menu'],
          ['Ürünlerimiz', 'Sipariş verilebilir ürünleri görüntüleyin.', '/products'],
          ['İletişim', siteSettings.contact.address, '/'],
        ].map(([title, description, to]) => (
          <Link
            className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-md"
            key={title}
            to={to}
          >
            <h3 className="text-lg font-bold text-slate-950">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
