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
              <p className="text-sm text-cyan-100">{siteSettings.slogan}</p>
            </div>
          </div>

          <address className="max-w-sm text-sm not-italic leading-6 text-slate-300">
            {siteSettings.contact.address}
          </address>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a className="footer-button-primary" href={siteSettings.contact.phoneHref} rel="noreferrer" target="_blank">
              WhatsApp
            </a>
            <a className="footer-button-secondary" href={siteSettings.contact.emailHref}>
              E-posta
            </a>
            <a className="footer-button-secondary" href={siteSettings.contact.mapsHref} rel="noreferrer" target="_blank">
              Haritada Aç
            </a>
          </div>
        </section>

        <section className="grid gap-7 sm:grid-cols-2 md:pt-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-cyan-200">Kurumsal</h2>
            <nav className="mt-4 flex flex-col gap-3 text-sm text-slate-300" aria-label="Kurumsal bağlantılar">
              <Link className="transition hover:text-cyan-200" to="/about">Hakkımızda</Link>
              <Link className="transition hover:text-cyan-200" to="/contact">İletişim</Link>
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-cyan-200">Ürünlerimiz</h2>
            <nav className="mt-4 flex flex-col gap-3 text-sm text-slate-300" aria-label="Menü ve ürün bağlantıları">
              <Link className="transition hover:text-cyan-200" to="/menu">Menü</Link>
              <Link className="transition hover:text-cyan-200" to="/products">Ürünlerimiz</Link>
            </nav>
          </div>
        </section>

        <section className="space-y-5 md:col-span-2 lg:col-span-1 lg:pt-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-cyan-200">Bizi Takip Edin</h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300">{siteSettings.footer.followText}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a className="social-button" href={siteSettings.social.facebook} rel="noreferrer" target="_blank">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400 text-sm font-bold text-slate-950">f</span>
              Facebook
            </a>
            <a className="social-button" href={siteSettings.social.instagram} rel="noreferrer" target="_blank">
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
          <p>Deniz kokusu, ev yapımı lezzetler ve sıcak kahvaltı sofraları.</p>
        </div>
      </div>
    </footer>
  )
}
