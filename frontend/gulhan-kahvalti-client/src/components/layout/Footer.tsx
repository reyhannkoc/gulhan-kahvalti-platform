import { Link } from 'react-router-dom'
import { siteSettings } from '../../config/siteSettings'
import { GulhanLogo } from '../ui/GulhanLogo'

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        <section className="space-y-5">
          <div className="flex items-center gap-4">
            <GulhanLogo className="h-14 w-auto shrink-0 text-cyan-300" />
            <div>
              <p className="text-lg font-semibold text-white">{siteSettings.businessName}</p>
              <p className="text-sm text-cyan-300/80">{siteSettings.slogan}</p>
            </div>
          </div>

          <address className="max-w-sm text-sm not-italic leading-6 text-slate-400">
            {siteSettings.contact.address}
          </address>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              className="footer-button-primary"
              href={siteSettings.contact.phoneHref}
              rel="noreferrer"
              target="_blank"
            >
              WhatsApp
            </a>
            <a className="footer-button-secondary" href={siteSettings.contact.emailHref}>
              E-posta
            </a>
            <a
              className="footer-button-secondary"
              href={siteSettings.contact.mapsHref}
              rel="noreferrer"
              target="_blank"
            >
              Haritada Aç
            </a>
          </div>
        </section>

        <section className="grid gap-7 sm:grid-cols-2 md:pt-2">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Kurumsal</h2>
            <nav aria-label="Kurumsal bağlantılar" className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
              <Link className="transition duration-200 hover:text-cyan-200" to="/about">
                Hakkımızda
              </Link>
              <Link className="transition duration-200 hover:text-cyan-200" to="/contact">
                İletişim
              </Link>
            </nav>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Ürünlerimiz</h2>
            <nav aria-label="Menü ve ürün bağlantıları" className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
              <Link className="transition duration-200 hover:text-cyan-200" to="/menu">
                Menü
              </Link>
              <Link className="transition duration-200 hover:text-cyan-200" to="/products">
                Ürünlerimiz
              </Link>
            </nav>
          </div>
        </section>

        <section className="space-y-5 md:col-span-2 lg:col-span-1 lg:pt-2">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Bizi Takip Edin</h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
              {siteSettings.footer.followText}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              className="social-button"
              href={siteSettings.social.facebook}
              rel="noreferrer"
              target="_blank"
            >
              <FacebookIcon />
              Facebook
            </a>
            <a
              className="social-button"
              href={siteSettings.social.instagram}
              rel="noreferrer"
              target="_blank"
            >
              <InstagramIcon />
              Instagram
            </a>
          </div>
        </section>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {siteSettings.businessName}
          </p>
          <p>Deniz kokusu, ev yapımı lezzetler ve sıcak kahvaltı sofraları.</p>
        </div>
      </div>
    </footer>
  )
}

function FacebookIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <rect height="16" rx="5" width="16" x="4" y="4" />
      <circle cx="12" cy="12" r="3.25" />
      <circle cx="17" cy="7" fill="currentColor" r="1" />
    </svg>
  )
}
