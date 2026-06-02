import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { brandImages } from '../config/brandImages'
import { restaurantMenu } from '../config/restaurantMenu'
import { siteSettings } from '../config/siteSettings'
import { useLanguage } from '../hooks/useLanguage'

export function HomePage() {
  const { t } = useLanguage()
  const menuPreview = restaurantMenu.slice(0, 4)

  return (
    <section className="space-y-12">
      <section className="relative overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-brand">
        {brandImages.heroSeaDrink ? (
          <img
            alt="Deniz kenarında Gülhan Kahvaltı içecek ve kahvaltı atmosferi"
            className="absolute inset-0 h-full w-full object-cover"
            src={brandImages.heroSeaDrink}
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,166,166,0.55),_transparent_34%),linear-gradient(135deg,#003f46_0%,#00a6a6_42%,#fff8ec_130%)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/20" />
        <div className="relative grid min-h-[520px] gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10 lg:py-16">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
              Ayaş sahilinde kahvaltı
            </p>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">{t('brand')}</h1>
              <p className="text-2xl font-semibold text-brand-accent sm:text-3xl">{siteSettings.slogan}</p>
              <p className="max-w-2xl text-base leading-8 text-slate-100 sm:text-lg">
                {siteSettings.description}
              </p>
            </div>
            <div className="grid gap-3 sm:flex sm:flex-wrap">
              <Link to="/menu">
                <Button>Menüye Göz At</Button>
              </Link>
              <Link to="/products">
                <span className="inline-flex min-h-10 items-center justify-center rounded-full border border-cyan-200 px-4 py-2 text-sm font-semibold text-cyan-50 transition hover:bg-white/10">
                  Ürünlerimizi İncele
                </span>
              </Link>
              <a
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand-accent px-4 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
                href={siteSettings.contact.phoneHref}
                rel="noreferrer"
                target="_blank"
              >
                WhatsApp’tan Ulaş
              </a>
            </div>
          </div>

          <VisualPanel
            alt="Gülhan Kahvaltı deniz manzarası ve sıcak mekan atmosferi"
            image={brandImages.seaView}
            label="Deniz kokusu, ev yapımı lezzetler ve sıcak sofralar"
          />
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        {[
          ['Deniz Kenarı Atmosfer', 'Ayaş’ta ferah, sakin ve aile dostu kahvaltı deneyimi.'],
          ['Ev Yapımı Lezzetler', 'Reçeller, turşular ve doğal ürünlerle sıcak yerel tatlar.'],
          ['Erdemli / Mersin', 'Lamos Otel yanı, kolay ulaşılabilir sahil lokasyonu.'],
        ].map(([title, description]) => (
          <article className="rounded-3xl border border-cyan-100 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900" key={title}>
            <h2 className="font-bold text-brand-text dark:text-white">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <VisualPanel
          alt="Bitkilerle sıcak Gülhan Kahvaltı giriş ve mekan atmosferi"
          image={brandImages.entrancePlants || brandImages.corridorPlace}
          label="Sıcak, doğal ve yerel bir mekan hissi"
          tone="cream"
        />
        <div className="rounded-3xl border border-cyan-100 bg-white p-6 shadow-sm sm:p-8 dark:border-white/10 dark:bg-slate-900">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-turquoise">Hakkımızda</p>
          <h2 className="mt-3 text-2xl font-bold text-brand-text sm:text-3xl dark:text-white">
            Kahvaltıyı deniz havası ve ev lezzetleriyle buluşturan yerel bir sofra
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
            Gülhan Kahvaltı, Ayaş’ın sakin atmosferinde ailece oturulabilecek sıcak bir kahvaltı deneyimi sunar.
            Menü sayfası restoran menüsünü tanıtır; Ürünlerimiz sayfası ise sipariş verilebilir ürünleri ve sepet akışını taşır.
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div className="rounded-3xl border border-cyan-100 bg-brand-light p-6 shadow-sm sm:p-8 dark:border-white/10 dark:bg-cyan-400/10">
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-800 dark:text-cyan-200">Ev yapımı ürünler</p>
          <h2 className="mt-3 text-2xl font-bold text-brand-text sm:text-3xl dark:text-white">
            Reçeller, turşular ve doğal kahvaltılık lezzetler
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
            Kavanozlarda hazırlanan ev yapımı ürünler, kahvaltı sofrasını tamamlayan doğal ve güvenilir tatlar sunar.
          </p>
          <Link className="mt-5 inline-flex" to="/products">
            <Button>Ürünlerimizi İncele</Button>
          </Link>
        </div>
        <VisualPanel
          alt="Gülhan Kahvaltı ev yapımı reçel ve kavanoz ürünleri"
          image={brandImages.homemadeJars || brandImages.jarLabel}
          label="Ev yapımı ürün görseli"
          tone="warm"
        />
      </section>

      <section className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-turquoise">Menü önizleme</p>
            <h2 className="mt-2 text-2xl font-bold text-brand-text dark:text-white">Restoran menüsü ve fiyatlar</h2>
          </div>
          <Link to="/menu">
            <Button variant="ghost">Menüye Göz At</Button>
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {menuPreview.map((section) => (
            <article className="rounded-3xl border border-cyan-100 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900" key={section.category}>
              <h3 className="font-bold text-brand-text dark:text-white">{section.category}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{section.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 rounded-[2rem] border border-cyan-100 bg-white p-6 shadow-sm lg:grid-cols-[1fr_0.9fr] lg:items-center dark:border-white/10 dark:bg-slate-900">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-turquoise">Konum & iletişim</p>
          <h2 className="mt-2 text-2xl font-bold text-brand-text dark:text-white">Ayaş’ta denize yakın sıcak kahvaltı durağı</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">{siteSettings.contact.address}</p>
          <div className="mt-5 grid gap-3 sm:flex sm:flex-wrap">
            <a className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand-turquoise px-4 text-sm font-semibold text-white transition hover:bg-cyan-700" href={siteSettings.contact.mapsHref} rel="noreferrer" target="_blank">
              Haritada Aç
            </a>
            <a className="inline-flex min-h-11 items-center justify-center rounded-full border border-cyan-200 px-4 text-sm font-semibold text-cyan-800 transition hover:bg-brand-light dark:text-cyan-100 dark:hover:bg-white/10" href={siteSettings.contact.phoneHref} rel="noreferrer" target="_blank">
              WhatsApp
            </a>
            <a className="inline-flex min-h-11 items-center justify-center rounded-full border border-cyan-200 px-4 text-sm font-semibold text-cyan-800 transition hover:bg-brand-light dark:text-cyan-100 dark:hover:bg-white/10" href={siteSettings.contact.emailHref}>
              E-posta
            </a>
          </div>
        </div>
        <div className="min-h-64 rounded-3xl bg-gradient-to-br from-brand-light via-white to-[#FFF8EC] p-5 dark:from-cyan-400/10 dark:via-slate-950 dark:to-slate-900">
          <div className="flex h-full min-h-56 items-center justify-center rounded-2xl border border-dashed border-cyan-200 text-center text-sm font-semibold text-cyan-800 dark:border-white/15 dark:text-cyan-100">
            Harita alanı
            <br />
            Performans için butonla Google Maps açılır.
          </div>
        </div>
      </section>
    </section>
  )
}

interface VisualPanelProps {
  alt: string
  image: string | null
  label: string
  tone?: 'sea' | 'cream' | 'warm'
}

function VisualPanel({ alt, image, label, tone = 'sea' }: VisualPanelProps) {
  const toneClass = {
    sea: 'from-cyan-400/30 via-brand-light to-white dark:from-cyan-400/20 dark:via-slate-900 dark:to-slate-950',
    cream: 'from-brand-light via-white to-[#FFF8EC] dark:from-cyan-400/15 dark:via-slate-900 dark:to-slate-950',
    warm: 'from-[#FFF8EC] via-white to-brand-light dark:from-amber-400/10 dark:via-slate-900 dark:to-cyan-400/10',
  }[tone]

  return (
    <div className={`min-h-72 overflow-hidden rounded-3xl border border-cyan-100 bg-gradient-to-br ${toneClass} p-4 shadow-sm dark:border-white/10`}>
      {image ? (
        <img alt={alt} className="h-full min-h-64 w-full rounded-2xl object-cover" loading="lazy" src={image} />
      ) : (
        <div className="flex h-full min-h-64 items-center justify-center rounded-2xl border border-dashed border-cyan-300/70 bg-white/35 p-5 text-center text-sm font-semibold text-cyan-900 dark:border-white/15 dark:bg-white/5 dark:text-cyan-100">
          {label}
        </div>
      )}
    </div>
  )
}
