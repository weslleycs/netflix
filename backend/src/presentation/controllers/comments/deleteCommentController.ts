import DeleteCommentUseCase from '@application/useCases/comments/deleteCommentUseCase';
import {
  DeleteCommentBody,
  DeleteCommentInput,
  DeleteCommentParams,
} from '@domain/types/commentType';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';

class DeleteCommentController {
  deleteCommentUseCase: DeleteCommentUseCase;

  constructor(deleteCommentUseCase: DeleteCommentUseCase) {
    this.deleteCommentUseCase = deleteCommentUseCase;
  }

  async run(
    data: controllerInputType<object, DeleteCommentParams, object, DeleteCommentBody>,
  ): Promise<httpResponseType<string>> {
    const input: DeleteCommentInput = {
      commentId: Number(data.params.id),
      userId: Number(data.body.userId),
    };

    await this.deleteCommentUseCase.execute(input);

    return {
      statusCode: 200,
      data: 'comentário deletado com sucesso',
    };
  }
}

export default DeleteCommentController;
