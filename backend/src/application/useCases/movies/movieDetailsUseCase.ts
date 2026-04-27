import { MovieDetails } from '@domain/types/movieType';
import { IMovieRepository } from '@application/repositories/ports/IMovieRepository';
import { IUseCase } from '@application/useCases/ports/IUseCase';

class MovieDetailsUseCase implements IUseCase<number, MovieDetails> {
  private readonly movieRepository: IMovieRepository;

  constructor(movieRepository: IMovieRepository) {
    this.movieRepository = movieRepository;
  }

  async execute(movieId: number): Promise<MovieDetails> {
    return this.movieRepository.movieDetailsById(movieId);
  }
}

export default MovieDetailsUseCase;
