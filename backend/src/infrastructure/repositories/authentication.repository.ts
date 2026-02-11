import PrismaService from "@infrastructure/services/prisma.service";
import { loginInput, registerInput } from "@domain/types/authentication.type";
import { UserType } from "@domain/types/user.type";


class AuthenticationRepository {
  private readonly prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  async register(input: registerInput): Promise<boolean> {
    const prisma = this.prismaService.getConnection();
    await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        password: input.password,
      }
    })
    return true
  }

  async login(input: loginInput): Promise<{ email: string}> {
    const prisma = this.prismaService.getConnection();
    const user = await prisma.user.findUnique({
      where: { email: input.email },
    });
    if (!user) {
     throw new Error("Usuário não encontrado");
    }
    return  {
      email: user.email,
    }; 
  }
}

export default AuthenticationRepository;
