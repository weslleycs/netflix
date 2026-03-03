import { useEffect, useState } from "react";
import { getMovies } from "../../api/movie";
import CardContainerCarouselMovies from "../components/cardContainerCaroselMovies";
import CardContainerCarouselSeries from "@/features/series/home/components/cardContainerCaroselSeries";
import { seriesData, type Serie } from "@/features/series/schema/series";
import type { Movie } from "../../schema/movie";


export default function MoviesHomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [series, setSeries] = useState<Serie[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getMovies();
      const dataSerie = seriesData;
      setSeries(dataSerie)
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
        ) : (<div>
          <CardContainerCarouselMovies
            title="Movies"
            movies={movies}
          />
          <CardContainerCarouselSeries
            title="Series"
            series={series}
          />
        </div>)}
      </main>
    </div>
  );
}