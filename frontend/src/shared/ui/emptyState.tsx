type Props = {
  title: string
  description?: string
}

export function EmptyState({ title, description }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-center text-white/60">
      <h2 className="text-xl font-semibold text-white/80">{title}</h2>
      {description ? <p className="max-w-md text-sm">{description}</p> : null}
    </div>
  )
}
