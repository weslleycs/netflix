import {
  CreateSerieInput,
  Serie,
  SerieDetails,
  SerieListAllInput,
} from '@domain/types/serieType';

export interface ISerieRepository {
  register(input: CreateSerieInput): Promise<boolean>;
  listall(input: SerieListAllInput): Promise<Serie[]>;
  serieDetailsById(serieId: number): Promise<SerieDetails>;
}
