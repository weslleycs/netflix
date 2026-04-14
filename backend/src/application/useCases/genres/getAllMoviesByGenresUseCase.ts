import { GetAllMoviesByGenresOutput } from '@domain/types/genreType';
import GenreRepository from '@infrastructure/repositories/genreRepository';

class GetAllMoviesByGenresUseCase {
  private readonly genreRepository: GenreRepository;
  constructor(genreRepository: GenreRepository) {
    this.genreRepository = genreRepository;
  }
  async execute(): Promise<GetAllMoviesByGenresOutput[]> {
    return this.genreRepository.getAllMoviesByGenres();
  }
}

export default GetAllMoviesByGenresUseCase;
