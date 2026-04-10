type Props = {
  currentRate: number;
  onRate: (rate: number) => void;
   disabled?: boolean
};

export function RateStars({ currentRate, onRate }: Props) {
  return (
    <div className="flex items-center gap-1 mt-4">
      <span className="mr-2 text-sm text-zinc-400">Your rate:</span>

      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRate(star)}
          className={`text-2xl transition ${
            star <= currentRate ? "text-yellow-400" : "text-zinc-600"
          } hover:text-yellow-300`}
        >
          ★
        </button>
      ))}
    </div>
  );
}