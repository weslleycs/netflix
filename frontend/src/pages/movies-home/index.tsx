import { useQuery } from '@tanstack/react-query'

import { getAllMoviesByGenres } from '@/entities/genre/api/genres'
import CardContainerCarouselMovies from '@/features/movies/home/components/cardContainerCaroselMovies'
import { Loading } from '@/shared/ui/loading'
import { ErrorMessage } from '@/shared/ui/errorMessage'
import { EmptyState } from '@/shared/ui/emptyState'

export default function MoviesHomePage() {
  const { data: genresMovies = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['genres-movies'],
    queryFn: getAllMoviesByGenres,
  })

  if (isLoading) return <Loading label="Loading movies..." />
  if (isError) return <ErrorMessage onRetry={() => refetch()} />

  const populated = genresMovies.filter((g) => g.movies.length > 0)
  if (populated.length === 0)
    return (
      <EmptyState
        title="Nothing here yet"
        description="Create some genres and movies to see them grouped here."
      />
    )

  return (
    <div className="py-8 space-y-10">
      {populated.map((genre) => (
        <CardContainerCarouselMovies key={genre.id} title={genre.name} movies={genre.movies} />
      ))}
    </div>
  )
}
