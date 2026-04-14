import { GetAllSeriesByGenresOutput } from '@domain/types/genreType';
import GenreRepository from '@infrastructure/repositories/genreRepository';

class GetAllSeriesByGenresUseCase {
  private readonly genreRepository: GenreRepository;
  constructor(genreRepository: GenreRepository) {
    this.genreRepository = genreRepository;
  }
  async execute(): Promise<GetAllSeriesByGenresOutput[]> {
    return this.genreRepository.getAllSeriesByGenres();
  }
}

export default GetAllSeriesByGenresUseCase;
