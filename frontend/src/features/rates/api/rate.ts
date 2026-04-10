import { http } from "@/shared/api/http";

export type RateMovieBody = {
  userId: number, 
  movieId: number, 
  rate: number
}

export async function rateMovie(data: RateMovieBody): Promise<void> {
  await http.post('/rate/movie', data);
}




