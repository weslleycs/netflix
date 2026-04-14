import { getAllSeriesByGenres } from "@/entities/genre/api/genres";
import CardContainerCarouselSeries from "@/features/series/home/components/cardContainerCaroselSeries";
import { useQuery } from "@tanstack/react-query";
export default function SeriesHomePage() {
  const { data: genresSeries = [], isLoading } = 
  useQuery({ 
    queryKey: ['genres-series'], 
    queryFn: getAllSeriesByGenres, 
  })
  if (isLoading) return (
      <p>loading</p>
    )    
  return (
    <div className="py-8 space-y-8">
      {genresSeries.map((genre) => (
        <CardContainerCarouselSeries title={genre.name} series={genre.series} />
      ))}
    </div>
  )
}


