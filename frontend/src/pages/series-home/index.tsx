import { useQuery } from '@tanstack/react-query'

import { getAllSeriesByGenres } from '@/entities/genre/api/genres'
import CardContainerCarouselSeries from '@/features/series/home/components/cardContainerCaroselSeries'
import { Loading } from '@/shared/ui/loading'
import { ErrorMessage } from '@/shared/ui/errorMessage'
import { EmptyState } from '@/shared/ui/emptyState'

export default function SeriesHomePage() {
  const { data: genresSeries = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['genres-series'],
    queryFn: getAllSeriesByGenres,
  })

  if (isLoading) return <Loading label="Loading series..." />
  if (isError) return <ErrorMessage onRetry={() => refetch()} />

  const populated = genresSeries.filter((g) => g.series.length > 0)
  if (populated.length === 0)
    return (
      <EmptyState
        title="Nothing here yet"
        description="Create some genres and series to see them grouped here."
      />
    )

  return (
    <div className="py-8 space-y-10">
      {populated.map((genre) => (
        <CardContainerCarouselSeries key={genre.id} title={genre.name} series={genre.series} />
      ))}
    </div>
  )
}
