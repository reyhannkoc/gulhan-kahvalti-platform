import { Link } from 'react-router-dom'
import { siteSettings } from '../../config/siteSettings'

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        <section className="space-y-5">
          <div className="flex items-center gap-4">
            <div
              aria-label="Logo alanı"
              className="h-16 w-16 shrink-0 rounded-2xl border border-dashed border-cyan-300/60 bg-white/5"
            />
            <div>
              <p className="text-lg font-semibold text-white">{siteSettings.businessName}</p>
              <p className="text-sm text-cyan-100">Kahvaltı & yöresel lezzetler</p>
            </div>
          </div>

          <address className="max-w-sm text-sm not-italic leading-6 text-slate-300">
            {siteSettings.contact.address}
          </address>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-cyan-500 px-5 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950"
              href={siteSettings.contact.phoneHref}
            >
              Bizi Arayın
            </a>
            <a
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-cyan-300/70 px-5 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-400/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950"
              href={siteSettings.contact.emailHref}
            >
              E-mail
            </a>
          </div>
        </section>

        <section className="grid gap-7 sm:grid-cols-2 md:pt-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-cyan-200">Kurumsal</h2>
            <nav className="mt-4 flex flex-col gap-3 text-sm text-slate-300" aria-label="Kurumsal bağlantılar">
              <Link className="transition hover:text-cyan-200" to="/">
                Hakkımızda
              </Link>
              <Link className="transition hover:text-cyan-200" to="/">
                İletişim
              </Link>
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-cyan-200">Ürünlerimiz</h2>
            <nav className="mt-4 flex flex-col gap-3 text-sm text-slate-300" aria-label="Ürün bağlantıları">
              <Link className="transition hover:text-cyan-200" to="/menu">
                Menü
              </Link>
            </nav>
          </div>
        </section>

        <section className="space-y-5 md:col-span-2 lg:col-span-1 lg:pt-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-cyan-200">Bizi Takip Edin</h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300">{siteSettings.footer.followText}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 text-sm font-semibold text-white transition hover:border-cyan-300 hover:bg-cyan-400/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950"
              href={siteSettings.social.facebook}
              rel="noreferrer"
              target="_blank"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400 text-sm font-bold text-slate-950">
                f
              </span>
              Facebook
            </a>
            <a
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 text-sm font-semibold text-white transition hover:border-cyan-300 hover:bg-cyan-400/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950"
              href={siteSettings.social.instagram}
              rel="noreferrer"
              target="_blank"
            >
              <svg aria-hidden="true" className="h-5 w-5 text-cyan-200" fill="none" viewBox="0 0 24 24">
                <rect height="16" rx="5" stroke="currentColor" strokeWidth="2" width="16" x="4" y="4" />
                <circle cx="12" cy="12" r="3.25" stroke="currentColor" strokeWidth="2" />
                <circle cx="17" cy="7" fill="currentColor" r="1" />
              </svg>
              Instagram
            </a>
          </div>
        </section>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} {siteSettings.businessName}</p>
          <p>Turkuaz ve beyaz marka yönü için hazırlanmış MVP footer.</p>
        </div>
      </div>
    </footer>
  )
}
