import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { brandImages } from '../config/brandImages'
import { restaurantMenu } from '../config/restaurantMenu'
import { siteSettings } from '../config/siteSettings'
import { useLanguage } from '../hooks/useLanguage'

export function HomePage() {
  return (
    <section className="space-y-16 sm:space-y-20">
      <HeroSection />
      <FeatureStrip />
      <StorySection />
      <MenuShowcase />
      <TestimonialsSection />
      <HomemadeProductsSection />
      <InstagramSection />
      <ContactSection />
    </section>
  )
}

// ── Static data ───────────────────────────────────────────────────────────────

const testimonials = [
  {
    name: 'Ayşe K.',
    location: 'Mersin',
    stars: 5,
    text: 'Deniz kenarında yediğimiz kahvaltı harikaydı. Ev yapımı reçelleri ve taze ürünleri gerçekten özeldi. Ailecek çok beğendik, tekrar geleceğiz.',
  },
  {
    name: 'Mehmet A.',
    location: 'Adana',
    stars: 5,
    text: 'Serpme kahvaltıları çok doyurucu ve lezzetliydi. Personel sıcakkanlı, mekan temiz ve sahil manzarası muhteşem. Kesinlikle tavsiye ederim.',
  },
  {
    name: 'Zeynep T.',
    location: 'İstanbul',
    stars: 5,
    text: 'Tatilden dönerken uğradık, mükemmel bir deneyimdi. Gözlemeler ve menemen favorimiz oldu. Bu güzelliği herkes tatmalı!',
  },
]

const features = [
  {
    icon: <SeaAtmosphereIcon />,
    title: 'Deniz Kenarı Atmosfer',
    body: "Mersin'de ferah, sakin ve aile dostu kahvaltı deneyimi. Dalga sesi eşliğinde sabah keyfi.",
  },
  {
    icon: <HomemadeIcon />,
    title: 'Ev Yapımı Lezzetler',
    body: 'Reçeller, turşular ve doğal ürünlerle sıcak yerel tatlar. Her kaşıkta özen var.',
  },
  {
    icon: <LocationPinIcon />,
    title: 'Erdemli / Mersin',
    body: 'Lamos Otel yanı, kolay ulaşılabilir sahil lokasyonu. Rezervasyon için arayabilirsiniz.',
  },
]

// ── Framer Motion variants ────────────────────────────────────────────────────

const heroContainer = {
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.15 } },
}

const heroItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.78, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

// ── Section: Feature Strip ────────────────────────────────────────────────────

