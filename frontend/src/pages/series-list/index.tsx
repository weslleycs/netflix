import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import {
  getSeries,
  getSeriesByGenre,
  getSeriesByTitle,
} from '@/entities/serie/api/serie'
import type { Serie } from '@/entities/serie/model/serie'
import CardContainerSeries from '@/features/series/home/components/cardContainerSeries'
import { Loading } from '@/shared/ui/loading'
import { ErrorMessage } from '@/shared/ui/errorMessage'
import { EmptyState } from '@/shared/ui/emptyState'

export default function SeriesListPage() {
  const [params] = useSearchParams()
  const title = params.get('title')
  const genre = params.get('genre')

  const { data: series = [], isLoading, isError, refetch } = useQuery<Serie[]>({
    queryKey: ['series', { title, genre }],
    queryFn: () => {
      if (title) return getSeriesByTitle(title)
      if (genre) return getSeriesByGenre(genre)
      return getSeries()
    },
  })

  let pageTitle = 'All series'
  if (title) pageTitle = `Results for: ${title}`
  else if (genre) pageTitle = `Genre: ${genre}`

  if (isLoading) return <Loading label="Loading series..." />
  if (isError) return <ErrorMessage onRetry={() => refetch()} />
  if (series.length === 0)
    return (
      <EmptyState
        title="No series found"
        description={
          title || genre
            ? 'Try a different search or genre.'
            : 'Be the first to add a series.'
        }
      />
    )

  return <CardContainerSeries title={pageTitle} series={series} />
}
