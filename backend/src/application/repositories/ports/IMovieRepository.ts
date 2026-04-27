import {
  CommentMovieInput,
  CommentMovieOutput,
  CreateMovieInput,
  GetCommentsAndRateMovieById,
  GetCommentsAndRateMovieByIdOutput,
  MovieDetails,
  MovieListAllInput,
  Movies,
  UpdaterMovie,
} from '@domain/types/movieType';

export interface IMovieRepository {
  register(input: CreateMovieInput): Promise<boolean>;
  listAll(input: MovieListAllInput): Promise<Movies[]>;
  GetCommentsAndRate(
    input: GetCommentsAndRateMovieById,
  ): Promise<GetCommentsAndRateMovieByIdOutput>;
  updater(data: UpdaterMovie): Promise<boolean>;
  commentMovie(input: CommentMovieInput): Promise<CommentMovieOutput[]>;
  movieDetailsById(movieId: number): Promise<MovieDetails>;
}
