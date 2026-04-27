import { GetAllGenre } from '@domain/types/genreType';
import { IGenreRepository } from '@application/repositories/ports/IGenreRepository';
import { IUseCase } from '@application/useCases/ports/IUseCase';

class GetAllGenreUseCase implements IUseCase<void, GetAllGenre[]> {
  private readonly genreRepository: IGenreRepository;

  constructor(genreRepository: IGenreRepository) {
    this.genreRepository = genreRepository;
  }

  async execute(): Promise<GetAllGenre[]> {
    return this.genreRepository.listall();
  }
}

export default GetAllGenreUseCase;
