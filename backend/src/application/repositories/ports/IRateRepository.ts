import { SerieInput } from '@domain/types/commentType';
import {
  GetRateMovie,
  GetRateSerie,
  MovieInput,
  RegisterRateMovie,
  RegisterRateSerie,
} from '@domain/types/rateType';

export interface IRateRepository {
  registerRateMovie(input: RegisterRateMovie): Promise<boolean>;
  registerRateSerie(input: RegisterRateSerie): Promise<boolean>;
  getRateSerie(input: SerieInput): Promise<GetRateSerie>;
  getRateMovie(input: MovieInput): Promise<GetRateMovie>;
}
