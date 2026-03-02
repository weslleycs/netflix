import { useRef } from "react";
import CardMovie from "./cardMovie";
import type { Movie } from "../schema/movie";

type Props = {
  title?: string;
  movies: Movie[];
};

export default function CardContainerCarouselMovies({
  title = "New Releases",
  movies,
}: Props) {
  const scrollerRef = useRef<HTMLUListElement | null>(null);

  function scrollByCards(direction: "prev" | "next") {
    const el = scrollerRef.current;
    if (!el) return;

    const amount = 320 * 4; 
    el.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  }

  return (
    <section className="p-6 border rounded-2xl border-zinc-800 bg-zinc-950/60">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">{title}</h2>
          <span className="text-sm text-zinc-400">{movies.length} items</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByCards("prev")}
            className="w-10 h-10 text-white transition border rounded-full border-zinc-700 bg-black/30 hover:bg-black/50"
            aria-label="Anterior"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => scrollByCards("next")}
            className="w-10 h-10 text-white transition border rounded-full border-zinc-700 bg-black/30 hover:bg-black/50"
            aria-label="Próximo"
          >
            ›
          </button>
        </div>
      </div>

      <div className="mt-4">
        {movies.length === 0 ? (
          <p className="text-zinc-400">No movies found.</p>
        ) : (
          <ul
            ref={scrollerRef}
            className="
              flex flex-nowrap gap-6 overflow-x-auto scroll-smooth pb-2
              [-ms-overflow-style:none] [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {movies.map((movie) => (
              <CardMovie key={movie.id} movie={movie} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}