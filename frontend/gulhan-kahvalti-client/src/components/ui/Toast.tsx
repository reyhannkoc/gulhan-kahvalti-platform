interface ToastProps {
  type?: 'success' | 'error' | 'info'
  message: string
}

const styles = {
  success: 'border-cyan-200 bg-brand-light text-cyan-800 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-100',
  error: 'border-red-200 bg-red-50 text-red-700 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-200',
  info: 'border-cyan-100 bg-white text-stone-700 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200',
}

export function Toast({ message, type = 'info' }: ToastProps) {
  return (
    <p className={`rounded-xl border p-3 text-sm shadow-sm ${styles[type]}`} role="status">
      {message}
    </p>
  )
}
