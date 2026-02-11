import bcrypt from "bcrypt";
import { loginInput } from "@domain/types/authentication.type";
import AuthenticationRepository from "@infrastructure/repositories/authentication.repository";

class LoginUseCase {
  private readonly authenticationRepository: AuthenticationRepository;

  constructor(authenticationRepository: AuthenticationRepository) {
    this.authenticationRepository = authenticationRepository;
  }

  async execute(input: loginInput): Promise<boolean> {
    
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
