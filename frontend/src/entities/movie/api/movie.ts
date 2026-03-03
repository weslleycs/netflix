import { http } from "@/shared/api/http";
import type { Movie } from "../model/movie";

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

export async function getMoviesByTitle(title: string) {
  const { data } = await http.get("/movie/title", {
    params: { title },
  });
  return data;
}

export async function getMoviesByGenre(genre: string) {
  const { data } = await http.get("/movie/genre", {
    params: { genre },
  });
  return data;
}
