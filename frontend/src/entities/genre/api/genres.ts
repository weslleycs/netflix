import { http } from '@/shared/api/http';
import type { Genres } from '../model/genres';
import type { Movie } from '@/entities/movie/model/movie';

export async function getAllGenres(): Promise<Genres[]> {
  const res = await http.get('/genre/list');
  return res.data;
}

export async function getMoviesByGenre(genre: string): Promise<Movie[]> {
  const res = await http.get('/genre/list',{ params: { genre } });
  return res.data;
}



