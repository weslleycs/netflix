import CommentMovieUseCase from '@application/useCases/movies/commentMovieUseCase';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';
import { CommentMovieInput, CommentMovieOutput } from '@domain/types/movieType';

class CommentMovieController {
  commentMovieUseCase: CommentMovieUseCase;
  constructor(commentMovieUseCase: CommentMovieUseCase) {
    this.commentMovieUseCase = commentMovieUseCase;
  }
  async run(
    input: controllerInputType<object, object, CommentMovieInput, object>,
  ): Promise<httpResponseType<CommentMovieOutput[]>> {
    const data = await this.commentMovieUseCase.execute(input.query);
    return {
      statusCode: 200,
      data: data,
    };
  }
}

export default CommentMovieController;
