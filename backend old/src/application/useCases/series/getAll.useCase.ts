import { SerieSearchOutput } from "@domain/types/serie.type";
import SerieRepository from "@infrastructure/repositories/serie.repository";

class SeriesGetAllUseCase {
  constructor(private readonly serieRepository: SerieRepository) {}

  async execute(): Promise<SerieSearchOutput[]> {
    return this.serieRepository.listAll();
  }
}

export default SeriesGetAllUseCase;
