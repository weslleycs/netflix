import { CreateGenreInput } from '@domain/types/genreType';
import PrismaService from '@infrastructure/services/prisma.service';

class GenreRepository {
  private readonly prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  async register(input: CreateGenreInput): Promise<boolean> {
    const prisma = this.prismaService.getConnection();
    await prisma.genres.create({
      data: {
        name: input.name,
        description: input.description,
      },
    });
    return true;
  }
}

export default GenreRepository;
