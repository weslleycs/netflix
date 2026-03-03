import { useEffect, useState } from "react";
import { getMovies } from "../../api/movie";
import CardContainerCarouselMovies from "../components/cardContainerCaroselMovies";
import type { Movie } from "../schema/movie";


export default function MoviesHomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getMovies();
      setMovies(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen text-white bg-black">
     

      <main className="max-w-6xl px-4 pt-24 pb-10 mx-auto">
        {loading ? (
          <p className="text-zinc-400">Loading...</p>
        ) : (
          <CardContainerCarouselMovies
            title="Movies"
            movies={movies}
          />
        )}
      </main>
    </div>
  );
}