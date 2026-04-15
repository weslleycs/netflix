import { http } from '@/shared/api/http';
import type { Movie } from '../model/movie';
import type { MovieDetails } from '../model/movieDetails';
import type { MovieComment } from '../model/movieComment';

export async function getMovies(): Promise<Movie[]> {
  const res = await http.get('/movie/list');
  return res.data;
}

export async function getMoviesByTitle(title: string): Promise<Movie[]> {
  const { data } = await http.get('/movie/list', { params: { title } })
  return data
 }
 export async function getMovieDetails(movieId: number): Promise<MovieDetails> {
   const { data } = await http.get('/movie/details', { params: { movieId } })
   return data
 }
 export async function getCommentsMovieById(movieId: number): Promise<MovieComment[]> {
   const { data } = await http.get('/movie/comments', { params: { movieId } })
   return data
 }

 export async function getMoviesByGenre(genre: string): Promise<Movie[]> {
  const { data } = await http.get('/movie/list', { params: { genre } })
  return data
 }
