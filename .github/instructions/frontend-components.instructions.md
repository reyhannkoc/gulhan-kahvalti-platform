---
applyTo: "frontend/gulhan-kahvalti-client/src/components/**/*.tsx,frontend/gulhan-kahvalti-client/src/pages/**/*.tsx"
description: "Use when creating or editing React components or pages in the Gülhan Kahvaltı frontend"
---

# React Component & Page Guidelines

## Component Structure (top-to-bottom order)
1. Imports (React, hooks, services, types, components)
2. TypeScript interface/type for props (above the component)
3. Named export function component
4. Hooks at the top (context hooks first, then state, then effects)
5. Event handlers
6. Render (JSX)

## Required Patterns

### Dark Mode — always include both modes
```tsx
<div className="bg-white dark:bg-gray-900 text-brand-text dark:text-[#edfafa]">
```

### Loading State — use the shared spinner
```tsx
import LoadingSpinner from '@/components/ui/LoadingSpinner';
if (loading) return <LoadingSpinner />;
```

### Empty State
```tsx
import EmptyState from '@/components/ui/EmptyState';
if (!items.length) return <EmptyState message={t('noItems')} />;
```

### Translations — never hardcode user-facing strings
```tsx
const { t } = useLanguage(); // from src/hooks/useLanguage
<h1>{t('welcomeTitle')}</h1>
```

## Card / Surface Pattern
```tsx
<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-brand p-6 border border-gray-100 dark:border-white/10">
```

## Button Usage
```tsx
// Always use the shared Button, not raw <button>
import Button from '@/components/ui/Button';
<Button variant="primary" onClick={handleSubmit}>
  {t('submit')}
</Button>
```

## Page Layout Wrapper
```tsx
// Public pages
import MainLayout from '@/layouts/MainLayout';
export default function MyPage() {
  return <MainLayout><div>...</div></MainLayout>;
}

// Admin pages
import AdminLayout from '@/layouts/AdminLayout';
```

## Accessibility
- All `<img>` tags need descriptive `alt` text in Turkish (primary language)
- Interactive elements need `aria-label` if text is not descriptive
- Use semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`
