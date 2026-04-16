import { http } from "@/shared/api/http"
import type { GetRateSerie } from "../model/rate"

export async function getRateSerie(serieId:number): Promise<GetRateSerie> {
  const res = await http.get('/serie/list', {params: {serieId}})
  return res.data
}