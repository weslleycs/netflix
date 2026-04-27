import { GetAllMoviesByGenresOutput } from '@domain/types/genreType';
import { IGenreRepository } from '@application/repositories/ports/IGenreRepository';
import { IUseCase } from '@application/useCases/ports/IUseCase';

class GetAllMoviesByGenresUseCase implements IUseCase<void, GetAllMoviesByGenresOutput[]> {
  private readonly genreRepository: IGenreRepository;

  constructor(genreRepository: IGenreRepository) {
    this.genreRepository = genreRepository;
  }

  async execute(): Promise<GetAllMoviesByGenresOutput[]> {
    return this.genreRepository.getAllMoviesByGenres();
  }
}

export default GetAllMoviesByGenresUseCase;
