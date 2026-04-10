import { useAuthStore } from '@/entities/session/model/auth.store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { rateMovie } from '../api/rate'

 export function useRateMovie(movieId: number) {
   const user = useAuthStore((s) => s.user)
   const queryClient = useQueryClient()

   const mutation = useMutation({
     mutationFn: (rate: number) => {
       if (!user) throw new Error('Not logged in')
       return rateMovie({ userId: user.id, movieId, rate })
     },
     onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ['detailsMovie', movieId] })
     },
   })

   return {
     handleRate: mutation.mutate,    
     isRating: mutation.isPending,   
     rateError: mutation.isError,   
   }
 }