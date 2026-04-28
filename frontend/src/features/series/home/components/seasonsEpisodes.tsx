import { useMemo, useState } from 'react'
import { FaChevronDown, FaPlay } from 'react-icons/fa'

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
  const totalEpisodes = ordered.reduce((acc, s) => acc + s.episodeCount, 0)
  const episodes = Array.from({ length: selected.episodeCount }, (_, i) => i + 1)

  return (
    <section className="overflow-hidden border shadow-lg rounded-2xl border-zinc-800 bg-zinc-900/60 shadow-black/20">
      <header className="flex flex-col gap-3 px-5 py-4 border-b border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-zinc-100">Temporadas e episódios</h2>
          <p className="text-xs text-zinc-500">
            {ordered.length} temporada{ordered.length === 1 ? '' : 's'} · {totalEpisodes} episódio
            {totalEpisodes === 1 ? '' : 's'} no total
          </p>
        </div>

        <div className="relative">
          <select
            aria-label="Selecionar temporada"
            value={selected.id}
            onChange={(e) => setSelectedId(Number(e.target.value))}
            className="w-full pl-4 pr-10 py-2 text-sm font-medium border rounded-md appearance-none cursor-pointer border-zinc-700 bg-zinc-950 text-zinc-100 hover:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent sm:w-56"
          >
            {ordered.map((s) => (
              <option key={s.id} value={s.id}>
                Temporada {s.seasonNumber} ({s.episodeCount} ep)
              </option>
            ))}
          </select>
          <FaChevronDown className="absolute -translate-y-1/2 pointer-events-none right-3 top-1/2 text-zinc-400" />
        </div>
      </header>

      <ul className="divide-y divide-zinc-800">
        {episodes.map((n) => (
          <li
            key={n}
            className="flex items-center justify-between gap-4 px-5 py-3 transition-colors cursor-pointer group hover:bg-zinc-800/50"
          >
            <div className="flex items-center gap-4 min-w-0">
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-zinc-800 text-zinc-400 group-hover:bg-red-600 group-hover:text-white">
                <FaPlay className="text-xs" />
              </span>
              <div className="min-w-0">
                <p className="font-medium truncate text-zinc-100">Episódio {n}</p>
                <p className="text-xs text-zinc-500">
                  Temporada {selected.seasonNumber}
                </p>
              </div>
            </div>
            <span className="text-xs font-medium uppercase tracking-wide text-zinc-500 shrink-0">
              T{selected.seasonNumber} · E{n}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
