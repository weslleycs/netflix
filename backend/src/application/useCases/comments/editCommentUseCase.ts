import { EditComment } from '@domain/types/commentType';
import { ICommentRepository } from '@application/repositories/ports/ICommentRepository';
import { IUseCase } from '@application/useCases/ports/IUseCase';

class EditCommentUseCase implements IUseCase<EditComment, boolean> {
  private readonly commentRepository: ICommentRepository;

  constructor(commentRepository: ICommentRepository) {
    this.commentRepository = commentRepository;
  }

  async execute(data: EditComment): Promise<boolean> {
    return this.commentRepository.editComment(data);
  }
}

export default EditCommentUseCase;
