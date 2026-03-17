import { registerCommentSerie } from '@domain/types/commentType';
import CommentRepository from '@infrastructure/repositories/commentRepository';

class RegisterCommentSerieUseCase {
  commentRepository: CommentRepository;
  constructor(commentRepository: CommentRepository) {
    this.commentRepository = commentRepository;
  }
  async execute(input: registerCommentSerie): Promise<boolean> {
    return await this.commentRepository.register(input);
  }
}

export default RegisterCommentSerieUseCase;
