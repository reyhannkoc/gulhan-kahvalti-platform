import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}

export function Input({ className = '', hasError = false, ...props }: InputProps) {
  return (
    <input
      className={[
        'w-full rounded-xl border bg-white px-3 py-2 text-sm text-brand-text outline-none transition placeholder:text-slate-400 focus:ring-2 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500',
        hasError
          ? 'border-red-300 focus:border-red-500 focus:ring-red-100 dark:border-red-400/60 dark:focus:border-red-300 dark:focus:ring-red-400/20'
          : 'border-cyan-100 focus:border-brand-turquoise focus:ring-cyan-100 dark:border-white/15 dark:focus:border-cyan-300 dark:focus:ring-cyan-400/20',
        className,
      ].join(' ')}
      {...props}
    />
  )
}
