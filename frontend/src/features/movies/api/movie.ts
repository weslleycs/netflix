import { http } from "@/app/api/http";
import type { Movie } from "../home/schema/movie";


export type RegisterDTO = { 
    title: string;
    description: string;
    imageUrl: string;
    genre: string;
};



export async function registerMovie(dto: RegisterDTO): Promise<void> {
  await http.post("/movie/register", dto);
}

export async function getMovies(): Promise<Movie[]> {
  const res = await http.get("/movie");
  return res.data;
}
