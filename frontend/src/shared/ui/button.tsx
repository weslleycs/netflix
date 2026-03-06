import type { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, className = '', ...props }: Props) {
  return (
    <button
      className={`w-full bg-red-600 text-white py-2 rounded font-semibold hover:bg-red-700 transition disabled:opacity-60 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
