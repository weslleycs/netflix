import type { MovieComment } from "@/entities/movie/model/comment";

type Props = {
  comment: MovieComment;
};

export default function CommentDetail({ comment }: Props) {
  return (
    <li className="p-4 border rounded-xl border-zinc-800 bg-zinc-900">
      <p className="text-sm font-semibold text-zinc-100">{comment.userName}</p>
      <p className="mt-2 text-sm text-zinc-300">{comment.comment}</p>
      <span className="block mt-2 text-xs text-zinc-500">#{comment.id}</span>
    </li>
  );
}