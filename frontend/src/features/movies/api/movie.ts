import { http } from "@/app/api/http";

export type RegisterDTO = { 
    title: string;
    description: string;
    imageUrl: string;
    genre: string;
};

export type Movie = { 
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    genre: string;
};

export async function registerMovie(dto: RegisterDTO): Promise<void> {
  await http.post("/movie/register", dto);
}

export async function getMovies(): Promise<Movie[]> {
  return await http.get("/movie");
}
