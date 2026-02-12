import { CreateMovieInput } from "@domain/types/movie.type";
import PrismaService from "@infrastructure/services/prisma.service";



class MovieSearchRepository {
  private readonly prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  async register(input: MovieSearchInput): Promise<boolean> {
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
}

export default MovieSearchRepository;
