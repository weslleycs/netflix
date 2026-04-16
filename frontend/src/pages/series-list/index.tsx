import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import CardContainerSeries from '@/features/series/home/components/cardContainerSeries'
import { getSeries } from '@/entities/serie/api/serie'
import { getMoviesByGenre, getMoviesByTitle } from '@/entities/movie/api/movie'
import type { Serie } from '@/entities/serie/model/serie'


export default function SeriesListPage() {
  const [params] = useSearchParams()

  const title = params.get('title')
  const genre = params.get('genre')

  const { data: series = [], isLoading } = useQuery<Serie[]>({
    queryKey: ['movies', { title, genre }],
    queryFn: async () => {
       if (title) return await getMoviesByTitle(title)
       if (genre) return await getMoviesByGenre(genre)
      return await getSeries()
    },
  })
  let pageTitle = 'All Series'
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
    <CardContainerSeries
      title={pageTitle}
      series={series}
    />
  )
}