import { motion } from 'framer-motion'
import { brandImages } from '../config/brandImages'
import { siteSettings } from '../config/siteSettings'

export function ContactPage() {
  return (
    <section className="space-y-8">
      <ContactHero />
      <div className="grid gap-5 lg:grid-cols-3">
        <AddressCard />
        <CommunicationCard />
        <SocialCard />
      </div>
    </section>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function ContactHero() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-brand">
      <img
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-15"
        loading="eager"
        src={brandImages.seaView}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="relative px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20"
        initial={{ opacity: 0, y: 22 }}
        transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">İletişim</p>
        <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
          Bize Ulaşın
        </h1>
        <p className="mt-5 max-w-lg text-base leading-8 text-slate-300">
          Kahvaltı, rezervasyon veya ürünler hakkında bilgi almak için WhatsApp, e-posta veya
          sosyal medya kanallarımızdan ulaşabilirsiniz.
        </p>
      </motion.div>
    </div>
  )
}

// ── Cards ─────────────────────────────────────────────────────────────────────

function AddressCard() {
  return (
    <motion.section
      className="flex flex-col gap-4 rounded-3xl border border-cyan-100 bg-white p-6 shadow-card transition-shadow duration-350 hover:shadow-card-hover dark:border-white/10 dark:bg-slate-900"
      initial={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ margin: '-60px', once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-light text-brand-turquoise dark:bg-cyan-400/10">
        <MapPinIcon />
      </div>
      <div>
        <h2 className="font-display text-xl font-bold text-brand-text dark:text-white">Adres</h2>
        <address className="mt-3 text-sm not-italic leading-7 text-slate-600 dark:text-slate-300">
          {siteSettings.contact.address}
        </address>
      </div>
      <div className="mt-auto pt-1">
        <a
          className="inline-flex min-h-11 items-center rounded-full bg-brand-turquoise px-5 text-sm font-semibold text-white transition duration-250 hover:bg-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-turquoise focus-visible:ring-offset-2 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
          href={siteSettings.contact.mapsHref}
          rel="noreferrer"
          target="_blank"
        >
          Haritada Aç
        </a>
      </div>
    </motion.section>
  )
}

function CommunicationCard() {
  return (
    <motion.section
      className="flex flex-col gap-4 rounded-3xl border border-emerald-100 bg-white p-6 shadow-card transition-shadow duration-350 hover:shadow-card-hover dark:border-white/10 dark:bg-slate-900"
      initial={{ opacity: 0, y: 24 }}
      transition={{ delay: 0.1, duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ margin: '-60px', once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400">
        <ChatBubbleIcon />
      </div>
      <div>
        <h2 className="font-display text-xl font-bold text-brand-text dark:text-white">İletişim</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
          Rezervasyon, sipariş ve bilgi için WhatsApp veya e-posta ile ulaşın.
        </p>
      </div>
      <div className="mt-auto flex flex-wrap gap-2 pt-1">
        <a
          className="inline-flex min-h-11 items-center rounded-full bg-emerald-500 px-5 text-sm font-semibold text-white transition duration-250 hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          href={siteSettings.contact.phoneHref}
          rel="noreferrer"
          target="_blank"
        >
          WhatsApp
        </a>
        <a
          className="inline-flex min-h-11 items-center rounded-full border border-cyan-200 px-5 text-sm font-semibold text-brand-turquoise transition duration-250 hover:bg-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-turquoise focus-visible:ring-offset-2 dark:border-cyan-400/30 dark:text-cyan-300 dark:hover:bg-cyan-400/10"
          href={siteSettings.contact.emailHref}
        >
          E-posta
        </a>
      </div>
    </motion.section>
  )
}

function SocialCard() {
  return (
    <motion.section
      className="flex flex-col gap-4 rounded-3xl border border-pink-100 bg-white p-6 shadow-card transition-shadow duration-350 hover:shadow-card-hover dark:border-white/10 dark:bg-slate-900"
      initial={{ opacity: 0, y: 24 }}
      transition={{ delay: 0.2, duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ margin: '-60px', once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-50 text-pink-500 dark:bg-pink-400/10 dark:text-pink-400">
        <HeartIcon />
      </div>
      <div>
        <h2 className="font-display text-xl font-bold text-brand-text dark:text-white">Sosyal Medya</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
          Güncel paylaşımlar ve duyurular için bizi takip edin.
        </p>
      </div>
      <div className="mt-auto flex flex-wrap gap-2 pt-1">
        <a
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-blue-600 px-5 text-sm font-semibold text-white transition duration-250 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          href={siteSettings.social.facebook}
          rel="noreferrer"
          target="_blank"
        >
          <FacebookIcon />
          Facebook
        </a>
        <a
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 px-5 text-sm font-semibold text-white transition duration-250 hover:from-pink-600 hover:to-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
          href={siteSettings.social.instagram}
          rel="noreferrer"
          target="_blank"
        >
          <InstagramIcon />
          Instagram
        </a>
      </div>
    </motion.section>
  )
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function MapPinIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
  )
}

function ChatBubbleIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
      />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
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
