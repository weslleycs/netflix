import { http } from '@/shared/api/http'

export type RegisterGenreDTO = {
  name: string
  description: string
}

export async function registerGenre(dto: RegisterGenreDTO): Promise<void> {
  await http.post('/genre/register', dto)
}
