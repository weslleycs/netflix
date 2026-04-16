import { useAuthStore } from "@/entities/session/model/auth.store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { commentSchema, type CommentFormValues } from "../schemas/commentSchema"
import { comment} from "../api/comment"

type Props = {
  movieId?: number, 
  serieId?: number
}

export function useCommentForm(input:Props) {
  const user = useAuthStore((s) => s.user)
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
  })

  const onSubmit = handleSubmit(async (values) => {
    if (!user) return
    try {
      await comment({
        userId: user.id,
        movieId: input.movieId ?? undefined,
        serieId: input.serieId ?? undefined,
        comment: values.comment,
      })     
      await queryClient.invalidateQueries({
        queryKey: [`comment-${input.serieId?'serie':'movieId'}`, input.movieId ?? input.serieId],
      })
      
      reset()
    } catch {
      setError("comment", { message: "Failed to send comment" })
    }
  })

  return { register, errors, isSubmitting, onSubmit }
}