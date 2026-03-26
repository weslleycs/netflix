import { RegisterRateMovie, RegisterRateSerie } from '@domain/types/rateType';
import PrismaService from '@infrastructure/services/prisma.service';
import { AppError, ErrorCode, ErrorMessage } from '@shared/errors/AppError';

class RateRepository {
  prismaService: PrismaService;
  constructor(prismaService: PrismaService) {
    this.prismaService = prismaService;
  }
  async registerRateMovie(input: RegisterRateMovie): Promise<boolean> {
    try {
      const prisma = this.prismaService.getConnection();
      await prisma.rates.create({
        data: {
          userId: input.userId,
          movieId: input.movieId,
          rate: input.rate,
        },
      });
      return true;
    } catch (error) {
      if (error instanceof AppError) throw error;
      const message = error instanceof Error ? error.message : ErrorMessage.INTERNAL;
      throw new AppError(ErrorCode.INTERNAL, message);
    }
  }

  async registerRateSerie(input: RegisterRateSerie): Promise<boolean> {
    try {
      const prisma = this.prismaService.getConnection();
      await prisma.rates.create({
        data: {
          userId: input.userId,
          serieId: input.serieId,
          rate: input.rate,
        },
      });
      return true;
    } catch (error) {
      if (error instanceof AppError) throw error;
      const message = error instanceof Error ? error.message : ErrorMessage.INTERNAL;
      throw new AppError(ErrorCode.INTERNAL, message);
    }
  }
}

export default RateRepository;
