import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getMovies } from "@/features/movies/api/movie";
import CardContainer from "@/features/movies/home/components/cardContainerMovies";
import AppHeader from "@/features/movies/home/components/appHeader";
import type { Movie } from "../schema/movie";

const PAGE_SIZE = 10;

function normalize(text: string) {
  return (text ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function movieHasGenre(movie: any, genre: string) {
  if (!movie || !genre) return false;
  if (typeof movie.genre === "string") {
    return movie.genre === genre;
  }


  if (Array.isArray(movie.genres)) {
    if (movie.genres.length > 0 && typeof movie.genres[0] === "string") {
      return movie.genres.includes(genre);
    }

    return movie.genres.some((g: any) => {
      if (!g) return false;
      return g.value === genre || g.name === genre || g.code === genre;
    });
  }

  if (typeof movie.genreId === "string") return movie.genreId === genre;
  if (typeof movie.genreName === "string") return movie.genreName === genre;

  return false;
}

export default function MoviesListAllPage() {
  const [params] = useSearchParams();
  const genre = params.get("genre"); 
  const q = params.get("q"); 

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const data = await getMovies();
        setMovies(data);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);


  useEffect(() => {
    setPage(1);
  }, [genre, q]);

  const filtered = useMemo(() => {
    let list: Movie[] = movies;


    if (genre) {
      list = list.filter((m: any) => movieHasGenre(m, genre));
    }

   
    if (q) {
      const nq = normalize(q);
      list = list.filter((m) => {
        const hay = normalize(`${m.title} ${m.description ?? ""}`);
        return hay.includes(nq);
      });
    }

    return list;
  }, [movies, genre, q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(page, 1), totalPages);

  const paginatedMovies = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, safePage]);

  const pageTitle = genre
    ? `Movies • ${genre}`
    : q
    ? `Results • "${q}"`
    : "All Movies";

  return (
    <div className="min-h-screen bg-black text-white">
      <AppHeader />

      <main className="mx-auto w-full max-w-6xl px-4 pt-24 pb-10 space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">{pageTitle}</h1>
            <p className="text-sm text-zinc-400">
              {filtered.length} found • Showing {paginatedMovies.length} on this page
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={safePage === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 rounded bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 disabled:hover:bg-zinc-800"
            >
              Previous
            </button>

            <span className="text-sm text-zinc-300">
              {safePage} / {totalPages}
            </span>

            <button
              type="button"
              disabled={safePage === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-4 py-2 rounded bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 disabled:hover:bg-zinc-800"
            >
              Next
            </button>
          </div>
        </div>

        {isLoading ? (
          <p className="text-zinc-400">Loading...</p>
        ) : (
          <CardContainer title={pageTitle} movies={paginatedMovies} />
        )}
      </main>
    </div>
  );
}