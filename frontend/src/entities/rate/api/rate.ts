import { http } from "@/shared/api/http";
import type { RateMovieBody } from "../model/rate";

export async function RateMovie(data: RateMovieBody):Promise<void> {
  await http.post("/rate/movie", data);  
}