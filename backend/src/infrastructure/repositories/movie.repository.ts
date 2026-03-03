import { CreateMovieInput, GetById, MovieSearchInput, MovieSearchOutput, MoviesListQuery, UpdaterMovie } from "@domain/types/movie.type";
import PrismaService from "@infrastructure/services/prisma.service";
import { AppError, ErrorCode, ErrorMessage } from "@shared/errors/AppError";


class MovieRepository {
  private readonly prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  async register(input: CreateMovieInput): Promise<boolean> {
    const prisma= this.prismaService.getConnection();
    await prisma.movie.create({
      data: {
            title: input.title,
            description: input.description,
            imageUrl: input.imageUrl,
            genre:input.genre
      }
    })
    return true
  }

  async serchByTitle(input: MovieSearchInput): Promise<MovieSearchOutput[]> {
    const prisma= this.prismaService.getConnection();
    const movies= await prisma.movie.findMany({
      where: {
        title: {
          contains: input.title,
        }
      }
    })
    return movies
  }

  async serchByGenre(input: MovieSearchInput): Promise<MovieSearchOutput[]> {
    const prisma= this.prismaService.getConnection();
    const movies= await prisma.movie.findMany({
      where: {
        genre: input.genre
      }
    })
    return movies
  }

  async listAll(): Promise<MovieSearchOutput[]> {
    const prisma = this.prismaService.getConnection();
    return prisma.movie.findMany();
  }     

async getById(input: GetById): Promise<MovieSearchOutput> {
  try {
    const prisma = this.prismaService.getConnection();
    const movie = await prisma.movie.findUnique({
      where: {
        id: Number(input.id),
      },
    });

    if (!movie) {
      throw new AppError(ErrorCode.NOT_FOUND, ErrorMessage.NOT_FOUND);
    }

    return movie;
  } catch (error) {
    if (error instanceof AppError) throw error;
    const message = error instanceof Error ? error.message : ErrorMessage.INTERNAL;
    throw new AppError(ErrorCode.INTERNAL, message);
  }
}

async updater(data: UpdaterMovie): Promise<boolean > {
  const prisma= this.prismaService.getConnection();
  const { id, ...updaterData } = data
  await prisma.movie.update({
    data: {
      ...updaterData,
      updatedAt: new Date()
    },
    where:{
      id: Number(id)
    }
  });

  return true;
}

}

export default MovieRepository;
