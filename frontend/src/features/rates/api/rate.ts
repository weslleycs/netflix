import { http } from "@/shared/api/http";
export type RateBody = {
   userId: number, 
   serieId?: number, 
   movieId?: number,   
   rate: number 
}
export async function rateMovieSerie(data: RateBody): Promise<void> {
  if(data.movieId){
    await http.post('/rate/movie', data)
  }else if(data.serieId){
    await http.post('/rate/serie', data)
  }
}





