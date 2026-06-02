import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { brandImages } from '../config/brandImages'
import { siteSettings } from '../config/siteSettings'

export function AboutPage() {
  return (
    <section className="space-y-16 sm:space-y-20">
      <AboutHero />
      <ValuesSection />
      <StorySection />
      <CTASection />
    </section>
  )
}

// ── Static data ───────────────────────────────────────────────────────────────

const values = [
  {
    icon: <CoastalIcon />,
    title: 'Deniz Kenarı',
    body: 'Ayaş / Erdemli lokasyonunun ferah sahil hissi. Deniz kokusu eşliğinde güne başlamak için ideal.',
  },
  {
    icon: <JarIcon />,
    title: 'Ev Yapımı',
    body: 'Reçel, turşu ve kahvaltılık doğal lezzetler. Her ürün sevgiyle hazırlanır, sofranıza sıcaklık katar.',
  },
  {
    icon: <UsersIcon />,
    title: 'Aile Sıcaklığı',
    body: 'Sade, güvenilir ve samimi kahvaltı deneyimi. Her misafirimize ev sıcaklığıyla karşılık veriyoruz.',
  },
]

// ── Hero ──────────────────────────────────────────────────────────────────────

function AboutHero() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-brand">
      <img
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-20"
        loading="eager"
        src={brandImages.corridorPlace}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="relative px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20"
        initial={{ opacity: 0, y: 22 }}
        transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">Hakkımızda</p>
        <h1 className="mt-4 max-w-xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
          {siteSettings.businessName}
        </h1>
        <p className="mt-3 font-display text-xl italic text-brand-accent sm:text-2xl">
          {siteSettings.slogan}
        </p>
        <p className="mt-5 max-w-lg text-base leading-8 text-slate-300">
          Deniz kenarı Ayaş atmosferinde, ev yapımı lezzetler ve aile sıcaklığıyla kahvaltı kültürünü
          yaşatan yerel bir işletmeyiz.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            className="inline-flex min-h-[2.75rem] items-center rounded-full bg-brand-accent px-6 text-sm font-bold text-slate-950 shadow-warm transition duration-250 hover:bg-amber-300 hover:shadow-warm-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            to="/menu"
          >
            Menüyü İncele
          </Link>
          <Link
            className="inline-flex min-h-[2.75rem] items-center rounded-full border-2 border-white/40 px-6 text-sm font-semibold text-white backdrop-blur-sm transition duration-250 hover:border-white/70 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            to="/products"
          >
            Ürünlerimiz
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

// ── Values ────────────────────────────────────────────────────────────────────

function ValuesSection() {
  return (
    <section>
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ margin: '-60px', once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-turquoise">
          Değerlerimiz
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-brand-text dark:text-white sm:text-4xl">
          Bizi Biz Yapan
        </h2>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-3">
        {values.map(({ icon, title, body }, i) => (
          <motion.article
            key={title}
            className="flex flex-col gap-4 rounded-3xl border border-cyan-100 bg-white p-6 shadow-card transition-shadow duration-350 hover:shadow-card-hover dark:border-white/10 dark:bg-slate-900"
            initial={{ opacity: 0, y: 28 }}
            transition={{ delay: i * 0.12, duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ margin: '-60px', once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-light text-brand-turquoise dark:bg-cyan-400/10">
              {icon}
            </div>
            <div>
              <h3 className="font-semibold text-brand-text dark:text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{body}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

// ── Story ─────────────────────────────────────────────────────────────────────

function StorySection() {
  return (
    <section className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
      <motion.div
        className="overflow-hidden rounded-3xl shadow-brand-md"
        initial={{ opacity: 0, x: -36 }}
        transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ margin: '-80px', once: true }}
        whileInView={{ opacity: 1, x: 0 }}
      >
        <img
          alt="Gülhan Kahvaltı iç mekan — sıcak atmosfer"
          className="h-[440px] w-full object-cover"
          loading="lazy"
          src={brandImages.entrancePlants}
        />
      </motion.div>

      <motion.div
        className="space-y-5"
        initial={{ opacity: 0, x: 36 }}
        transition={{ delay: 0.12, duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ margin: '-80px', once: true }}
        whileInView={{ opacity: 1, x: 0 }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-turquoise">
          Hikayemiz
        </p>
        <h2 className="font-display text-3xl font-bold leading-snug text-brand-text dark:text-white sm:text-4xl">
          Kahvaltıyı tutku ve özenle
          <br className="hidden sm:block" /> yaşatan bir sofra
        </h2>
        <blockquote className="border-l-2 border-brand-turquoise pl-5">
          <p className="font-display text-lg italic leading-8 text-slate-600 dark:text-slate-300">
            "Her sabah misafirlerimiz için en iyisini yapmak, en büyük motivasyonumuz."
          </p>
        </blockquote>
        <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
          Gülhan Kahvaltı, Ayaş'ın sakin sahilinde 8 yılı aşkın süredir ailece kahvaltı deneyimi
          sunmaktadır. Doğal ürünler, taze malzemeler ve ev yapımı lezzetlerle misafirlerimizin güne
          güzel bir başlangıç yapmasına yardımcı oluyoruz.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link to="/contact">
            <Button>İletişime Geç</Button>
          </Link>
          <a
            className="inline-flex min-h-11 items-center rounded-full border border-cyan-200 px-5 text-sm font-semibold text-brand-turquoise transition duration-250 hover:bg-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-turquoise focus-visible:ring-offset-2 dark:border-cyan-400/30 dark:text-cyan-300 dark:hover:bg-cyan-400/10"
            href={siteSettings.contact.phoneHref}
            rel="noreferrer"
            target="_blank"
          >
            WhatsApp ile Ulaş
          </a>
        </div>
      </motion.div>
    </section>
  )
}

// ── CTA strip ─────────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <motion.section
      className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-turquoise to-brand-deep p-8 text-center text-white shadow-brand-md sm:p-12"
      initial={{ opacity: 0, y: 32 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ margin: '-80px', once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <h2 className="font-display text-2xl font-bold sm:text-3xl">
        Deniz kenarında bir kahvaltı sizi bekliyor
      </h2>
      <p className="mt-3 text-base leading-7 text-white/80">
        Rezervasyon veya bilgi için WhatsApp'tan ulaşın ya da menümüze göz atın.
      </p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <a
          className="inline-flex min-h-[2.75rem] items-center rounded-full bg-white px-7 text-sm font-bold text-brand-turquoise shadow-brand-sm transition hover:bg-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-turquoise"
          href={siteSettings.contact.phoneHref}
          rel="noreferrer"
          target="_blank"
        >
          WhatsApp ile Ulaş
        </a>
        <Link
          className="inline-flex min-h-[2.75rem] items-center rounded-full border-2 border-white/50 px-7 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-turquoise"
          to="/menu"
        >
          Menüye Bak
        </Link>
      </div>
    </motion.section>
  )
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function CoastalIcon() {
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
        d="M3 9c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 14c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0"
      />
    </svg>
  )
}

function JarIcon() {
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

function UsersIcon() {
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
        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
      />
    </svg>
  )
}
