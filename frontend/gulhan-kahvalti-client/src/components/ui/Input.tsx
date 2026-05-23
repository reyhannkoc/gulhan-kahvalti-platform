import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}

export function Input({ className = '', hasError = false, ...props }: InputProps) {
  return (
    <input
      className={[
        'w-full rounded-lg border bg-white px-3 py-2 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:ring-2',
        hasError
          ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
          : 'border-stone-300 focus:border-emerald-700 focus:ring-emerald-100',
        className,
      ].join(' ')}
      {...props}
    />
  )
}
