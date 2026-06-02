import { siteSettings } from '../config/siteSettings'

export function ContactPage() {
  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-brand sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">İletişim</p>
        <h1 className="mt-3 text-3xl font-bold sm:text-5xl">Bize Ulaşın</h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          Kahvaltı, ürünler ve güncel bilgi için WhatsApp, e-posta veya sosyal medya kanallarımızdan ulaşabilirsiniz.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-3xl border border-cyan-100 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-slate-900">
          <h2 className="text-xl font-bold text-brand-text dark:text-white">Adres</h2>
          <address className="mt-3 text-base not-italic leading-7 text-slate-600 dark:text-slate-300">
            {siteSettings.contact.address}
          </address>
          <div className="mt-5 grid gap-3 sm:flex sm:flex-wrap">
            <a className="contact-action-primary" href={siteSettings.contact.mapsHref} rel="noreferrer" target="_blank">
              Haritada Aç
            </a>
            <a className="contact-action-secondary" href={siteSettings.contact.phoneHref} rel="noreferrer" target="_blank">
              WhatsApp
            </a>
            <a className="contact-action-secondary" href={siteSettings.contact.emailHref}>
              E-posta
            </a>
          </div>
        </section>

        <section className="rounded-3xl border border-cyan-100 bg-brand-light p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-cyan-400/10">
          <h2 className="text-xl font-bold text-brand-text dark:text-white">Sosyal Medya</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Güncel paylaşımlar ve duyurular için bizi takip edin.
          </p>
          <div className="mt-5 grid gap-3 sm:flex sm:flex-wrap">
            <a className="contact-action-secondary" href={siteSettings.social.facebook} rel="noreferrer" target="_blank">
              Facebook
            </a>
            <a className="contact-action-secondary" href={siteSettings.social.instagram} rel="noreferrer" target="_blank">
              Instagram
            </a>
          </div>
        </section>
      </div>
    </section>
  )
}
