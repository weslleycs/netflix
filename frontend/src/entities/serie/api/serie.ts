import { http } from "@/shared/api/http"
import type { Serie } from "../model/serie"

export async function getSeries(): Promise<Serie[]> {
  const res = await http.get('/serie/list')
  return res.data
}

export async function getSeriesByTitle(title: string): Promise<Serie[]> {
  const {data} = await http.get('/movie/title', { params: { title } })
  return data
}

export async function getSerieCommentsRate(serieId: number): Promise<Serie[]> {
  const {data} = await http.get('/movie/title', { params: { serieId } })
  return data
}

