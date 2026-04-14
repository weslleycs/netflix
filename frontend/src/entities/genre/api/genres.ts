import { http } from '@/shared/api/http';
import type { Genres, GetAllMoviesByGenresOutput, GetAllSeriesByGenresOutput } from '../model/genres';

export async function getAllGenres(): Promise<Genres[]> {
  const res = await http.get('/genre/list');
  return res.data;
}

export async function getAllMoviesByGenres(): Promise<GetAllMoviesByGenresOutput[]> {
  const res = await http.get('/genre/movie-list');
  return res.data;
}

export async function getAllSeriesByGenres(): Promise<GetAllSeriesByGenresOutput[]> {
  const res = await http.get('/genre/serie-list');
  return res.data;
}


