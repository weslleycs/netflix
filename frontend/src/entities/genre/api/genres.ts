import { http } from "@/shared/api/http";
import type { Genres } from "../model/genres";

export async function getAllGenres(): Promise<Genres[]> {
  const res = await http.get('/genre/list');
  return res.data;
}

export async function getMoviesByGenre(genre: string) {
  const { data } = await http.get('/movie/genre', {
    params: { genre },
  });
  return data;
}