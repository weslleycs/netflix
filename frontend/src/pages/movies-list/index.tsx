import CardContainer from '@/features/movies/home/components/cardContainerMovies';
import { getMovies, getMoviesByTitle } from '@/entities/movie/api/movie';
import { useSearchParams } from 'react-router-dom';
import type { Movie } from '@/entities/movie/model/movie';
import { useQuery } from '@tanstack/react-query';
import { getMoviesByGenre } from '@/entities/genre/api/genres';

export default function MoviesListPage() {
  const [params] = useSearchParams();
  const titleUrl = params.get('title');
  const genreUrl = params.get('genre');

  const { data: movies = [], isLoading } = useQuery<Movie[]>({
    queryKey: ['movies', { title: titleUrl, genre: genreUrl }],
    queryFn: async () => {
      if (titleUrl) {
        return await getMoviesByTitle(titleUrl);
      }
      if (genreUrl) {
        return await getMoviesByGenre(genreUrl);
      }
      return await getMovies();
    },
  });
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <CardContainer movies={movies} />
    </div>
  );
}





