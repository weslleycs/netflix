import PrismaService from "@infrastructure/services/prisma.service";
import UserRepository from "@infrastructure/repositories/user.repository";
import GetUserUseCase from "@application/useCases/getUser.useCase";
import GetUserController from "@presentation/controllers/getUser.controller";

export function getUserFactory(): GetUserController {
  const prismaService = new PrismaService();
  const userRepository = new UserRepository(prismaService.getConnection());
  const getUserUseCase = new GetUserUseCase(userRepository);
  const controller = new GetUserController(getUserUseCase);

  return controller;
}
