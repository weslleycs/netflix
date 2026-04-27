import { CommentMovieInput, CommentMovieOutput } from '@domain/types/movieType';
import { IMovieRepository } from '@application/repositories/ports/IMovieRepository';
import { IUseCase } from '@application/useCases/ports/IUseCase';

class CommentMovieUseCase implements IUseCase<CommentMovieInput, CommentMovieOutput[]> {
  private readonly movieRepository: IMovieRepository;

  constructor(movieRepository: IMovieRepository) {
    this.movieRepository = movieRepository;
  }

  async execute(input: CommentMovieInput): Promise<CommentMovieOutput[]> {
    return this.movieRepository.commentMovie(input);
  }
}

export default CommentMovieUseCase;
