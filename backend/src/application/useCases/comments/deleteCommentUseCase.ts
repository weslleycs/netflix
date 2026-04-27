import { DeleteCommentInput } from '@domain/types/commentType';
import { ICommentRepository } from '@application/repositories/ports/ICommentRepository';
import { IUseCase } from '@application/useCases/ports/IUseCase';

class DeleteCommentUseCase implements IUseCase<DeleteCommentInput, boolean> {
  private readonly commentRepository: ICommentRepository;

  constructor(commentRepository: ICommentRepository) {
    this.commentRepository = commentRepository;
  }

  async execute(data: DeleteCommentInput): Promise<boolean> {
    return this.commentRepository.deleteComment(data);
  }
}

export default DeleteCommentUseCase;
