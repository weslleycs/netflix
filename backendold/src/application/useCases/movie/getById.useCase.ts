import { GetById, MovieSearchOutput} from "@domain/types/movie.type";
import MovieRepository from "@infrastructure/repositories/movie.repository";


class MovieGetByIdUseCase {
  private readonly movieRepository: MovieRepository;

  constructor(movieRepository: MovieRepository) {
    this.movieRepository = movieRepository;
  }

  async execute(input: GetById): Promise<MovieSearchOutput> {
    return this.movieRepository.getById(input);
  }
}

export default MovieGetByIdUseCase;
