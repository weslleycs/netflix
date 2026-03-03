import { http } from "@/app/api/http";

export async function getSeriesByTitle(title: string) {
  const { data } = await http.get("/serie/title", {
    params: { title }, 
  });
  return data;
}
export async function getSeriesByGenre(genre: string) {
  const { data } = await http.get("/serie/genre", {
    params: { genre }, 
  });
  return data;
}