import {
  CreateGenreInput,
  GetAllGenre,
  GetAllMoviesByGenresOutput,
  GetAllSeriesByGenresOutput,
  InputGenreMovie,
} from '@domain/types/genreType';

export interface IGenreRepository {
  register(input: CreateGenreInput): Promise<boolean>;
  registerGenreMovie(input: InputGenreMovie): Promise<boolean>;
  listall(): Promise<GetAllGenre[]>;
  getAllMoviesByGenres(): Promise<GetAllMoviesByGenresOutput[]>;
  getAllSeriesByGenres(): Promise<GetAllSeriesByGenresOutput[]>;
}
