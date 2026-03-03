import { MovieSearchOutput } from "@domain/types/movie.type";
import MovieRepository from "@infrastructure/repositories/movie.repository";

class MoviesGetAllUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(): Promise<MovieSearchOutput[]> {
    return this.movieRepository.listAll();
  }
}

export default MoviesGetAllUseCase;
