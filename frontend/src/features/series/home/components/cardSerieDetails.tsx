import { NavLink } from 'react-router-dom'
import type { SerieDetails } from '@/entities/serie/model/serieDetails'

type Props = {
  serieDetails: SerieDetails
}

export function CardSerieDetails({ serieDetails }: Props) {
  return (  
    <div className="flex flex-col gap-6 md:flex-row">
      
      <img
        src={serieDetails.imageUrl}
        alt={serieDetails.title}
        className="object-cover w-full rounded-2xl md:w-72 h-96"
      />

      <div className="flex-1 space-y-4">
        
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">
            {serieDetails.title}
          </h1>

          <NavLink
            to={`/movies/edit?movieId=${serieDetails.id}`}
            className="px-4 py-2 text-sm font-semibold transition border rounded border-white/20 bg-white/5 hover:bg-white/10"
          >
            Edit
          </NavLink>
        </div>

        <div className="flex flex-wrap gap-2">
          {serieDetails.genre.map((g) => (
            <span
              key={g}
              className="px-3 py-1 text-xs font-semibold text-red-400 rounded-full bg-red-600/20"
            >
              {g}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xl text-yellow-400">★</span>
          <span className="text-lg font-semibold">
            {serieDetails.rate.toFixed(1)}
          </span>
          <span className="text-zinc-400">/ 10</span>
        </div>

        <p className="leading-relaxed text-zinc-300">
          {serieDetails.description}
        </p>

      </div>
    </div>
  )
}