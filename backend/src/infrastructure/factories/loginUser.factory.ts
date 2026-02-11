import PrismaService from "@infrastructure/services/prisma.service";
import AuthenticationRepository from "@infrastructure/repositories/authentication.repository";
import RegisterUserUseCase from "@application/useCases/registerUser.useCase";
import RegisterUserController from "@presentation/controllers/registerUser.controller";

export function registertUserFactory(prismaService: PrismaService): RegisterUserController {
  const loginRepository = new AuthenticationRepository(prismaService);
  const loginUserUseCase = new RegisterUserUseCase(loginRepository);
  const controller = new RegisterUserController(loginUserUseCase);

  return controller;
}
