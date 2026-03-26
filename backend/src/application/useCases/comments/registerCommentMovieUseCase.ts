import { RegisterCommentMovie } from '@domain/types/commentType';
import CommentRepository from '@infrastructure/repositories/commentRepository';

class RegisterCommentMovieUseCase {
  commentRepositoy: CommentRepository;
  constructor(commentRepository: CommentRepository) {
    this.commentRepositoy = commentRepository;
  }
  async execute(input: RegisterCommentMovie): Promise<boolean> {
    return await this.commentRepositoy.registerCommentMovie(input);
  }
}

export default RegisterCommentMovieUseCase;
