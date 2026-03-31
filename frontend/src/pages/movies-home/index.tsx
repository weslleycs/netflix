import { getMovies } from "@/entities/movie/api/movie";
import CardContainerCarouselMovies from "@/features/movies/home/components/cardContainerCaroselMovies";
import { useQuery } from "@tanstack/react-query";
export default function MoviesHomePage() {
  const {
    data: movies = [],
    isLoading,
    isError
  } = useQuery({
    queryKey:['movies'],
    queryFn:getMovies,
  }) 

  return (
    <div className="min-h-screen text-white bg-black">
      <main className="max-w-6xl px-4 pt-24 pb-10 mx-auto">
        {isLoading ? (
          <p className="text-zinc-400">Loading...</p>
        ) : isError ? (
          <p className="text-zinc-400">Not Found...</p>
        ):(
          <CardContainerCarouselMovies title="Movies" movies={movies} />
        )}
      </main>
    </div>
  );
}


