import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { brandImages } from '../config/brandImages'
import { siteSettings } from '../config/siteSettings'

export function AboutPage() {
  return (
    <section className="space-y-8">
      <div className="grid gap-6 rounded-[2rem] border border-cyan-100 bg-white p-6 shadow-sm lg:grid-cols-[1fr_0.95fr] lg:items-center dark:border-white/10 dark:bg-slate-900">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-turquoise">Hakkımızda</p>
          <div>
            <h1 className="text-3xl font-bold text-brand-text sm:text-5xl dark:text-white">{siteSettings.businessName}</h1>
            <p className="mt-3 text-2xl font-semibold text-brand-accent">{siteSettings.slogan}</p>
          </div>
          <p className="max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
            Deniz kenarı Ayaş atmosferinde, ev yapımı lezzetler ve aile sıcaklığıyla kahvaltı kültürünü yaşatan yerel bir işletmeyiz.
            Gülhan Kahvaltı’da amaç sade, güvenilir ve sıcak bir sofra deneyimi sunmak.
          </p>
          <div className="grid gap-3 sm:flex sm:flex-wrap">
            <Link to="/menu">
              <Button>Menüye Göz At</Button>
            </Link>
            <Link to="/products">
              <Button variant="ghost">Ürünlerimizi İncele</Button>
            </Link>
            <a
              className="inline-flex min-h-10 items-center justify-center rounded-full bg-brand-accent px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
              href={siteSettings.contact.phoneHref}
              rel="noreferrer"
              target="_blank"
            >
              WhatsApp’tan Ulaş
            </a>
          </div>
        </div>

        <VisualBlock
          alt="Gülhan Kahvaltı mekan ve deniz kenarı atmosferi"
          image={brandImages.entrancePlants || brandImages.corridorPlace || brandImages.seaView}
          label="Mekan, sahil ve sıcak işletme atmosferi görseli"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          ['Deniz Kenarı', 'Ayaş/Erdemli lokasyonunun ferah sahil hissi.'],
          ['Ev Yapımı', 'Reçel, turşu ve kahvaltılık doğal lezzetler.'],
          ['Aile Sıcaklığı', 'Sade, güvenilir ve samimi kahvaltı deneyimi.'],
        ].map(([title, text]) => (
          <article className="rounded-3xl border border-cyan-100 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900" key={title}>
            <h2 className="font-bold text-brand-text dark:text-white">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function VisualBlock({ alt, image, label }: { alt: string; image: string | null; label: string }) {
  return (
    <div className="min-h-80 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-light via-white to-[#FFF8EC] p-4 dark:from-cyan-400/10 dark:via-slate-950 dark:to-slate-900">
      {image ? (
        <img alt={alt} className="h-full min-h-72 w-full rounded-2xl object-cover" loading="lazy" src={image} />
      ) : (
        <div className="flex h-full min-h-72 items-center justify-center rounded-2xl border border-dashed border-cyan-300 bg-white/40 p-5 text-center text-sm font-semibold text-cyan-900 dark:border-white/15 dark:bg-white/5 dark:text-cyan-100">
          {label}
        </div>
      )}
    </div>
  )
}
