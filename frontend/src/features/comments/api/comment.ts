import { http } from "@/shared/api/http";

export type CommentMovieBody = {
  userId: number,
  movieId: number, 
  comment: string 
}

export async function commentMovie(data: CommentMovieBody): Promise<void> {
  await http.post('/comment/movie', data);
}

export async function editComment(id: number, data: { comment: string }): Promise<void> {
  await http.patch(`/comment/${id}`, data);
}

export async function deleteComment(id: number, data: { userId: number }): Promise<void> {
  await http.delete(`/comment/${id}`, {data});
}