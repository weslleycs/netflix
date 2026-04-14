import type { MovieComment } from "@/entities/movie/model/movieComment"

type Props = {
    comment: MovieComment
}

export default function CardCommentDetail({comment}:Props){
  return(
    <div className="flex gap-3 p-4 border rounded-xl border-zinc-800 bg-zinc-900/50">
    <div className="flex items-center justify-center w-10 h-10 font-bold text-red-400 rounded-full shrink-0 bg-red-600/20">
        {comment.userName.charAt(0).toUpperCase()}
    </div>
    <div>
        <p className="text-sm font-semibold">{comment.userName}</p>
        <p className="mt-1 text-sm text-zinc-300">{comment.comment}</p>
    </div>
    </div>
  )
}