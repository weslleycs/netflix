import { RegisterRateMovie, RegisterRateSerie } from '@domain/types/rateType';
import PrismaService from '@infrastructure/services/prisma.service';

class RateRepository {
  prismaService: PrismaService;
  constructor(prismaService: PrismaService) {
    this.prismaService = prismaService;
  }
  async registerRateMovie(input: RegisterRateMovie): Promise<boolean> {
    const prisma = this.prismaService.getConnection();
    await prisma.rates.create({
      data: {
        userId: input.userId,
        movieId: input.movieId,
        rate: input.rate,
      },
    });
    return true;
  }

  async registerRateSerie(input: RegisterRateSerie): Promise<boolean> {
    const prisma = this.prismaService.getConnection();
    await prisma.rates.create({
      data: {
        userId: input.userId,
        serieId: input.serieId,
        rate: input.rate,
      },
    });
    return true;
  }
}

export default RateRepository;
