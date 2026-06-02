# Gülhan Kahvaltı — Agent Instructions

## Project Overview
Turkish breakfast restaurant e-commerce app. Brand: **Gülhan Kahvaltı** | Slogan: **Güne Lezzetle Başla**.

**Stack:** React 19 + TypeScript + Vite + Tailwind CSS 3 + ASP.NET Core API (JWT auth)

## Brand Design System

### Colors (always use Tailwind brand tokens, never raw hex in JSX)
| Token | Value | Use |
|-------|-------|-----|
| `brand-turquoise` | `#00A6A6` | Primary actions, links, highlights |
| `brand-light` | `#E6FAF8` | Light backgrounds, hover states |
| `brand-text` | `#1F2933` | Body text (light mode) |
| `brand-gray` | `#F5F7FA` | Section backgrounds |
| `brand-accent` | `#F4B860` | Badges, tags, warm highlights |

### Dark Mode
Dark mode is class-based (`darkMode: 'class'` in Tailwind config). Always pair light/dark variants:
```tsx
// Correct pattern
className="bg-white dark:bg-gray-900 text-brand-text dark:text-[#edfafa]"
```
Dark bg values: `#071a1f` (page), `#0f172a` / `#111827` (cards).

### Typography
- Headings: bold, `brand-turquoise` or `brand-text`
- Body: `brand-text` / `text-gray-600`
- Always support both Turkish and English via `useLanguage()` hook

## Component Rules

### Existing UI Primitives — use these, don't recreate
Located in `src/components/ui/`:
- `Button` — variants: `primary | secondary | ghost | danger`
- `Input`, `FormField` — for all form controls
- `LoadingSpinner`, `Toast`, `EmptyState`

### New Components
- Place in `src/components/ui/` (reusable) or `src/components/<feature>/` (feature-specific)
- Export as named export
- Accept `className?: string` for composition
- Use `ThemeContext` for dark mode; never hardcode color values

### Layouts
- Public pages → wrap in `<MainLayout>`
- Admin pages → wrap in `<AdminLayout>`

## Patterns to Follow

### Translations
```tsx
const { t } = useLanguage();
// t('key') returns Turkish or English string from src/utils/translations.ts
```

### API Calls
All services live in `src/services/`. Use them — don't call `axios` or `fetch` directly in components.

### TypeScript
Use types from `src/types/`. Add new types there. Avoid `any`.

### Tailwind Class Order
Layout → Sizing → Spacing → Typography → Color → Border → Shadow → Transitions

## What NOT to Do
- Don't use inline `style={{ color: '#00A6A6' }}` — use `text-brand-turquoise`
- Don't create new context providers without discussing with the user
- Don't bypass JWT auth in admin routes
- Don't add comments explaining what code does — only add them for non-obvious WHY
