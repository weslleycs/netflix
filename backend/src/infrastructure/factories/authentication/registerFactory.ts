import RegisterUserUseCase from "@application/useCases/authentication/registerUseCase";
import AuthenticationRepository from "@infrastructure/repositories/authenticationRepository";
import PrismaService from "@infrastructure/services/prisma.service";
import RegisterUserController from "@presentation/controllers/authentication/registerController";

export function registerUserFactory(prismaService: PrismaService): RegisterUserController {
  const registerRepository = new AuthenticationRepository(prismaService);
  const registerUserUseCase = new RegisterUserUseCase(registerRepository);
  const controller = new RegisterUserController(registerUserUseCase);

  return controller;
}