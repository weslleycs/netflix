import { useEffect, useState } from "react";
import CardContainer from "../components/cardContainerMovies";
import { getMovies, getMoviesByGenre, getMoviesByTitle } from "../../api/movie";
import {  useSearchParams } from "react-router-dom";
import type { Movie } from "../../schema/movie";


export default function MoviesListPage() {
  const [movies,setMovies]= useState<Movie[]>([])
  const [params] = useSearchParams()
  const titleUrl = params.get("title")
  const genreUrl = params.get("genre")  
  
  useEffect(() => {
    async function loadMovies(){
      let dataMovies = []
      if(titleUrl){
        dataMovies = await getMoviesByTitle(titleUrl)
      }else if(genreUrl){
        dataMovies = await getMoviesByGenre(genreUrl)
      }else{
        dataMovies = await getMovies()
      }
      setMovies(dataMovies)
    }
    loadMovies()
  },[titleUrl,genreUrl])

  return(
    <div>
      <CardContainer  movies= {movies}/>
    </div>
  )
}