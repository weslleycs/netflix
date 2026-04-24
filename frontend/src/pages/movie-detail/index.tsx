import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

import { getCommentsMovieById, getMovieDetails } from '@/entities/movie/api/movie'
import CommentForm from '@/features/comments/components/cardcommentForm'
import { useCommentForm } from '@/features/comments/hooks/useCommentForm'
import CardContainerComment from '@/features/movies/home/components/cardContainerComment'
import { CardMovieDetails } from '@/features/movies/home/components/cardMovieDetails'
import { RateStars } from '@/features/rates/components/rateStars'
import { useRate } from '@/features/rates/hooks/useRate'
import { Loading } from '@/shared/ui/loading'
import { ErrorMessage } from '@/shared/ui/errorMessage'

export default function MovieDetailsPage() {
  const [params] = useSearchParams()
  const movieId = Number(params.get('movieId'))

  const {
    data: movieDetails,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['detailsMovie', movieId],
    queryFn: () => getMovieDetails(movieId),
    enabled: !!movieId,
  })

  const { data: comments = [] } = useQuery({
    queryKey: ['commentsMovie', movieId],
    queryFn: () => getCommentsMovieById(movieId),
    enabled: !!movieId,
  })

  const { register, errors, isSubmitting, onSubmit } = useCommentForm({ movieId })
  const { handleRate, isRating } = useRate({ movieId })
  const [selectedRate, setSelectedRate] = useState(0)

  function onRate(rate: number) {
    setSelectedRate(rate)
    handleRate(rate)
  }

  if (!movieId) return <ErrorMessage title="Missing movie id" message="No movie was selected." />
  if (isLoading) return <Loading label="Loading movie..." />
  if (isError || !movieDetails)
    return (
      <ErrorMessage
        title="Couldn't load this movie"
        message="The movie may have been removed or the server is unreachable."
        onRetry={() => refetch()}
      />
    )

  return (
    <div className="py-8 space-y-8">
      <CardMovieDetails movieDetails={movieDetails} />

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