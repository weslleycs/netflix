import { EditComment } from '@domain/types/commentType';
import CommentRepository from '@infrastructure/repositories/commentRepository';

class EditCommentUseCase {
  commentRepository: CommentRepository;

  constructor(commentRepository: CommentRepository) {
    this.commentRepository = commentRepository;
  }

  async execute(data: EditComment): Promise<boolean> {
    return await this.commentRepository.editComment(data);
  }
}

export default EditCommentUseCase;
