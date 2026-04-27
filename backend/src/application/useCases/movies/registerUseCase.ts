import { CreateMovieInput } from '@domain/types/movieType';
import { IMovieRepository } from '@application/repositories/ports/IMovieRepository';
import { IUseCase } from '@application/useCases/ports/IUseCase';

class RegisterMovieUseCase implements IUseCase<CreateMovieInput, boolean> {
  private readonly movieRepository: IMovieRepository;

  constructor(movieRepository: IMovieRepository) {
    this.movieRepository = movieRepository;
  }

  async execute(input: CreateMovieInput): Promise<boolean> {
    return this.movieRepository.register(input);
  }
}

export default RegisterMovieUseCase;
