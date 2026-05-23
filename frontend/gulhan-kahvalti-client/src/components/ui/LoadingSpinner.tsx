interface LoadingSpinnerProps {
  label?: string
}

export function LoadingSpinner({ label = 'Yukleniyor' }: LoadingSpinnerProps) {
  return (
    <div className="flex items-center gap-3 text-sm text-stone-600" role="status">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-stone-300 border-t-emerald-700" />
      <span>{label}</span>
    </div>
  )
}
