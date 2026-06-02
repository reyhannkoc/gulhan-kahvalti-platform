import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
  fullWidth?: boolean
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-brand-turquoise text-white shadow-sm hover:bg-cyan-700 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300',
  secondary: 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-cyan-50',
  ghost: 'bg-transparent text-brand-text hover:bg-brand-light dark:text-slate-100 dark:hover:bg-white/10',
  danger: 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400',
}

export function Button({
  children,
  className = '',
  variant = 'primary',
  fullWidth = false,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        'inline-flex min-h-10 items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}
