import {
  DeleteCommentInput,
  EditComment,
  GetCommentSerie,
  RegisterCommentMovie,
  RegisterCommentSerie,
  SerieInput,
} from '@domain/types/commentType';

export interface ICommentRepository {
  registerCommentSerie(input: RegisterCommentSerie): Promise<boolean>;
  registerCommentMovie(input: RegisterCommentMovie): Promise<boolean>;
  deleteComment(data: DeleteCommentInput): Promise<boolean>;
  editComment(data: EditComment): Promise<boolean>;
  getCommentsSerie(input: SerieInput): Promise<GetCommentSerie[]>;
}
