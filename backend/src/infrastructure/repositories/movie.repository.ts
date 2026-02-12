import { CreateMovieInput, MovieSearchInput, MovieSearchOutput } from "@domain/types/movie.type";
import PrismaService from "@infrastructure/services/prisma.service";



class MovieRepository {
  private readonly prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  async register(input: CreateMovieInput): Promise<boolean> {
    const prisma = this.prismaService.getConnection();
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
    const prisma = this.prismaService.getConnection();
    const movies= await prisma.movie.findMany({
      where: {
        title: input.title
      }
    })
    return movies
  }

  async listAll(): Promise<MovieSearchOutput[]> {
  const prisma = this.prismaService.getConnection();
  return prisma.movie.findMany();
}

}

export default MovieRepository;
