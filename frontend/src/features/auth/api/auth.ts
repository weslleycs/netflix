import { http } from "@/app/api/http";
import type { User } from "@/features/auth/store/auth.store";

export type LoginDTO = { email: string; password: string };
export type LoginResponse = { token: string; user: User };

export async function login(dto: LoginDTO): Promise<LoginResponse> {
  const { data } = await http.post("/auth/login", dto);
  return data;
}

export type RegisterDTO = { email: string; password: string };

export async function registerUser(dto: RegisterDTO): Promise<void> {
  await http.post("/auth/register", dto);
}