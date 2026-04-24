import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

import { getCommentSerieById } from '@/entities/comments/api/comments'
import { getDetailsSerie } from '@/entities/serie/api/serie'
import CommentForm from '@/features/comments/components/cardcommentForm'
import { useCommentForm } from '@/features/comments/hooks/useCommentForm'
import CardContainerComment from '@/features/movies/home/components/cardContainerComment'
import { RateStars } from '@/features/rates/components/rateStars'
import { useRate } from '@/features/rates/hooks/useRate'
import { CardSerieDetails } from '@/features/series/home/components/cardSerieDetails'
import { Loading } from '@/shared/ui/loading'
import { ErrorMessage } from '@/shared/ui/errorMessage'

export default function SerieDetailsPage() {
  const [params] = useSearchParams()
  const serieId = Number(params.get('serieId'))

  const {
    data: serieDetails,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['detailsSerie', serieId],
    queryFn: () => getDetailsSerie(serieId),
    enabled: !!serieId,
  })

  const { data: comments = [] } = useQuery({
    queryKey: ['commentsSerie', serieId],
    queryFn: () => getCommentSerieById(serieId),
    enabled: !!serieId,
  })

  const { register, errors, isSubmitting, onSubmit } = useCommentForm({ serieId })
  const { handleRate, isRating } = useRate({ serieId })
  const [selectedRate, setSelectedRate] = useState(0)

  function onRate(rate: number) {
    setSelectedRate(rate)
    handleRate(rate)
  }

  if (!serieId) return <ErrorMessage title="Missing serie id" message="No serie was selected." />
  if (isLoading) return <Loading label="Loading serie..." />
  if (isError || !serieDetails)
    return (
      <ErrorMessage
        title="Couldn't load this serie"
        message="The serie may have been removed or the server is unreachable."
        onRetry={() => refetch()}
      />
    )

  return (
    <div className="py-8 space-y-8">
      <CardSerieDetails serieDetails={serieDetails} />

      <RateStars currentRate={selectedRate} onRate={onRate} disabled={isRating} />

      <CommentForm
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
      />

      <CardContainerComment comments={comments} />
    </div>
  )
}