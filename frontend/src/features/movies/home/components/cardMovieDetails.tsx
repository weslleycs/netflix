import type { MovieDeatils } from "@/entities/movie/model/movie";

type Props = {
  movieDetails: MovieDeatils;
};

export default function CardMovieDetails({ movieDetails }: Props) {
  return (
    <li className="p-4 border rounded-xl border-zinc-800 bg-zinc-900">
      <p className="mt-2 text-sm text-zinc-300">{movieDetails.title}</p>
      <p className="text-sm font-semibold text-zinc-100">{movieDetails.description}</p>
      <p className="mt-2 text-sm text-zinc-300">{movieDetails.imageUrl}</p>
      <p className="mt-2 text-sm text-zinc-300">{movieDetails.rate}</p>
      <p className="mt-2 text-sm text-zinc-300">{movieDetails.genre}</p>
      <span className="block mt-2 text-xs text-zinc-500">#{movieDetails.id}</span>
    </li>
  );
}

