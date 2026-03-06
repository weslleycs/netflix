import { GetByTitleMovie, Movies } from '@domain/types/movieType';
import MovieRepository from '@infrastructure/repositories/movieRepository';

class GetByTitleSerieUseCase {
  private readonly serieRepository: SerieRepository;

  constructor(serieRepository: SerieRepository) {
    this.serieRepository = serieRepository;
  }

  async execute(input: GetByTitleMovie): Promise<Series[]> {
    return this.serieRepository.serchByTitle(input);
  }
}

export default GetByTitleSerieUseCase;
