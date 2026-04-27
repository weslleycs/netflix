import { MovieListAllInput, Movies } from '@domain/types/movieType';
import { IMovieRepository } from '@application/repositories/ports/IMovieRepository';
import { IUseCase } from '@application/useCases/ports/IUseCase';

class GetAllMovieUseCase implements IUseCase<MovieListAllInput, Movies[]> {
  private readonly movieRepository: IMovieRepository;

  constructor(movieRepository: IMovieRepository) {
    this.movieRepository = movieRepository;
  }

  async execute(input: MovieListAllInput): Promise<Movies[]> {
    return this.movieRepository.listAll(input);
  }
}

export default GetAllMovieUseCase;
