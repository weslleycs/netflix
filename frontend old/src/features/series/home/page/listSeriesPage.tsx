import { useEffect, useState } from "react";
import {  useSearchParams } from "react-router-dom";
import type { Movie } from "@/features/movies/schema/movie";
import CardContainer from "@/features/movies/home/components/cardContainerMovies";
import { getSeriesByGenre, getSeriesByTitle } from "@/features/movies/api/serie";
import { seriesData } from "../../schema/series";


export default function SeriesListPage() {
  const [series,setSeries]= useState<Movie[]>([])
  const [params] = useSearchParams()
  const titleUrl = params.get("title")
  const genreUrl = params.get("genre")  
  
  useEffect(() => {
    async function loadSeries(){
      let dataSeries = []
      if(titleUrl){
        dataSeries = await getSeriesByTitle(titleUrl)
      }else if(genreUrl){
        dataSeries = await getSeriesByGenre(genreUrl)
      }else{
        dataSeries = await seriesData
      }
      setSeries(dataSeries)
    }
    loadSeries()
  },[titleUrl,genreUrl])

  

  return(
    <div>
      <CardContainer  movies= {series}/>
    </div>
  )
}