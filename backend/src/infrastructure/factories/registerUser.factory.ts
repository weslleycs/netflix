import PrismaService from "@infrastructure/services/prisma.service";
import AuthenticationRepository from "@infrastructure/repositories/authentication.repository";
import RegisterUserUseCase from "@application/useCases/registerUser.useCase";
import RegisterUserController from "@presentation/controllers/registerUser.controller";

export function registertUserFactory(prismaService: PrismaService): RegisterUserController {
  const registerRepository = new AuthenticationRepository(prismaService);
  const registerUserUseCase = new RegisterUserUseCase(registerRepository);
  const controller = new RegisterUserController(registerUserUseCase);

  return controller;
}
