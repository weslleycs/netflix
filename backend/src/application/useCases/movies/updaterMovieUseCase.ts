import { UpdaterMovie } from '@domain/types/movieType';
import { IMovieRepository } from '@application/repositories/ports/IMovieRepository';
import { IUseCase } from '@application/useCases/ports/IUseCase';

class UpdaterMovieUseCase implements IUseCase<UpdaterMovie, boolean> {
  private readonly movieRepository: IMovieRepository;

  constructor(movieRepository: IMovieRepository) {
    this.movieRepository = movieRepository;
  }

  async execute(input: UpdaterMovie): Promise<boolean> {
    return this.movieRepository.updater(input);
  }
}

export default UpdaterMovieUseCase;
