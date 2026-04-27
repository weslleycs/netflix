import { RegisterCommentSerie } from '@domain/types/commentType';
import { ICommentRepository } from '@application/repositories/ports/ICommentRepository';
import { IUseCase } from '@application/useCases/ports/IUseCase';

class RegisterCommentSerieUseCase implements IUseCase<RegisterCommentSerie, boolean> {
  private readonly commentRepository: ICommentRepository;

  constructor(commentRepository: ICommentRepository) {
    this.commentRepository = commentRepository;
  }

  async execute(input: RegisterCommentSerie): Promise<boolean> {
    return this.commentRepository.registerCommentSerie(input);
  }
}

export default RegisterCommentSerieUseCase;
