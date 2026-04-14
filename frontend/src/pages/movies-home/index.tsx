import { getAllMoviesByGenres } from "@/entities/genre/api/genres";
import CardContainerCarouselMovies from "@/features/movies/home/components/cardContainerCaroselMovies";
import { useQuery } from "@tanstack/react-query";
export default function MoviesHomePage() {
  const { data: genresMovies = [], isLoading } = 
  useQuery({ 
    queryKey: ['genres-movies'], 
    queryFn: getAllMoviesByGenres, 
  })
  if (isLoading) return (
      <p>loading</p>
    )    
  return (
    <div className="py-8 space-y-8">
      {genresMovies.map((genre) => (
        <CardContainerCarouselMovies title={genre.name} movies={genre.movies} />
      ))}
    </div>
  )
}


