import bcrypt from "bcrypt";
import { registerInput } from "@domain/types/authentication.type";
import AuthenticationRepository from "@infrastructure/repositories/authentication.repository";

class RegisterUserUseCase {
  private readonly authenticationRepository: AuthenticationRepository;

  constructor(authenticationRepository: AuthenticationRepository) {
    this.authenticationRepository = authenticationRepository;
  }

  async execute(input: registerInput): Promise<boolean> {
    
    const saltRounds = 10;
    const cryptPassword = await bcrypt.hash(
      input.password,
      saltRounds
    );
    const newUser = {
      ...input,
      password: cryptPassword,
    };
    return this.authenticationRepository.register(newUser);
  }
}

export default RegisterUserUseCase;
