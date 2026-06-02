---
applyTo: "frontend/gulhan-kahvalti-client/src/index.css,frontend/gulhan-kahvalti-client/tailwind.config.js"
description: "Use when editing Tailwind config, global CSS, or the design token system"
---

# Tailwind & Global Styles Guidelines

## Brand Token Reference
Always extend via `tailwind.config.js` — never add raw hex values elsewhere.

```js
// tailwind.config.js — existing tokens
theme: {
  extend: {
    colors: {
      brand: {
        turquoise: '#00A6A6',  // primary
        light: '#E6FAF8',      // light bg
        text: '#1F2933',       // body text
        gray: '#F5F7FA',       // section bg
        accent: '#F4B860',     // warm highlight
      }
    },
    boxShadow: {
      brand: '0 18px 45px rgba(0, 166, 166, 0.12)',
    }
  }
}
```

## Adding New Tokens
Add to the `brand` object in `tailwind.config.js`. Use semantic names (`brand-surface`, `brand-muted`) not descriptive ones (`brand-darkgreen`).

## Dark Mode Rules
- Mode: `class` — toggled by `ThemeContext` adding/removing `dark` class on `<html>`
- Dark background scale: `#071a1f` (page) → `#0f172a` (card) → `#111827` (nested)
- Text in dark: `#edfafa` (primary), `text-gray-400` (secondary)
- Borders in dark: `border-white/10` or `border-white/12`

## Global CSS (`src/index.css`)
Only add to `index.css` for:
- Base resets / Tailwind directives (`@tailwind base/components/utilities`)
- CSS custom properties (`:root` variables)
- Browser-specific overrides that can't be done in Tailwind
- Dark mode body overrides (`html.dark body { ... }`)

Don't add component-level styles here — use Tailwind classes in JSX.

## Responsive Breakpoints
| Prefix | Width | Usage |
|--------|-------|-------|
| (none) | mobile-first | Base styles |
| `sm:` | 640px | Large phones |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Desktop |
| `xl:` | 1280px | Wide desktop |

Always design mobile-first: base = mobile, add `md:` / `lg:` for larger screens.
