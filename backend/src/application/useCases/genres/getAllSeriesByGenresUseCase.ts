import { GetAllSeriesByGenresOutput } from '@domain/types/genreType';
import { IGenreRepository } from '@application/repositories/ports/IGenreRepository';
import { IUseCase } from '@application/useCases/ports/IUseCase';

class GetAllSeriesByGenresUseCase implements IUseCase<void, GetAllSeriesByGenresOutput[]> {
  private readonly genreRepository: IGenreRepository;

  constructor(genreRepository: IGenreRepository) {
    this.genreRepository = genreRepository;
  }

  async execute(): Promise<GetAllSeriesByGenresOutput[]> {
    return this.genreRepository.getAllSeriesByGenres();
  }
}

export default GetAllSeriesByGenresUseCase;
