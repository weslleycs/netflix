import { http } from "@/shared/api/http";
import type { CommentMovieBody } from "../model/comment";

export async function CommentMovie(data: CommentMovieBody):Promise<void> {
  await http.post("/rate/movie", data);  
}