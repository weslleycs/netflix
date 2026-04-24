import { http } from '@/shared/api/http'

export type RegisterSerieDTO = {
  title: string
  description: string
  imageUrl: string
  genre: string
}

export async function registerSerie(dto: RegisterSerieDTO): Promise<void> {
  await http.post('/serie/register', dto)
}
