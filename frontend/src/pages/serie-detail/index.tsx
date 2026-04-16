import { getCommentSerieById } from "@/entities/comments/api/comments"
import { getDetailsSerie } from "@/entities/serie/api/serie"
import CommentForm from "@/features/comments/components/cardcommentForm"
import { useCommentForm } from "@/features/comments/hooks/useCommentForm"
import CardContainerComment from "@/features/movies/home/components/cardContainerComment"
import { RateStars } from "@/features/rates/components/rateStars"
import { useRate } from "@/features/rates/hooks/useRate"
import { CardSerieDetails } from "@/features/series/home/components/cardSerieDetails"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"



export default function SerieDetailsPage() {
  const [params] = useSearchParams()
  const serieId = Number(params.get("serieId"))

  const {
    data: serieDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["detailsSerie", serieId],
    queryFn: () => getDetailsSerie(serieId),
    enabled: !!serieId,
  })

  const { data: comments = [] } = useQuery({
    queryKey: ["commentsSerie", serieId],
    queryFn: () => getCommentSerieById(serieId),
    enabled: !!serieId,
  })

  const { register, errors, isSubmitting, onSubmit } = useCommentForm({serieId})
  const { handleRate, isRating } = useRate({serieId})

  const [selectedRate, setSelectedRate] = useState(0)

  function onRate(rate: number) {
    setSelectedRate(rate)
    handleRate(rate)
  }

  if (isLoading) return (
    <p>Loading</p>
  )

  if (isError || !serieDetails) {
    return (
        <p>Error</p>
    )
  }

  return (
    <div className="space-y-6">
      <CardSerieDetails serieDetails={serieDetails} />

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