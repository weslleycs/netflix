import { registerInput } from '@domain/types/authenticationTypes';
import AuthenticationRepository from '@infrastructure/repositories/authenticationRepository';
import bcrypt from 'bcrypt';

class RegisterUserUseCase {
  private readonly authenticationRepository: AuthenticationRepository;

  constructor(authenticationRepository: AuthenticationRepository) {
    this.authenticationRepository = authenticationRepository;
  }

  async execute(input: registerInput): Promise<boolean> {
    const userExists = await this.authenticationRepository.findByEmail(input.email);

    if (userExists) {
      throw new Error('Usuário já existe');
    }
    const passwordHash = await bcrypt.hash(input.password, 10);

    return await this.authenticationRepository.create({
      name: input.name,
      email: input.email,
      password: passwordHash,
    });
  }
}

export default RegisterUserUseCase;
