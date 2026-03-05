import { registerInput } from "@domain/types/authenticationTypes";
import PrismaService from "@infrastructure/services/prisma.service";
import { AppError, ErrorCode } from "@shared/errors/AppError";



class AuthenticationRepository {
  private readonly prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  async register(input: registerInput): Promise<boolean> {
  const prisma = this.prismaService.getConnection();

  const existing = await prisma.users.findUnique({
    where: { email: input.email },
    select: { id: true },
  });
  console.log("existing: ",existing)

  if (existing) {
    throw new AppError(ErrorCode.CONFLICT, "Email already in use");
  }

  await prisma.users.create({
    data: {
      name: input.name,
      email: input.email,
      password: input.password,
    },
  });

  return true;
}

  // async login(email: string): Promise<LoginUserData> {
  //   const prisma = this.prismaService.getConnection();

  //   const user = await prisma.user.findUnique({
  //     where: { email },
  //   });


  //   if (!user) {
  //     throw new Error("Email or password invalid");
  //   }

  //   return {
  //     id: user.id,
  //     email: user.email,
  //     password: user.password,
  //     role: user.role,
  //   };
  // }
}

export default AuthenticationRepository;

