import { http } from '@/shared/api/http';
import type { Movie } from '../model/movie';

export async function getMovies(): Promise<Movie[]> {
  const res = await http.get('/movie/list');
  return res.data;
}
