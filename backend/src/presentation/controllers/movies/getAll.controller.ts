import MoviesGetAllUseCase from "@application/useCases/movie/getAll.useCase";
import { controllerInputType, httpResponseType } from "@domain/types/controller.type";
import { MovieSearchOutput } from "@domain/types/movie.type";
import { GenreMovie } from "@prisma/client";

class MoviesGetAllController {
  constructor(private readonly moviesGetAllUseCase: MoviesGetAllUseCase) {}

  async run(
    input: controllerInputType<object, object, { genre?: string }, object>
  ): Promise<httpResponseType<MovieSearchOutput[]>> {

    const genreRaw = input.query?.genre;

    let genre: GenreMovie | undefined;

    if (genreRaw) {
      const upper = genreRaw.toUpperCase();

      if (!(upper in GenreMovie)) {
        return {
          statusCode: 400,
          data: [] as MovieSearchOutput[],
        };
      }

      genre = GenreMovie[upper as keyof typeof GenreMovie];
    }

    const movies = await this.moviesGetAllUseCase.execute({ genre });

    return { statusCode: 200, data: movies };
  }
}

export default MoviesGetAllController;
