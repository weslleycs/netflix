import { http } from "@/shared/api/http"
import type { Serie } from "../model/serie"
import type { SerieDetails } from "../model/serieDetails"

export async function getSeries(): Promise<Serie[]> {
  const { data } = await http.get('/serie/list')
  return data
}

export async function getSeriesByTitle(title: string): Promise<Serie[]> {
  const { data } = await http.get('/serie/list', { params: { title } })
  return data
}

export async function getSeriesByGenre(genre: string): Promise<Serie[]> {
  const { data } = await http.get('/serie/list', { params: { genre } })
  return data
}

export async function getDetailsSerie(serieId: number): Promise<SerieDetails> {
  const { data } = await http.get('/serie/Details', { params: { serieId } })
  return data
}

