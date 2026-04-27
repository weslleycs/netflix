import UpdaterMovieUseCase from '@application/useCases/movies/updaterMovieUseCase';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';
import { GetById, UpdaterMovieBody } from '@domain/types/movieType';
import { IController } from '@presentation/controllers/ports/IController';

class UpdaterMovieController
  implements IController<object, GetById, object, UpdaterMovieBody, string>
{
  private readonly updaterUseCase: UpdaterMovieUseCase;

  constructor(updaterUseCase: UpdaterMovieUseCase) {
    this.updaterUseCase = updaterUseCase;
  }

  async run(
    input: controllerInputType<object, GetById, object, UpdaterMovieBody>,
  ): Promise<httpResponseType<string>> {
    const inputData = {
      id: input.params.id,
      title: input.body.title,
      description: input.body.description,
      imageUrl: input.body.imageUrl,
    };
    await this.updaterUseCase.execute(inputData);
    return {
      statusCode: 200,
      data: 'Updater Ok',
    };
  }
}

export default UpdaterMovieController;
