import { MovieSearchOutput, MovieSerchInput } from "@domain/types/movie.type";


class MovieSearchUseCase {
  private readonly movieSearchRepository: MovieSearchRepository;

  constructor(movieSearchRepository: MovieSearchRepository) {
    this.movieSearchRepository = movieSearchRepository;
  }

  async execute(input: MovieSerchInput): Promise<MovieSearchOutput[]> {
    return this.movieSearchRepository.search(input);
  }
}

export default MovieSearchUseCase;
