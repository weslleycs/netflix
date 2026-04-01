import { http } from '@/shared/api/http';
import type { Movie, MovieDeatils } from '../model/movie';
import type { MovieComment } from '../model/comment';

export type RegisterDTO = {
  title: string;
  description: string;
  imageUrl: string;
  genre: string;
};

export async function registerMovie(dto: RegisterDTO): Promise<void> {
  await http.post('/movie/register', dto);
}

export async function getMovies(): Promise<Movie[]> {
  const res = await http.get('/movie/list');
  return res.data;
}

export async function getMoviesByTitle(title: string) {
  const { data } = await http.get('/movie/title', {
    params: { title },
  });
  return data;
}

export async function getMoviesByGenre(genre: string) {
  const { data } = await http.get('/movie/genre', {
    params: { genre },
  });
  return data;
}

export async function getMoviesById(id: number): Promise<Movie[]> {
  const res = await http.get('/movie/list', {
    params: { id },
  });
  return res.data;
}

export async function GetCommentsMovieById(movieId: number): Promise<MovieComment[]> {
  const res = await http.get('/movie/comments', {
    params: { movieId },
  });
  return res.data;
}
export async function GetMovieDetails(movieId: number): Promise<MovieDeatils> {
  const res = await http.get('/movie/details', {
    params: { movieId },
  });
  return res.data;
}



