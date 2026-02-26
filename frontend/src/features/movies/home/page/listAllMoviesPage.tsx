import { useEffect, useState } from "react";
import type { Movie } from "@/features/movies/home/movie.type";
import { getMovies } from "@/features/movies/api/movie";
import CardContainer from "@/features/movies/home/components/cardContainerMovies";

export default function MoviesListAllPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getMovies();
        setMovies(data);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen text-white bg-black">
      <div className="w-full max-w-6xl px-4 py-6 mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Todos os Filmes</h1>

        {isLoading ? (
          <p className="text-zinc-400">Carregando...</p>
        ) : (
          <CardContainer title="Todos os Filmes" movies={movies} />
        )}
      </div>
    </div>
  );
}