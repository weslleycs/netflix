type Props = {
  label?: string
  className?: string
}

export function Loading({ label = 'Loading...', className = '' }: Props) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex items-center justify-center gap-3 py-12 text-white/70 ${className}`}
    >
      <span className="inline-block w-5 h-5 border-2 rounded-full border-white/20 border-t-red-600 animate-spin" />
      <span className="text-sm tracking-wide">{label}</span>
    </div>
  )
}
