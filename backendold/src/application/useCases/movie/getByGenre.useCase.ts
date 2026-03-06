import { MovieSearchInput, MovieSearchOutput} from "@domain/types/movie.type";
import MovieRepository from "@infrastructure/repositories/movie.repository";


class MovieGetByGenreUseCase {
  private readonly movieRepository: MovieRepository;

  constructor(movieRepository: MovieRepository) {
    this.movieRepository = movieRepository;
  }

  async execute(input: MovieSearchInput): Promise<MovieSearchOutput[]> {
    return this.movieRepository.serchByGenre(input);
  }
}

export default MovieGetByGenreUseCase;
