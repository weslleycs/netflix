import EditCommentUseCase from '@application/useCases/comments/editCommentUseCase';
import { EditComment, EditCommentBody, EditCommentParams } from '@domain/types/commentType';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';
import { IController } from '@presentation/controllers/ports/IController';
import { AppError, ErrorCode } from '@shared/errors/AppError';

class EditCommentController
  implements IController<object, EditCommentParams, object, EditCommentBody, string>
{
  editCommentUseCase: EditCommentUseCase;

  constructor(editCommentUseCase: EditCommentUseCase) {
    this.editCommentUseCase = editCommentUseCase;
  }

  async run(
    data: controllerInputType<object, EditCommentParams, object, EditCommentBody>,
  ): Promise<httpResponseType<string>> {
    if (data.userId === undefined) {
      throw new AppError(ErrorCode.UNAUTHORIZED, 'Unauthorized');
    }

    const input: EditComment = {
      id: Number(data.params.id),
      userId: data.userId,
      comment: String(data.body.comment),
    };
    await this.editCommentUseCase.execute(input);
    return {
      statusCode: 200,
      data: 'Comment updated successfully',
    };
  }
}

export default EditCommentController;
