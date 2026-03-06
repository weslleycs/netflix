import { forwardRef } from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className = '', ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={[
        'w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900',
        'placeholder:text-zinc-500 placeholder:opacity-100',
        'outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20',
        'disabled:opacity-60',
        className,
      ].join(' ')}
      {...props}
    />
  );
});
