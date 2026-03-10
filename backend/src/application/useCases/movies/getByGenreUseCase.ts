import { Genres, GetByGenreMovie, Movies } from '@domain/types/movieType';
import MovieRepository from '@infrastructure/repositories/movieRepository';

class GetByGenreMovieUseCase {
  private readonly movieRepository: MovieRepository;

  constructor(movieRepository: MovieRepository) {
    this.movieRepository = movieRepository;
  }

  async execute(input: GetByGenreMovie): Promise<Genres[]> {
    return this.movieRepository.serchByGenre(input);
  }
}

export default GetByGenreMovieUseCase;
