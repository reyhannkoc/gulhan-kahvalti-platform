/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // ── Typography ──────────────────────────────────────────────────────────
      fontFamily: {
        // Playfair Display: luxury serif for hero headings, section titles
        display: ['Playfair Display', 'Georgia', 'serif'],
        // Inter: clean modern UI font for body, nav, labels, buttons
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },

      // ── Brand Colors ─────────────────────────────────────────────────────────
      colors: {
        brand: {
          turquoise: '#00A6A6',
          deep: '#007C7C',
          light: '#E6FAF8',
          text: '#1F2933',
          gray: '#F5F7FA',
          accent: '#F4B860',
          cream: '#FFF8EC',
          green: '#4E8F5B',
          sand: '#E8D5B0',
        },
      },

      // ── Shadow Scale ─────────────────────────────────────────────────────────
      boxShadow: {
        // Existing (kept for compatibility)
        brand: '0 18px 45px rgba(0, 166, 166, 0.12)',
        // Extended premium scale
        'brand-sm': '0 4px 16px rgba(0, 166, 166, 0.08)',
        'brand-md': '0 8px 28px rgba(0, 166, 166, 0.11)',
        'brand-lg': '0 24px 64px rgba(0, 166, 166, 0.16)',
        'brand-xl': '0 32px 80px rgba(0, 166, 166, 0.20)',
        'warm': '0 8px 32px rgba(244, 184, 96, 0.14)',
        'warm-lg': '0 20px 56px rgba(244, 184, 96, 0.18)',
        // Neutral card shadows
        'card': '0 2px 12px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.04)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.09), 0 2px 8px rgba(0,0,0,0.05)',
        'hero': '0 40px 100px rgba(0, 0, 0, 0.35)',
      },

      // ── Easing ───────────────────────────────────────────────────────────────
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },

      // ── Duration ─────────────────────────────────────────────────────────────
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '450': '450ms',
      },

      // ── Letter Spacing ───────────────────────────────────────────────────────
      letterSpacing: {
        'display': '-0.02em',
        'display-tight': '-0.03em',
        'label': '0.10em',
        'label-wide': '0.18em',
        'label-wider': '0.24em',
      },

      // ── Line Height ──────────────────────────────────────────────────────────
      lineHeight: {
        'display': '1.1',
        'snug-display': '1.15',
        'comfort': '1.75',
      },
    },
  },
  plugins: [],
}
