import UpdaterUseCase from "@application/useCases/movie/updater.useCase";
import { controllerInputType, httpResponseType } from "@domain/types/controller.type";
import {  GetById, UpdaterMovieBody } from "@domain/types/movie.type";



class UpdaterController {
  private readonly updaterUseCase: UpdaterUseCase;

  constructor(updaterUseCase: UpdaterUseCase) {
    this.updaterUseCase = updaterUseCase;
  }

  async run(input: controllerInputType<object, GetById, object, UpdaterMovieBody>): Promise<httpResponseType<string>> {
    const inputData= {
      id: input.params.id,
      title: input.body.title,
      description: input.body.description,
      imageUrl: input.body.imageUrl,
      genre: input.body.genre
    }
    await this.updaterUseCase.execute(inputData);
    return {
      statusCode: 200,
      data: "Updater Ok",
    };
  }
}

export default UpdaterController;