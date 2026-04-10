import { useAuthStore } from "@/entities/session/model/auth.store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { commentSchema } from "../schemas/commentSchema"
import { commentMovie } from "../api/comment"

export function useCommentForm(movieId: number) {
   const user = useAuthStore((s) => s.user)  
   const queryClient = useQueryClient()       

   const { register, handleSubmit, reset, setError, formState: { errors, isSubmitting } } = useForm({
     resolver: zodResolver(commentSchema),
   })
   const onSubmit = handleSubmit(async (values) => {
     if (!user) return  
     try {
       await commentMovie({ userId: user.id, movieId, comment: values.comment })
       queryClient.invalidateQueries({ queryKey: ['commentsMovie', movieId] })
       reset()  
     } catch {
       setError('comment', { message: 'Failed to send comment' })
     }
   })

   return { register, errors, isSubmitting, onSubmit }
 }