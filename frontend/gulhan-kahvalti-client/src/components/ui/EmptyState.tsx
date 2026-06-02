import type { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-cyan-200 bg-white p-5 text-center shadow-sm sm:p-8 dark:border-white/15 dark:bg-slate-900">
      <h2 className="text-lg font-semibold text-brand-text dark:text-white">{title}</h2>
      {description ? <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{description}</p> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  )
}
