import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import menuHeroImage from '../assets/brand/sea/menu-hero.jpg'
import { brandImages } from '../config/brandImages'
import { restaurantMenu } from '../config/restaurantMenu'

const ALL_CATEGORIES = 'Tümü'

export function MenuPage() {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES)

  const visibleSections =
    activeCategory === ALL_CATEGORIES
      ? [...restaurantMenu]
      : restaurantMenu.filter((s) => s.category === activeCategory)

  return (
    <section className="space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-brand">
        {/* Background food photo */}
        <img
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
          loading="eager"
          src={brandImages.menuPhoto}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/30" />

        <div className="relative grid gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10 lg:py-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
              Restoran menüsü
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold sm:text-5xl">
              Gülhan Kahvaltı Menü
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
              Kahvaltılar, sıkmalar, gözlemeler, yumurta çeşitleri ve içecekler için bilgilendirme
              menüsü. Bu sayfada sepete ekleme veya ödeme akışı bulunmaz.
            </p>
            <div className="mt-6">
              <Link to="/products">
                <Button>Sipariş İçin Ürünlerimiz</Button>
              </Link>
            </div>
          </div>

          <MenuHeroPanel />
        </div>
      </div>

      {/* Info banner */}
      <div className="flex flex-col gap-3 rounded-3xl border border-cyan-100 bg-brand-light p-4 text-sm font-semibold text-cyan-900 sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:bg-cyan-400/10 dark:text-cyan-100">
        <p>
          Menü içerikleri bilgilendirme amaçlıdır. Sipariş vermek için Ürünlerimiz sayfasını
          ziyaret edin.
        </p>
        <Link
          className="shrink-0 text-cyan-800 underline-offset-4 hover:underline dark:text-cyan-100"
          to="/products"
        >
          Ürünlerimiz
        </Link>
      </div>

      {/* Category tab strip */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          className={[
            'shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition duration-250',
            activeCategory === ALL_CATEGORIES
              ? 'border-brand-turquoise bg-brand-turquoise text-white shadow-brand-sm'
              : 'border-cyan-100 bg-white text-slate-700 hover:border-brand-turquoise/40 hover:bg-brand-light dark:border-white/10 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-white/10',
          ].join(' ')}
          onClick={() => setActiveCategory(ALL_CATEGORIES)}
          type="button"
        >
          Tüm Menü
        </button>
        {restaurantMenu.map((section) => (
          <button
            key={section.category}
            className={[
              'shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition duration-250',
              activeCategory === section.category
                ? 'border-brand-turquoise bg-brand-turquoise text-white shadow-brand-sm'
                : 'border-cyan-100 bg-white text-slate-700 hover:border-brand-turquoise/40 hover:bg-brand-light dark:border-white/10 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-white/10',
            ].join(' ')}
            onClick={() => setActiveCategory(section.category)}
            type="button"
          >
            {section.category}
          </button>
        ))}
      </div>

      {/* Menu grid — animates on category switch */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-5 lg:grid-cols-2"
          exit={{ opacity: 0, y: -8 }}
          initial={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.22 }}
        >
          {visibleSections.map((section, i) => (
            <motion.article
              key={section.category}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-cyan-100 bg-white p-5 shadow-card transition-shadow duration-350 hover:shadow-card-hover sm:p-6 dark:border-white/10 dark:bg-slate-900"
              initial={{ opacity: 0, y: 16 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              {/* Category header */}
              <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4 dark:border-white/10">
                <div>
                  <h2 className="font-display text-xl font-bold text-brand-text dark:text-white">
                    {section.category}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {section.description}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-brand-light px-2.5 py-1 text-xs font-bold text-brand-turquoise dark:bg-cyan-400/10 dark:text-cyan-300">
                  {section.items.length} çeşit
                </span>
              </div>

              {/* Items */}
              <div className="mt-4 space-y-3.5">
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-start justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <h3 className="font-medium text-brand-text dark:text-white">{item.name}</h3>
                      <p className="mt-0.5 text-sm leading-6 text-slate-500 dark:text-slate-400">
                        {item.description}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-brand-accent/15 px-3 py-1 text-sm font-bold text-amber-800 dark:bg-brand-accent/10 dark:text-amber-300">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}

function MenuHeroPanel() {
  return (
    <div className="relative min-h-[22rem] overflow-hidden rounded-3xl border border-white/15 shadow-brand-md ring-1 ring-white/10 sm:min-h-[26rem] lg:min-h-[30rem]">
      <img
        alt="Gülhan Kahvaltı menü görseli"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        src={menuHeroImage}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/65 via-slate-950/15 to-slate-950/20" />
      <div className="absolute left-0 top-0 h-1/2 w-full bg-gradient-to-br from-slate-950/72 via-slate-950/30 to-transparent" />

      <div className="relative flex min-h-[22rem] flex-col items-start justify-start p-5 pt-6 sm:min-h-[26rem] sm:p-6 sm:pt-8 lg:min-h-[30rem] lg:p-8">
        <h2 className="max-w-sm font-display text-2xl font-bold text-white drop-shadow-sm sm:text-3xl">
          Deniz Esintili Menü
        </h2>
        <p className="mt-3 max-w-sm text-sm leading-6 text-slate-100 drop-shadow-sm sm:text-base">
          Kahvaltı sofraları, ev yapımı lezzetler ve sıcak içecekler tek sayfada.
        </p>
      </div>
    </div>
  )
}
