import { CreateMovieInput, GetById, MovieSearchInput, MovieSearchOutput, UpdaterMovie } from "@domain/types/movie.type";
import PrismaService from "@infrastructure/services/prisma.service";



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
        title: input.title
      }
    })
    return movies
  }

  async listAll(): Promise<MovieSearchOutput[]> {
  const prisma= this.prismaService.getConnection();
  return await prisma.movie.findMany();
}

async getById(input: GetById): Promise<MovieSearchOutput > {
  const prisma= this.prismaService.getConnection();
  const movie= await prisma.movie.findUnique({
    where: {
        id: Number(input.id)
      }
  });
  if (!movie) {
      throw new Error("Usuário não encontrado");
    }
   return movie
}

async updater(data: UpdaterMovie): Promise<boolean > {
  const prisma= this.prismaService.getConnection();
  const { id, ...updaterData } = data
  await prisma.movie.update({
    data: updaterData,
    where:{
      id: Number(id)
    }
  });

  return true;
}

}

export default MovieRepository;
