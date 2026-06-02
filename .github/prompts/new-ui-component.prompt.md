---
name: new-ui-component
description: "Scaffold a new reusable UI component for the Gülhan Kahvaltı frontend with brand styles, dark mode, and TypeScript props"
---

Create a new reusable UI component named **${componentName}** in `src/components/ui/`.

Requirements:
- TypeScript interface for props (include `className?: string`)
- Uses Tailwind brand tokens (`brand-turquoise`, `brand-accent`, etc.)
- Supports dark mode with paired `dark:` classes
- Uses `useLanguage()` hook if it renders any user-facing text
- Exported as a **named export**
- Follows the card/surface pattern for any container elements:
  `bg-white dark:bg-gray-800 rounded-2xl shadow-brand border border-gray-100 dark:border-white/10`

Variant prop (if applicable): `primary | secondary | ghost`

After creating the component, show a usage example in a page or another component.

Component purpose / description: **${description}**
