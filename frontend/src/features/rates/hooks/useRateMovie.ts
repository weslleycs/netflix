import { useAuthStore } from '@/entities/session/model/auth.store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { rateMovieSerie } from '../api/rate'

 export function useRateMovie(movieId: number,serieId:number) {
   const user = useAuthStore((s) => s.user)
   const queryClient = useQueryClient()

   const mutation = useMutation({
     mutationFn: (rate: number) => {
       if (!user) throw new Error('Not logged in')
       return rateMovieSerie({ 
      userId: user.id, 
      movieId: movieId ?? undefined, 
      serieId: serieId ?? undefined,
      rate })
     },
     onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: [`rate-${serieId?'serie':'movieId'}`, movieId ?? serieId] })
     },
   })

   return {
     handleRate: mutation.mutate,    
     isRating: mutation.isPending,   
     rateError: mutation.isError,   
   }
 }