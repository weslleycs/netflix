import { GetMoviesByGenreinput, GetMoviesByGenreoutput } from '@domain/types/movieType';
import MovieRepository from '@infrastructure/repositories/movieRepository';

class GetMoviesByGenreUseCase {
  private readonly movieRepository: MovieRepository;

  constructor(movieRepository: MovieRepository) {
    this.movieRepository = movieRepository;
  }

  async execute(input: GetMoviesByGenreinput): Promise<GetMoviesByGenreoutput[]> {
    return this.movieRepository.searchByGenre(input);
  }
}

export default GetMoviesByGenreUseCase;
