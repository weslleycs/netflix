import { getMovieDetails } from "@/entities/movie/api/movie"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { editSchema } from "../schema/editSchema"
import { updateMovie } from "../../api/movie"
import { useForm } from "react-hook-form"

export function useMovieEditForm(movieId: number) {
  const navigate = useNavigate()
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const { data: movie } = useQuery({
    queryKey: ['detailsMovie', movieId],
    queryFn: () => getMovieDetails(movieId),
    enabled: !!movieId,
  })

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(editSchema),
  })

  useEffect(() => {
    if (movie) {
      reset({
        title: movie.title,
        description: movie.description,
        imageUrl: movie.imageUrl
      })
    }
  }, [movie, reset])

  const onSubmit = handleSubmit(async (values) => {
    try {
      setSuccessMessage(null)
      await updateMovie(movieId, values)
      setSuccessMessage('Movie updated successfully!')
      navigate(`/movies/details?movieId=${movieId}`)
    } catch {
      setError('root', {
        type: 'server',
        message: 'Something went wrong. Please try again.',
      })
    }
  })

  return {
    register,
    errors,
    isSubmitting,
    onSubmit,
    isLoading: !movie,
    successMessage,
  }
}