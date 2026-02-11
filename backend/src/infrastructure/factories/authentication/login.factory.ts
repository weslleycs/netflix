import PrismaService from "@infrastructure/services/prisma.service";
import AuthenticationRepository from "@infrastructure/repositories/authentication.repository";
import LoginUseCase from "@application/useCases/authentication/login.useCase";
import LoginController from "@presentation/controllers/authentication/login.controller";

export function loginFactory(prismaService: PrismaService): LoginController {
  const loginRepository = new AuthenticationRepository(prismaService);
  const loginUseCase = new LoginUseCase(loginRepository);
  const controller = new LoginController(loginUseCase);

  return controller;
}
