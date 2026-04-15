import { MovieListAllInput } from '@domain/types/movieType';
import { Serie } from '@domain/types/serieType';
import SerieRepository from '@infrastructure/repositories/serieRepository';

class GetAllSerieUseCase {
  private readonly serieRepository: SerieRepository;

  constructor(serieRepository: SerieRepository) {
    this.serieRepository = serieRepository;
  }

  async execute(input: MovieListAllInput): Promise<Serie[]> {
    return this.serieRepository.listall(input);
  }
}

export default GetAllSerieUseCase;
