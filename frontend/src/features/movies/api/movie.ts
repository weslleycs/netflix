import { http } from '@/shared/api/http';

export type RegisterMovieDTO = {
  title: string;
  description: string;
  imageUrl: string;
  genre: string;
};

export async function registerMovie(dto: RegisterMovieDTO): Promise<void> {
  await http.post('/movie/register', dto);
}
