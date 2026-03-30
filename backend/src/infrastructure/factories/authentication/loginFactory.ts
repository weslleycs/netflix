import LoginUseCase from '@application/useCases/authentication/loginUseCase';
import AuthenticationRepository from '@infrastructure/repositories/authenticationRepository';
import PrismaService from '@infrastructure/services/prisma.service';
import LoginController from '@presentation/controllers/authentication/loginController';

export function loginFactory(prismaService: PrismaService): LoginController {
  const authenticationRepository = new AuthenticationRepository(prismaService);
  const loginUseCAse = new LoginUseCase(authenticationRepository);
  const controller = new LoginController(loginUseCAse);
  return controller;
}
