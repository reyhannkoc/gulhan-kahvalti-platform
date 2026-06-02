interface LoadingSpinnerProps {
  label?: string
}

export function LoadingSpinner({ label = 'Yükleniyor' }: LoadingSpinnerProps) {
  return (
    <div className="flex items-center gap-3 rounded-full bg-white px-4 py-3 text-sm text-slate-600 shadow-sm dark:bg-slate-900 dark:text-slate-300" role="status">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-cyan-100 border-t-brand-turquoise" />
      <span>{label}</span>
    </div>
  )
}
