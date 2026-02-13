import { MovieSearchOutput} from "@domain/types/movie.type";
import MovieRepository from "@infrastructure/repositories/movie.repository";


class MoviesGetAllUseCase {
  private readonly movieRepository: MovieRepository;

  constructor(movieRepository: MovieRepository) {
    this.movieRepository = movieRepository;
  }

  async execute(): Promise<MovieSearchOutput[]> {
    return this.movieRepository.listAll();
  }
}

export default MoviesGetAllUseCase;
