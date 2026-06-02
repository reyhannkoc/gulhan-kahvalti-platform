---
name: design-review
description: "Review a page or component for brand consistency, dark mode completeness, accessibility, and responsive layout issues"
---

Review the file(s) **${files}** for frontend design quality.

Check and report issues in each category:

### 1. Brand Consistency
- Are brand Tailwind tokens used (`brand-turquoise`, `brand-accent`, `brand-text`, etc.)?
- Any hardcoded hex colors in className or style props?

### 2. Dark Mode Completeness
- Does every background, text, and border class have a `dark:` counterpart?
- Are dark bg values from the correct scale (`#071a1f` → `#0f172a` → `#111827`)?

### 3. Responsive Layout
- Is the layout mobile-first (base = mobile, `md:`/`lg:` for larger)?
- Any fixed pixel widths that could break on small screens?

### 4. Accessibility
- `<img>` tags have descriptive `alt` text?
- Interactive elements have accessible labels?
- Semantic HTML used (`<nav>`, `<main>`, `<section>`, etc.)?

### 5. Component Reuse
- Any inline `<button>` elements that should use the shared `Button` component?
- Any duplicated patterns that already exist in `src/components/ui/`?

### 6. Translations
- Any hardcoded Turkish or English strings that should go through `useLanguage()`/`t()`?

For each issue found, provide the line number and a corrected code snippet.
