import { http } from '@/shared/api/http';
import type { User } from '@/entities/user/model/user';

export type LoginDTO = { email: string; password: string };
export type LoginResponse = { token: string; user: User };

export async function loginUser(dto: LoginDTO): Promise<LoginResponse> {
  const { data } = await http.post('/auth/login', dto);
  return data;
}

export type RegisterDTO = { name: string; email: string; password: string };

export async function registerUser(dto: RegisterDTO): Promise<void> {
  await http.post('/auth/register', dto);
}
