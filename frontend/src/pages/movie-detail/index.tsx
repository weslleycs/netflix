import { getCommentsMovieById, getMovieDetails } from "@/entities/movie/api/movie"
import CommentForm from "@/features/comments/components/cardcommentForm"
import { useCommentForm } from "@/features/comments/hooks/useCommentForm"
import CardContainerComment from "@/features/movies/home/components/cardContainerComment"
import { CardMovieDetails } from "@/features/movies/home/components/cardMovieDetails"
import { RateStars } from "@/features/rates/components/rateStars"
import { useRateMovie } from "@/features/rates/hooks/useRateMovie"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"



export default function MovieDetailsPage() {
  const [params] = useSearchParams()
  const movieId = Number(params.get("movieId"))

  const {
    data: movieDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["detailsMovie", movieId],
    queryFn: () => getMovieDetails(movieId),
    enabled: !!movieId,
  })

  const { data: comments = [] } = useQuery({
    queryKey: ["commentsMovie", movieId],
    queryFn: () => getCommentsMovieById(movieId),
    enabled: !!movieId,
  })

  const { register, errors, isSubmitting, onSubmit } = useCommentForm(movieId)
  const { handleRate, isRating } = useRateMovie(movieId)

  const [selectedRate, setSelectedRate] = useState(0)

  function onRate(rate: number) {
    setSelectedRate(rate)
    handleRate(rate)
  }

  if (isLoading) return (
    <p>Loading</p>
  )

  if (isError || !movieDetails) {
    return (
        <p>Error</p>
    )
  }

  return (
    <div className="space-y-6">
      <CardMovieDetails movieDetails={movieDetails} />

      <RateStars
        currentRate={selectedRate}
        onRate={onRate}
        disabled={isRating}
      />

      <CommentForm
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
      />

      <CardContainerComment  comments={comments}/>
    </div>
  )
}