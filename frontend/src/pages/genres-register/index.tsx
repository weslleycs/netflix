import { useQuery } from '@tanstack/react-query'

import { Card } from '@/shared/ui/card'
import RegisterGenreForm from '@/features/genres/register/components/registerGenreForm'
import { useGenreRegisterForm } from '@/features/genres/register/hooks/useGenreRegisterForm'
import { getAllGenres } from '@/entities/genre/api/genres'
import type { Genres } from '@/entities/genre/model/genres'

export default function GenresRegisterPage() {
  const { register, errors, isSubmitting, onSubmit, successMessage } = useGenreRegisterForm()
  const { data: genres = [] } = useQuery<Genres[]>({
    queryKey: ['genres'],
    queryFn: getAllGenres,
  })

  return (
    <div className="grid gap-8 py-10 md:grid-cols-[1fr_1fr]">
      <Card>
        <h1 className="text-3xl font-extrabold">Create Genre</h1>
        <p className="mt-2 text-white/60">Genres are shared between movies and series.</p>
        <div className="mt-6">
          <RegisterGenreForm
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
            successMessage={successMessage}
          />
        </div>
      </Card>

      <div className="w-full max-w-md p-8 text-white border rounded-2xl border-white/10 bg-black/60 backdrop-blur">
        <h2 className="text-xl font-bold">Existing genres</h2>
        <p className="mt-1 text-sm text-white/50">{genres.length} total</p>
        <ul className="flex flex-wrap gap-2 mt-4">
          {genres.map((g) => (
            <li
              key={g.id}
              className="px-3 py-1 text-xs font-semibold text-red-300 rounded-full bg-red-600/20"
              title={g.description ?? ''}
            >
              {g.name}
            </li>
          ))}
          {genres.length === 0 ? (
            <li className="text-sm text-white/40">No genres yet.</li>
          ) : null}
        </ul>
      </div>
    </div>
  )
}
