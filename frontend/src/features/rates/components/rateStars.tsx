type Props = {
  currentRate: number
  onRate: (rate: number) => void
  disabled?: boolean
}

const STARS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const

export function RateStars({ currentRate, onRate, disabled = false }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-1 mt-4">
      <span className="mr-2 text-sm text-zinc-400">Your rate:</span>
      {STARS.map((star) => (
        <button
          key={star}
          type="button"
          aria-label={`Rate ${star} of 10`}
          disabled={disabled}
          onClick={() => onRate(star)}
          className={`text-2xl transition disabled:cursor-not-allowed disabled:opacity-60 ${
            star <= currentRate ? 'text-yellow-400' : 'text-zinc-600'
          } hover:text-yellow-300`}
        >
          ★
        </button>
      ))}
    </div>
  )
}