function FeatureStrip() {
  return (
    <section className="grid gap-5 sm:grid-cols-3">
      {features.map(({ icon, title, body }, i) => (
        <motion.article
          key={title}
          className="flex flex-col gap-4 rounded-3xl border border-cyan-100 bg-white p-6 shadow-card transition duration-350 hover:shadow-card-hover dark:border-white/10 dark:bg-slate-900"
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
    </section>
  )
}

// ── Section: Story / About ────────────────────────────────────────────────────

function StorySection() {
  return (
    <section className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
      <motion.div
        className="relative"
        initial={{ opacity: 0, x: -36 }}
        transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ margin: '-80px', once: true }}
        whileInView={{ opacity: 1, x: 0 }}
      >
        <div className="overflow-hidden rounded-3xl shadow-brand-md">
          <img
            alt="Gülhan Kahvaltı mekan girişi — Ayaş sahili"
            className="h-[440px] w-full object-cover"
            loading="lazy"
            src={brandImages.entrancePlants}
          />
        </div>
        {/* Floating stat card */}
        <div className="absolute -bottom-5 -right-2 rounded-2xl bg-white p-4 shadow-card-hover dark:bg-slate-900 sm:-right-4">
          <p className="text-2xl font-bold text-brand-turquoise">8+</p>
          <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">Yıllık Deneyim</p>
        </div>
      </motion.div>

      <motion.div
        className="space-y-5"
        initial={{ opacity: 0, x: 36 }}
        transition={{ delay: 0.12, duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ margin: '-80px', once: true }}
        whileInView={{ opacity: 1, x: 0 }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-turquoise">Hikayemiz</p>
        <h2 className="font-display text-3xl font-bold leading-snug text-brand-text dark:text-white sm:text-4xl">
          Kahvaltıyı deniz havası ve{' '}
          <br className="hidden sm:block" />
          ev lezzetleriyle buluşturan{' '}
          <br className="hidden sm:block" />
          yerel bir sofra
        </h2>
        <blockquote className="border-l-2 border-brand-turquoise pl-5">
          <p className="font-display text-lg italic leading-8 text-slate-600 dark:text-slate-300">
            "Kahvaltı sadece bir öğün değil; güne güzel bir başlangıçtır."
          </p>
        </blockquote>
        <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
          Gülhan Kahvaltı, Ayaş'ın sakin atmosferinde ailece oturulabilecek sıcak bir kahvaltı
          deneyimi sunar. Hikayemiz, kahvaltı kültürünü doğal ürünler ve yerel sıcaklıkla yaşatmaya
          dayanır.
        </p>
        <Link className="inline-flex" to="/about">
          <Button variant="ghost">Hakkımızda Daha Fazla</Button>
        </Link>
      </motion.div>
    </section>
  )
}

// ── Section: Menu Showcase (dark cinematic) ───────────────────────────────────

function MenuShowcase() {
  const categories = restaurantMenu.slice(0, 3)

  return (
    <section className="-mx-3 overflow-hidden sm:-mx-4">
      <div className="relative bg-slate-950 px-5 py-16 sm:px-10 sm:py-20 lg:px-16">
        {/* Background image with overlay */}
        <img
          alt="Gülhan Kahvaltı kahvaltı sofrası"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
          loading="lazy"
          src={brandImages.menuPhoto}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/55 to-slate-950/88" />

        <div className="relative">
          {/* Header */}
          <motion.div
            className="mb-10 text-center"
            initial={{ opacity: 0, y: 28 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-accent">
              Lezzetlerimiz
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
              Özenle Hazırlanan Menü
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-400">
              Taze ve yerel malzemelerle her gün hazırlanan kahvaltı sofrası.
            </p>
          </motion.div>

          {/* Category cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.category}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                initial={{ opacity: 0, y: 24 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <h3 className="font-semibold text-white">{cat.category}</h3>
                <p className="mt-1 text-sm text-slate-400">{cat.description}</p>
                <ul className="mt-4 space-y-2.5 border-t border-white/10 pt-4">
                  {cat.items.slice(0, 2).map((item) => (
                    <li key={item.name} className="flex items-center justify-between gap-2">
                      <span className="text-sm text-slate-300">{item.name}</span>
                      <span className="shrink-0 text-sm font-semibold text-brand-accent">
                        {item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1 }}
          >
            <Link
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/25 px-8 py-3 text-sm font-semibold text-white transition duration-300 hover:border-white/55 hover:bg-white/10"
              to="/menu"
            >
              Tam Menüyü Görüntüle
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ── Section: Testimonials ─────────────────────────────────────────────────────

function TestimonialsSection() {
  return (
    <section className="space-y-8">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-turquoise">
          Misafir Yorumları
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-brand-text dark:text-white sm:text-4xl">
          Misafirlerimiz Ne Diyor?
        </h2>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-3">
        {testimonials.map((testimonial, i) => (
          <motion.article
            key={testimonial.name}
            className="flex flex-col gap-4 rounded-3xl border border-cyan-100 bg-white p-6 shadow-card transition duration-350 hover:shadow-card-hover dark:border-white/10 dark:bg-slate-900"
            initial={{ opacity: 0, y: 28 }}
            transition={{ delay: i * 0.12, duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="flex gap-0.5">
              {Array.from({ length: testimonial.stars }).map((_, s) => (
                <StarIcon key={s} />
              ))}
            </div>
            <p className="flex-1 text-sm leading-7 text-slate-600 dark:text-slate-300">
              "{testimonial.text}"
            </p>
            <div className="flex items-center gap-3 border-t border-slate-100 pt-4 dark:border-white/10">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-light text-sm font-semibold text-brand-turquoise dark:bg-cyan-400/15">
                {testimonial.name[0]}
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-text dark:text-white">
                  {testimonial.name}
                </p>
                <p className="text-xs text-slate-400">{testimonial.location}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

// ── Section: Homemade Products ────────────────────────────────────────────────

function HomemadeProductsSection() {
  return (
    <section className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
      <motion.div
        className="space-y-5 rounded-3xl border border-amber-100/80 bg-gradient-to-br from-brand-cream to-white p-6 sm:p-8 dark:border-amber-400/10 dark:from-amber-400/5 dark:to-slate-900"
        initial={{ opacity: 0, x: -36 }}
        transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ margin: '-80px', once: true }}
        whileInView={{ opacity: 1, x: 0 }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
          Ev Yapımı Ürünler
        </p>
        <h2 className="font-display text-3xl font-bold leading-snug text-brand-text dark:text-white sm:text-4xl">
          Reçeller, turşular ve{' '}
          <br className="hidden sm:block" />
          doğal kahvaltılık lezzetler
        </h2>
        <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
          Kavanozlarda hazırlanan ev yapımı ürünler, kahvaltı sofrasını tamamlayan doğal ve güvenilir
          tatlar sunar. Sipariş vererek sevdiklerinize ulaştırabilirsiniz.
        </p>
        <ul className="space-y-2.5">
          {['Mevsim Reçelleri', 'Ev Yapımı Turşular', 'Doğal Bal & Kaymak', 'Yöresel Peynirler'].map(
            (item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                {item}
              </li>
            ),
          )}
        </ul>
        <Link className="inline-flex" to="/products">
          <Button>Ürünlerimizi İncele</Button>
        </Link>
      </motion.div>

      <motion.div
        className="overflow-hidden rounded-3xl shadow-warm-lg"
        initial={{ opacity: 0, x: 36 }}
        transition={{ delay: 0.12, duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ margin: '-80px', once: true }}
        whileInView={{ opacity: 1, x: 0 }}
      >
        <img
          alt="Gülhan Kahvaltı ev yapımı kavanoz ürünleri"
          className="h-full min-h-72 w-full object-cover"
          loading="lazy"
          src={brandImages.homemadeJars}
        />
      </motion.div>
    </section>
  )
}

// ── Section: Instagram / Social Proof ────────────────────────────────────────

function InstagramSection() {
  const gridImages = [
    brandImages.heroSeaDrink,
    brandImages.menuPhoto,
    brandImages.homemadeJars,
    brandImages.entrancePlants,
    brandImages.seaView,
    brandImages.corridorPlace,
  ]

  return (
    <motion.section
      className="overflow-hidden rounded-[2rem] border border-pink-100 bg-gradient-to-br from-pink-50 via-white to-amber-50 p-6 text-center sm:p-10 dark:border-pink-400/10 dark:from-pink-400/5 dark:via-slate-900 dark:to-amber-400/5"
      initial={{ opacity: 0, y: 32 }}
      transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ margin: '-80px', once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="mx-auto max-w-lg">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-amber-500 text-white shadow-warm">
          <InstagramIcon />
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-600 dark:text-pink-400">
          Instagram
        </p>
        <h2 className="mt-2 font-display text-2xl font-bold text-brand-text dark:text-white sm:text-3xl">
          @gulhankahvalti
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
          {siteSettings.footer.followText}
        </p>

        {/* 6-image grid */}
        <div className="my-7 grid grid-cols-3 gap-1.5 overflow-hidden rounded-2xl">
          {gridImages.map((img, i) => (
            <div key={i} className="aspect-square overflow-hidden">
              <img
                alt={`Instagram paylaşımı ${i + 1}`}
                className="h-full w-full object-cover transition duration-450 hover:scale-105"
                loading="lazy"
                src={img}
              />
            </div>
          ))}
        </div>

        <a
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-amber-500 px-7 py-3 text-sm font-bold text-white shadow-warm transition hover:shadow-warm-lg"
          href={siteSettings.social.instagram}
          rel="noreferrer"
          target="_blank"
        >
          Instagram'da Takip Et
        </a>
      </div>
    </motion.section>
  )
}

// ── Section: Contact ──────────────────────────────────────────────────────────

function ContactSection() {
  return (
    <motion.section
      className="grid gap-6 overflow-hidden rounded-[2rem] border border-cyan-100 bg-white p-6 shadow-brand-sm lg:grid-cols-2 lg:items-center dark:border-white/10 dark:bg-slate-900"
      initial={{ opacity: 0, y: 32 }}
      transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ margin: '-80px', once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="space-y-5">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-turquoise">İletişim</p>
        <h2 className="font-display text-2xl font-bold text-brand-text dark:text-white sm:text-3xl">
          Ayaş'ta denize yakın{' '}
          <br className="hidden sm:block" />
          sıcak kahvaltı durağı
        </h2>
        <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">
          {siteSettings.contact.address}
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-turquoise px-5 py-2.5 text-sm font-semibold text-white transition duration-250 hover:bg-brand-deep"
            href={siteSettings.contact.mapsHref}
            rel="noreferrer"
            target="_blank"
          >
            <MapPinMiniIcon />
            Haritada Aç
          </a>
          <a
            className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 px-5 py-2.5 text-sm font-semibold text-emerald-700 transition duration-250 hover:bg-emerald-50 dark:border-emerald-400/30 dark:text-emerald-400 dark:hover:bg-emerald-400/10"
            href={siteSettings.contact.phoneHref}
            rel="noreferrer"
            target="_blank"
          >
            <WhatsAppMiniIcon />
            WhatsApp
          </a>
          <Link
            className="inline-flex items-center rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition duration-250 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
            to="/contact"
          >
            İletişim Sayfası
          </Link>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="flex min-h-60 flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-light to-white p-6 text-center dark:from-cyan-400/10 dark:to-slate-800">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-turquoise/10 text-brand-turquoise">
          <MapPinLargeIcon />
        </div>
        <div>
          <p className="font-semibold text-brand-text dark:text-white">Konumumuzu Görmek İçin</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Google Haritalar'da açmak için tıklayın
          </p>
        </div>
        <a
          className="rounded-full bg-brand-turquoise px-6 py-2 text-sm font-semibold text-white transition hover:bg-brand-deep"
          href={siteSettings.contact.mapsHref}
          rel="noreferrer"
          target="_blank"
        >
          Haritayı Aç
        </a>
      </div>
    </motion.section>
  )
}

// ── Hero Section ──────────────────────────────────────────────────────────────

function HeroSection() {
  const { t } = useLanguage()

  return (
    // Negative margins escape MainLayout's px-3/px-4 and pt-5/pt-8 padding
    <section className="-mx-3 -mt-5 relative overflow-hidden bg-slate-950 text-white sm:-mx-4 sm:-mt-8">
      {/* Background — Ken Burns subtle zoom on entrance */}
      <motion.img
        alt="Gülhan Kahvaltı deniz kenarı sıcak kahvaltı atmosferi"
        animate={{ scale: 1 }}
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.06 }}
        transition={{ duration: 2.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        src={brandImages.heroSeaDrink}
      />

      {/* Cinematic overlay stack */}
      {/* Layer 1: horizontal — deep left for text, image bleeds through on right */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/72 to-slate-950/28" />
      {/* Layer 2: vertical vignette — seals bottom for scroll indicator legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/30" />
      {/* Layer 3: brand tint — ties the photo to the turquoise palette */}
      <div className="absolute inset-0 bg-brand-turquoise/[0.07]" />

      {/* Content */}
      <motion.div
        animate="visible"
        className="relative flex min-h-[100svh] flex-col justify-center px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32"
        initial="hidden"
        variants={heroContainer}
      >
        {/* Eyebrow */}
        <motion.p
          className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300"
          variants={heroItem}
        >
          Ayaş sahilinde deniz kenarı kahvaltı
        </motion.p>

        {/* Brand name — Playfair Display via font-display class */}
        <motion.h1
          className="mt-4 max-w-2xl font-display text-5xl font-bold leading-[1.08] text-white sm:text-6xl lg:text-[4.5rem] xl:text-[5rem]"
          variants={heroItem}
        >
          {t('brand')}
        </motion.h1>

        {/* Slogan — italic, warm accent */}
        <motion.p
          className="mt-4 font-display text-xl font-medium italic text-brand-accent sm:text-2xl"
          variants={heroItem}
        >
          {siteSettings.slogan}
        </motion.p>

        {/* Description */}
        <motion.p
          className="mt-5 max-w-md text-base leading-[1.78] text-slate-200 sm:max-w-lg sm:text-lg"
          variants={heroItem}
        >
          {siteSettings.description}
        </motion.p>

        {/* CTA pair */}
        <motion.div
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          variants={heroItem}
        >
          {/* Primary — warm gold, maximum contrast on dark background */}
          <Link
            className="inline-flex min-h-[3rem] items-center justify-center rounded-full bg-brand-accent px-7 text-sm font-bold text-slate-950 shadow-warm transition duration-250 ease-luxury hover:bg-amber-300 hover:shadow-warm-lg sm:text-base"
            to="/products"
          >
            Hemen Sipariş Ver
          </Link>

          {/* Secondary — glass / frosted border */}
          <Link
            className="inline-flex min-h-[3rem] items-center justify-center rounded-full border-2 border-white/40 px-7 text-sm font-semibold text-white backdrop-blur-sm transition duration-250 ease-luxury hover:border-white/70 hover:bg-white/10 sm:text-base"
            to="/menu"
          >
            Menüyü İncele
          </Link>
        </motion.div>

        {/* WhatsApp trust signal — tertiary, below CTAs */}
        <motion.div className="mt-6" variants={heroItem}>
          <a
            className="inline-flex items-center gap-2 text-xs text-slate-400 transition hover:text-slate-200"
            href={siteSettings.contact.phoneHref}
            rel="noreferrer"
            target="_blank"
          >
            <WhatsAppMiniIcon />
            WhatsApp ile ulaşın — {siteSettings.contact.phoneDisplay}
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ opacity: 1 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        transition={{ delay: 1.9, duration: 1 }}
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">
          Keşfet
        </span>
        {/* Mouse pill with bouncing dot */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 pt-[5px]"
          transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.5 }}
        >
          <div className="h-2 w-0.5 rounded-full bg-white/55" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// ── Icon components ───────────────────────────────────────────────────────────

function WhatsAppMiniIcon() {
  return (
    <svg aria-hidden="true" className="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="#F4B860" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

function SeaAtmosphereIcon() {
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
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 19c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0"
      />
    </svg>
  )
}

function HomemadeIcon() {
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

function LocationPinIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
  )
}

function MapPinMiniIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
  )
}

function MapPinLargeIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
  )
}
