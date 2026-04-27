import { registerInput } from '@domain/types/authenticationTypes';
import { IAuthenticationRepository } from '@application/repositories/ports/IAuthenticationRepository';
import { IUseCase } from '@application/useCases/ports/IUseCase';
import { AppError, ErrorCode } from '@shared/errors/AppError';
import bcrypt from 'bcrypt';

class RegisterUserUseCase implements IUseCase<registerInput, boolean> {
  private readonly authenticationRepository: IAuthenticationRepository;

  constructor(authenticationRepository: IAuthenticationRepository) {
    this.authenticationRepository = authenticationRepository;
  }

  async execute(input: registerInput): Promise<boolean> {
    const userExists = await this.authenticationRepository.findByEmail(input.email);
    if (userExists) {
      throw new AppError(ErrorCode.CONFLICT, 'Email already in use');
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
