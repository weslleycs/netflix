import { registerInput } from "@domain/types/authenticationTypes";
import AuthenticationRepository from "@infrastructure/repositories/authenticationRepository";

class RegisterUserUseCase {
  private readonly authenticationRepository: AuthenticationRepository;

  constructor(authenticationRepository: AuthenticationRepository) {
    this.authenticationRepository = authenticationRepository;
  }

  async execute(input: registerInput): Promise<boolean> {
    return await this.authenticationRepository.register(input);
  }
}

export default RegisterUserUseCase;
