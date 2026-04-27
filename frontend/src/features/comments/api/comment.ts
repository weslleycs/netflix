import { http } from '@/shared/api/http'

export type CommentBody = {
  serieId?: number
  movieId?: number
  comment: string
}

export async function editComment(id: number, data: { comment: string }): Promise<void> {
  await http.patch(`/comment/${id}`, data)
}

export async function deleteComment(id: number): Promise<void> {
  await http.delete(`/comment/${id}`)
}

export async function comment(data: CommentBody): Promise<void> {
  if (data.movieId) {
    await http.post('/comment/movie', { movieId: data.movieId, comment: data.comment })
  } else if (data.serieId) {
    await http.post('/comment/serie', { serieId: data.serieId, comment: data.comment })
  }
}
