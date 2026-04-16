import { http } from "@/shared/api/http"
import type { GetCommentsSerie } from "../model/comments"

export async function getCommentSerieById(serieId: number): Promise<GetCommentsSerie[]> {
  const {data} = await http.get('/comments/serie', { params: { serieId } })
  return data
}