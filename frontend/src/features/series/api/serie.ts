import { http } from '@/shared/api/http';

export type RegisterSerieDTO = {
  title: string;
  description: string;
  imageUrl: string;
  genre: string;
};
export type UpdateSerieDTO = {
  title: string;
  description: string;
  imageUrl: string;
};

export async function registerMovie(dto: RegisterSerieDTO): Promise<void> {
  await http.post('/serie/register', dto);
}

export async function updateMovie(id: number, dto: UpdateSerieDTO): Promise<void> {
   await http.put(`/serie/updater/${id}`, dto)
 }
