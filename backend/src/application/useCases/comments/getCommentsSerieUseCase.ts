import { GetCommentSerie, SerieInput } from '@domain/types/commentType';
import { ICommentRepository } from '@application/repositories/ports/ICommentRepository';
import { IUseCase } from '@application/useCases/ports/IUseCase';

class GetCommentsSerieUseCase implements IUseCase<SerieInput, GetCommentSerie[]> {
  private readonly commentRepository: ICommentRepository;

  constructor(commentRepository: ICommentRepository) {
    this.commentRepository = commentRepository;
  }

  async execute(input: SerieInput): Promise<GetCommentSerie[]> {
    return this.commentRepository.getCommentsSerie(input);
  }
}

export default GetCommentsSerieUseCase;
