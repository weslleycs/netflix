import { useMemo, useState } from 'react'

import type { SerieSeason } from '@/entities/serie/model/serieDetails'
import { EmptyState } from '@/shared/ui/emptyState'

type Props = {
  seasons: SerieSeason[]
}

export function SeasonsEpisodes({ seasons }: Props) {
  const ordered = useMemo(
    () => [...seasons].sort((a, b) => a.seasonNumber - b.seasonNumber),
    [seasons],
  )
  const [selectedId, setSelectedId] = useState<number | null>(ordered[0]?.id ?? null)

  if (ordered.length === 0) {
    return (
      <EmptyState
        title="Sem temporadas cadastradas"
        description="Esta série ainda não tem temporadas registradas."
      />
    )
  }

  const selected = ordered.find((s) => s.id === selectedId) ?? ordered[0]
  const episodes = Array.from({ length: selected.episodeCount }, (_, i) => i + 1)

  return (
    <section className="overflow-hidden border rounded-2xl border-zinc-800 bg-zinc-900/60">
      <header className="flex items-center justify-between gap-4 px-5 py-4 border-b border-zinc-800">
        <h2 className="text-lg font-semibold text-zinc-100">Temporadas e episódios</h2>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-zinc-400">Temporada</span>
          <select
            value={selected.id}
            onChange={(e) => setSelectedId(Number(e.target.value))}
            className="px-3 py-1.5 text-sm border rounded-md border-zinc-700 bg-zinc-950 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            {ordered.map((s) => (
              <option key={s.id} value={s.id}>
                Temporada {s.seasonNumber}
              </option>
            ))}
          </select>
        </label>
      </header>

      <ul className="divide-y divide-zinc-800">
        {episodes.map((n) => (
          <li
            key={n}
            className="flex items-center justify-between px-5 py-3 hover:bg-zinc-800/40"
          >
            <span className="text-zinc-100">Episódio {n}</span>
            <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              T{selected.seasonNumber} · E{n}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
