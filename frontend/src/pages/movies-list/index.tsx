import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { getMovies, getMoviesByTitle } from '@/entities/movie/api/movie'
import type { Movie } from '@/entities/movie/model/movie'
import { getMoviesByGenre } from '@/entities/genre/api/genres'
import CardContainerMovies from '@/features/movies/home/components/cardContainerMovies'


export default function MoviesListPage() {
  const [params] = useSearchParams()

  const title = params.get('title')
  const genre = params.get('genre')

  const { data: movies = [], isLoading } = useQuery<Movie[]>({
    queryKey: ['movies', { title, genre }],
    queryFn: async () => {
      if (title) return await getMoviesByTitle(title)
      if (genre) return await getMoviesByGenre(genre)
      return await getMovies()
    },
  })
  let pageTitle = 'All movies'
  if (title) {
    pageTitle = `Results for: ${title}`
  } else if (genre) {
    pageTitle = `Genre: ${genre}`
  }
  if (isLoading) return (
    <p>
        Loading
    </p>
  )
  return (
    <CardContainerMovies
      title={pageTitle}
      movies={movies}
    />
  )
}