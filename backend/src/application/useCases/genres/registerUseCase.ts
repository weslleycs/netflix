import { CreateGenreInput } from '@domain/types/genreType';
import { IGenreRepository } from '@application/repositories/ports/IGenreRepository';
import { IUseCase } from '@application/useCases/ports/IUseCase';

class RegisterGenreUseCase implements IUseCase<CreateGenreInput, boolean> {
  private readonly genreRepository: IGenreRepository;

  constructor(genreRepository: IGenreRepository) {
    this.genreRepository = genreRepository;
  }

  async execute(input: CreateGenreInput): Promise<boolean> {
    return this.genreRepository.register(input);
  }
}

export default RegisterGenreUseCase;
