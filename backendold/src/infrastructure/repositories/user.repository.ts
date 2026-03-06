import PrismaService from "@infrastructure/services/prisma.service";
import { UserType } from "@domain/types/user.type";

class UserRepository {
  private readonly prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  async findAll(): Promise<UserType[]> {
    const prisma = this.prismaService.getConnection();
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}

export default UserRepository;
