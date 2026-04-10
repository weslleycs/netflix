import { http } from '@/shared/api/http';

export type RegisterMovieDTO = {
  title: string;
  description: string;
  imageUrl: string;
  genre: string;
};
export type UpdateMovieDTO = {
  title: string;
  description: string;
  imageUrl: string;
};

export async function registerMovie(dto: RegisterMovieDTO): Promise<void> {
  await http.post('/movie/register', dto);
}

export async function updateMovie(id: number, dto: UpdateMovieDTO): Promise<void> {
   await http.put(`/movie/updater/${id}`, dto)
 }
