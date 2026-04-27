import DeleteCommentUseCase from '@application/useCases/comments/deleteCommentUseCase';
import { DeleteCommentInput, DeleteCommentParams } from '@domain/types/commentType';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';
import { IController } from '@presentation/controllers/ports/IController';
import { AppError, ErrorCode } from '@shared/errors/AppError';

class DeleteCommentController
  implements IController<object, DeleteCommentParams, object, object, string>
{
  deleteCommentUseCase: DeleteCommentUseCase;

  constructor(deleteCommentUseCase: DeleteCommentUseCase) {
    this.deleteCommentUseCase = deleteCommentUseCase;
  }

  async run(
    data: controllerInputType<object, DeleteCommentParams, object, object>,
  ): Promise<httpResponseType<string>> {
    if (data.userId === undefined) {
      throw new AppError(ErrorCode.UNAUTHORIZED, 'Unauthorized');
    }

    const input: DeleteCommentInput = {
      commentId: Number(data.params.id),
      userId: data.userId,
    };

    await this.deleteCommentUseCase.execute(input);

    return {
      statusCode: 200,
      data: 'Comment deleted successfully',
    };
  }
}

export default DeleteCommentController;
