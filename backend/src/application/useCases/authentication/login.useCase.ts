import bcrypt from "bcrypt";
import { loginInput } from "@domain/types/authentication.type";
import AuthenticationRepository from "@infrastructure/repositories/authentication.repository";

class LoginUseCase {
  private readonly authenticationRepository: AuthenticationRepository;

  constructor(authenticationRepository: AuthenticationRepository) {
    this.authenticationRepository = authenticationRepository;
  }

  async execute(input: loginInput): Promise<boolean> {
    const passwordDataBase = await this.authenticationRepository.login(input.email);
    const isCorrectPassword = await bcrypt.compare(
      input.password,
      passwordDataBase
    );
    return isCorrectPassword
  }
}

export default LoginUseCase;
