import type { Movie } from "../movie.type";
import CardMovie from "./cardMovie";

type Props = {
  title?: string;
  movies: Movie[];
};

export default function CardContainer({ title = "Movies", movies }: Props) {
  return (
    <section className="p-6 border rounded-2xl border-zinc-800 bg-zinc-950/60">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <span className="text-sm text-zinc-400">{movies.length} itens</span>
      </div>

      <div className="mt-4">
        {movies.length === 0 ? (
          <p className="text-zinc-400">Nenhum filme encontrado.</p>
        ) : (
          <ul className="flex flex-wrap gap-6">
            {movies.map((movie) => (
              <CardMovie key={movie.id} movie={movie} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}