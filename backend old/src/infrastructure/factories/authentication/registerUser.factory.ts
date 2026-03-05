import PrismaService from "@infrastructure/services/prisma.service";
import AuthenticationRepository from "@infrastructure/repositories/authentication.repository";
import RegisterUserUseCase from "@application/useCases/authentication/registerUser.useCase";
import RegisterUserController from "@presentation/controllers/authentication/registerUser.controller";

export function registerUserFactory(prismaService: PrismaService): RegisterUserController {
  const registerRepository = new AuthenticationRepository(prismaService);
  const registerUserUseCase = new RegisterUserUseCase(registerRepository);
  const controller = new RegisterUserController(registerUserUseCase);

  return controller;
}
