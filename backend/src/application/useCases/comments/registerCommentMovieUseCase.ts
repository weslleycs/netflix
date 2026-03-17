import { registerCommentMovie } from '@domain/types/commentType';
import CommentRepository from '@infrastructure/repositories/commentRepository';

class RegisterCommentMovieUseCase {
  commentRepositoy: CommentRepository;
  constructor(commentRepository: CommentRepository) {
    this.commentRepositoy = commentRepository;
  }
  async execute(input: registerCommentMovie): Promise<boolean> {
    return await this.commentRepositoy.registerMovie(input);
  }
}

export default RegisterCommentMovieUseCase;
