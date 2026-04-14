import type { Movie } from '@/entities/movie/model/movie';
import CardMovie from './cardMovie';

type Props = {
  title?: string;
  movies: Movie[];
};

export default function CardContainerMovies({ title, movies }: Props) {
  return (
    <section className="p-6 border rounded-2xl border-zinc-800 bg-zinc-950/60">
      {title && <h2 className="mb-4 text-xl font-semibold">{title}</h2>}

      {movies.length === 0 ? (
        <p className="text-zinc-400">No movies found.</p>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies.map((movie) => (
            <CardMovie key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
}