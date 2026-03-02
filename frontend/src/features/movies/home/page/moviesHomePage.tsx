import { useEffect, useState } from "react";
import { getMovies } from "../../api/movie";
import CardContainerCarouselMovies from "../components/cardContainerCaroselMovies";

import AppHeader from "../components/appHeader";
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
    <div className="min-h-screen bg-black text-white">
      <AppHeader />

      <main className="max-w-6xl mx-auto px-4 pt-24 pb-10">
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