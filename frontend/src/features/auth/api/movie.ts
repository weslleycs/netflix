import { http } from "@/app/api/http";

export type RegisterDTO = { 
    title: string;
    description: string;
    imageUrl: string;
    genre: string;
};

export async function registerMovie(dto: RegisterDTO): Promise<void> {
  await http.post("/movie/register", dto);
}

