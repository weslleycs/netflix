import { useAuthStore } from '@/entities/session/model/auth.store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { rateMovieSerie } from '../api/rate'

type Props = {
  movieId?: number
  serieId?: number
}

export function useRate(input: Props) {
  const user = useAuthStore((s) => s.user)
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (rate: number) => {
      if (!user) throw new Error('Not logged in')
      return rateMovieSerie({
        userId: user.id,
        movieId: input.movieId,
        serieId: input.serieId,
        rate,
      })
    },
    onSuccess: () => {
      const detailsKey = input.serieId
        ? ['detailsSerie', input.serieId]
        : ['detailsMovie', input.movieId]
      queryClient.invalidateQueries({ queryKey: detailsKey })
    },
  })

  return {
    handleRate: mutation.mutate,
    isRating: mutation.isPending,
    rateError: mutation.isError,
  }
}