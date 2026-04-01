import { CommentMovieInput, CommentMovieOutput } from '@domain/types/movieType';
import MovieRepository from '@infrastructure/repositories/movieRepository';

class CommentMovieUseCase {
  movieRepository: MovieRepository;
  constructor(movieRepository: MovieRepository) {
    this.movieRepository = movieRepository;
  }
  async execute(input: CommentMovieInput): Promise<CommentMovieOutput[]> {
    return this.movieRepository.commentMovie(input);
  }
}

export default CommentMovieUseCase;
