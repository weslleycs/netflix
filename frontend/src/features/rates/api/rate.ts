import { http } from '@/shared/api/http'

export type RateBody = {
  serieId?: number
  movieId?: number
  rate: number
}

export async function rateMovieSerie(data: RateBody): Promise<void> {
  if (data.movieId) {
    await http.post('/rate/register-movie', { movieId: data.movieId, rate: data.rate })
  } else if (data.serieId) {
    await http.post('/rate/register-serie', { serieId: data.serieId, rate: data.rate })
  }
}
