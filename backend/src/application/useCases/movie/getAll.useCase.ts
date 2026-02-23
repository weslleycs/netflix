import { MovieSearchOutput, MoviesListQuery } from "@domain/types/movie.type";
import MovieRepository from "@infrastructure/repositories/movie.repository";

class MoviesGetAllUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(input?: MoviesListQuery): Promise<MovieSearchOutput[]> {
    return this.movieRepository.listAll(input);
  }
}

export default MoviesGetAllUseCase;
