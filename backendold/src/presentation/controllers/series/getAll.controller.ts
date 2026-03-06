import SeriesGetAllUseCase from "@application/useCases/series/getAll.useCase";
import { controllerInputType, httpResponseType } from "@domain/types/controller.type";
import { SerieSearchOutput } from "@domain/types/serie.type";

class SeriesGetAllController {
  constructor(private readonly seriesGetAllUseCase: SeriesGetAllUseCase) {}

  async run(
    input: controllerInputType<object, object, object, object>
  ): Promise<httpResponseType<SerieSearchOutput[]>> {
    const series = await this.seriesGetAllUseCase.execute();
    return { statusCode: 200, data: series };
  }
}

export default SeriesGetAllController;
