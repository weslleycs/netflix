import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { getMovies, getMoviesByGenre, getMoviesByTitle } from '@/entities/movie/api/movie'
import type { Movie } from '@/entities/movie/model/movie'
import CardContainerMovies from '@/features/movies/home/components/cardContainerMovies'
import { Loading } from '@/shared/ui/loading'
import { ErrorMessage } from '@/shared/ui/errorMessage'
import { EmptyState } from '@/shared/ui/emptyState'

export default function MoviesListPage() {
  const [params] = useSearchParams()
  const title = params.get('title')
  const genre = params.get('genre')

  const { data: movies = [], isLoading, isError, refetch } = useQuery<Movie[]>({
    queryKey: ['movies', { title, genre }],
    queryFn: () => {
      if (title) return getMoviesByTitle(title)
      if (genre) return getMoviesByGenre(genre)
      return getMovies()
    },
  })

  let pageTitle = 'All movies'
  if (title) pageTitle = `Results for: ${title}`
  else if (genre) pageTitle = `Genre: ${genre}`

  if (isLoading) return <Loading label="Loading movies..." />
  if (isError) return <ErrorMessage onRetry={() => refetch()} />
  if (movies.length === 0)
    return (
      <EmptyState
        title="No movies found"
        description={
          title || genre
            ? 'Try a different search or genre.'
            : 'Be the first to add a movie.'
        }
      />
    )

  return <CardContainerMovies title={pageTitle} movies={movies} />
}