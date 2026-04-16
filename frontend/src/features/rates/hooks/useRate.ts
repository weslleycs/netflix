import { useAuthStore } from '@/entities/session/model/auth.store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { rateMovieSerie } from '../api/rate'
type Props = {
  movieId?: number;
  serieId?: number;
}

 export function useRate(input: Props) {
   const user = useAuthStore((s) => s.user)
   const queryClient = useQueryClient()

   const mutation = useMutation({
     mutationFn: (rate: number) => {
       if (!user) throw new Error('Not logged in')
       return rateMovieSerie({ 
      userId: user.id, 
      movieId: input.movieId ?? undefined, 
      serieId: input.serieId ?? undefined,
      rate })
     },
     onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: [`rate-${input.serieId?'serie':'movieId'}`, input.movieId ?? input.serieId] })
     },
   })

   return {
     handleRate: mutation.mutate,    
     isRating: mutation.isPending,   
     rateError: mutation.isError,   
   }
 }