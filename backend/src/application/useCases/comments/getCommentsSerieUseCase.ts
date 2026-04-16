import { GetCommentSerie, SerieInput } from '@domain/types/commentType';
import CommentRepository from '@infrastructure/repositories/commentRepository';

class GetCommentsSerieUseCase {
  private readonly commentRepository: CommentRepository;
  constructor(commentRepository: CommentRepository) {
    this.commentRepository = commentRepository;
  }

  async execute(input: SerieInput): Promise<GetCommentSerie[]> {
    return this.commentRepository.getCommentsSerie(input);
  }
}

export default GetCommentsSerieUseCase;
