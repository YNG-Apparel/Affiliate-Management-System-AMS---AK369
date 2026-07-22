import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

/**
 * Primary button. Extend with variants when the design system grows.
 */
export function Button({ className = '', disabled, children, ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex h-10 w-full items-center justify-center rounded-md bg-indigo-600 px-4 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
