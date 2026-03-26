import EditCommentUseCase from '@application/useCases/comments/editCommentUseCase';
import { EditComment, EditCommentBody, EditCommentParams } from '@domain/types/commentType';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';

class EditCommentController {
  editCommentUseCase: EditCommentUseCase;

  constructor(editCommentUseCase: EditCommentUseCase) {
    this.editCommentUseCase = editCommentUseCase;
  }

  async run(
    data: controllerInputType<object, EditCommentParams, object, EditCommentBody>,
  ): Promise<httpResponseType<string>> {
    const input: EditComment = {
      id: Number(data.params.id),
      comment: String(data.body.comment),
    };
    await this.editCommentUseCase.execute(input);
    return {
      statusCode: 200,
      data: 'comentário editado com sucesso',
    };
  }
}

export default EditCommentController;
