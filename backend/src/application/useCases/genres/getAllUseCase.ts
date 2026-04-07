import { GetAllGenre } from '@domain/types/genreType';
import GenreRepository from '@infrastructure/repositories/genreRepository';

class GetAllUseCase {
  private readonly genreRepository: GenreRepository;
  constructor(genreRepository: GenreRepository) {
    this.genreRepository = genreRepository;
  }
  async execute(): Promise<GetAllGenre[]> {
    return this.genreRepository.listall();
  }
}

export default GetAllUseCase;
