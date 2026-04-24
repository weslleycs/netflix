type Props = {
  title?: string
  message?: string
  onRetry?: () => void
}

export function ErrorMessage({
  title = 'Something went wrong',
  message = 'Please try again in a moment.',
  onRetry,
}: Props) {
  return (
    <div
      role="alert"
      className="flex flex-col items-start gap-3 p-6 my-6 border rounded-2xl border-red-600/30 bg-red-600/10 text-white"
    >
      <div>
        <h2 className="text-lg font-semibold text-red-400">{title}</h2>
        <p className="mt-1 text-sm text-white/70">{message}</p>
      </div>
      {onRetry ? (
        <button
          onClick={onRetry}
          className="px-3 py-1.5 text-sm font-semibold rounded border border-white/20 hover:bg-white/10"
        >
          Try again
        </button>
      ) : null}
    </div>
  )
}
