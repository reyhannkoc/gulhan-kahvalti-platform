interface ToastProps {
  type?: 'success' | 'error' | 'info'
  message: string
}

const styles = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  error: 'border-red-200 bg-red-50 text-red-700',
  info: 'border-stone-200 bg-white text-stone-700',
}

export function Toast({ message, type = 'info' }: ToastProps) {
  return (
    <p className={`rounded-lg border p-3 text-sm shadow-sm ${styles[type]}`} role="status">
      {message}
    </p>
  )
}
