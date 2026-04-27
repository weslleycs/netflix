import { registerInput, User } from '@domain/types/authenticationTypes';
import { IAuthenticationRepository } from '@application/repositories/ports/IAuthenticationRepository';
import { IPrismaService } from '@infrastructure/services/ports/IPrismaService';
import { AppError, ErrorCode, ErrorMessage } from '@shared/errors/AppError';

class AuthenticationRepository implements IAuthenticationRepository {
  private readonly prismaService: IPrismaService;

  constructor(prismaService: IPrismaService) {
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
