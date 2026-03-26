import { RegisterCommentSerie } from '@domain/types/commentType';
import CommentRepository from '@infrastructure/repositories/commentRepository';

class RegisterCommentSerieUseCase {
  commentRepository: CommentRepository;
  constructor(commentRepository: CommentRepository) {
    this.commentRepository = commentRepository;
  }
  async execute(input: RegisterCommentSerie): Promise<boolean> {
    return await this.commentRepository.registerCommentSerie(input);
  }
}

export default RegisterCommentSerieUseCase;
