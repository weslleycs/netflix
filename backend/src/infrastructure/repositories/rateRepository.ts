import { SerieInput } from '@domain/types/commentType';
import {
  GetRateMovie,
  GetRateSerie,
  MovieInput,
  RegisterRateMovie,
  RegisterRateSerie,
} from '@domain/types/rateType';
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
  async getRateSerie(input: SerieInput): Promise<GetRateSerie> {
    try {
      const prisma = this.prismaService.getConnection();
      const dataRate = await prisma.rates.aggregate({
        where: {
          serieId: Number(input.serieId),
        },
        _avg: {
          rate: true,
        },
      });
      return {
        rate: dataRate._avg.rate ?? 0,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      const message = error instanceof Error ? error.message : ErrorMessage.INTERNAL;
      throw new AppError(ErrorCode.INTERNAL, message);
    }
  }
  async getRateMovie(input: MovieInput): Promise<GetRateMovie> {
    try {
      const prisma = this.prismaService.getConnection();
      const dataRate = await prisma.rates.aggregate({
        where: {
          movieId: Number(input.movieId),
        },
        _avg: {
          rate: true,
        },
      });
      return {
        rate: dataRate._avg.rate ?? 0,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      const message = error instanceof Error ? error.message : ErrorMessage.INTERNAL;
      throw new AppError(ErrorCode.INTERNAL, message);
    }
  }
}

export default RateRepository;
