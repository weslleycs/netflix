import { DeleteCommentInput } from '@domain/types/commentType';
import CommentRepository from '@infrastructure/repositories/commentRepository';

class DeleteCommentUseCase {
  commentRepository: CommentRepository;

  constructor(commentRepository: CommentRepository) {
    this.commentRepository = commentRepository;
  }

  async execute(data: DeleteCommentInput): Promise<boolean> {
    return await this.commentRepository.deleteComment(data);
  }
}

export default DeleteCommentUseCase;
