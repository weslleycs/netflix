import { registerInput, User } from '@domain/types/authenticationTypes';
import PrismaService from '@infrastructure/services/prisma.service';
import { AppError, ErrorCode, ErrorMessage } from '@shared/errors/AppError';

class AuthenticationRepository {
  private readonly prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this.prismaService = prismaService;
  }
  async findByEmail(email: string): Promise<User | null> {
    try {
      const prisma = this.prismaService.getConnection();
      const user = await prisma.users.findUnique({
        where: {
          email: email,
        },
        select: {
          id: true,
          name: true,
          password: true,
          email: true,
          active: true,
        },
      });

      return user;
    } catch (error) {
      if (error instanceof AppError) throw error;
      const message = error instanceof Error ? error.message : ErrorMessage.INTERNAL;
      throw new AppError(ErrorCode.INTERNAL, message);
    }
  }

  async create(input: registerInput): Promise<boolean> {
    try {
      const prisma = this.prismaService.getConnection();
      await prisma.users.create({
        data: {
          name: input.name,
          email: input.email,
          password: input.password,
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

export default AuthenticationRepository;
