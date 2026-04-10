import type { MovieComment } from "@/entities/movie/model/movieComment"
import CardCommentDetail from "./cardCommentDetail"

type Props = { 
  comments: MovieComment[] 
}

export default function CardContainerComment({comments}:Props){
  return (
  <section className="mt-8 space-y-4">
    <h2 className="text-xl font-semibold">Comments ({comments.length})</h2>
    {comments.length === 0
        ? <p className="text-zinc-400">No comments yet. Be the first!</p>
        : comments.map((c) => <CardCommentDetail key={c.id} comment={c} />)
    }
  </section>
  )
}
