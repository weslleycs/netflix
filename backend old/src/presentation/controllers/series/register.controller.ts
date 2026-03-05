
import RegisterSerieUseCase from "@application/useCases/series/register.useCase";
import { controllerInputType, httpResponseType } from "@domain/types/controller.type";
import { CreateSerieInput } from "@domain/types/serie.type";



class SerieController {
  private readonly serieUseCase: RegisterSerieUseCase;

  constructor(serieUseCase: RegisterSerieUseCase) {
    this.serieUseCase = serieUseCase;
  }

  async run(input: controllerInputType<object, object, object, CreateSerieInput>): Promise<httpResponseType<string>> {
    await this.serieUseCase.execute(input.body);

    return {
      statusCode: 200,
      data: " Serie Register",
    };
  }
}

export default SerieController;