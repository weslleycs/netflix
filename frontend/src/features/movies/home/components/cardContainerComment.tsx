import type { MovieComment } from "@/entities/movie/model/comment";
import CommentDetail from "./cardCommentDetail";


type Props = {
  comments: MovieComment[];
};

export default function CardContainerComment({  comments }: Props) {
  return (
    <section className="p-6 border rounded-2xl border-zinc-800 bg-zinc-950/60">
      <div className="flex items-center justify-between">
       
        <span className="text-sm text-zinc-400">
          {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
        </span>
      </div>

      <div className="mt-4">
        {comments.length === 0 ? (
          <p className="text-zinc-400">No Comments</p>
        ) : (
          <ul className="flex flex-wrap gap-6">
            {comments.map((comment) => (
              <CommentDetail key={comment.id} comment={comment} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}