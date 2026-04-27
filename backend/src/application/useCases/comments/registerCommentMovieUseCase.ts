import { RegisterCommentMovie } from '@domain/types/commentType';
import { ICommentRepository } from '@application/repositories/ports/ICommentRepository';
import { IUseCase } from '@application/useCases/ports/IUseCase';

class RegisterCommentMovieUseCase implements IUseCase<RegisterCommentMovie, boolean> {
  private readonly commentRepository: ICommentRepository;

  constructor(commentRepository: ICommentRepository) {
    this.commentRepository = commentRepository;
  }

  async execute(input: RegisterCommentMovie): Promise<boolean> {
    return this.commentRepository.registerCommentMovie(input);
  }
}

export default RegisterCommentMovieUseCase;
