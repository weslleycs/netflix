import { CreateSerieInput } from "@domain/types/serie.type";
import SerieRepository from "@infrastructure/repositories/serie.repository";
import { log } from "node:console";

class RegisterSerieUseCase {
  private readonly serieRepository: SerieRepository;

  constructor(serieRepository: SerieRepository) {
    this.serieRepository = serieRepository;  
  }

  async execute(input: CreateSerieInput): Promise<boolean> {
    
    return this.serieRepository.register(input);
  }
}

export default RegisterSerieUseCase;
