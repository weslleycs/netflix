import { http } from "@/shared/api/http";

export type CommentMovieBody = {
  userId: number,
  movieId: number, 
  comment: string 
}

export type CommentSerieBody = { 
  userId: number, 
  serieId: number, 
  comment: string 
}

export type CommentBody = { 
  userId: number, 
  serieId?: number,
  movieId?: number, 
  comment: string 
}
export async function editComment(id: number, data: { comment: string }): Promise<void> {
  await http.patch(`/comment/${id}`, data);
}

export async function deleteComment(id: number, data: { userId: number }): Promise<void> {
  await http.delete(`/comment/${id}`, {data});
}

export async function comment(data: CommentBody): Promise<void> {
  if(data.movieId){
    await http.post('/comment/movie', data)
  }else if(data.serieId){
    await http.post('/comment/serie', data)
  }
}

