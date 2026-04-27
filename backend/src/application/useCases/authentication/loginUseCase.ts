import { LoginInput, LoginOutput } from '@domain/types/authenticationTypes';
import { IAuthenticationRepository } from '@application/repositories/ports/IAuthenticationRepository';
import { IUseCase } from '@application/useCases/ports/IUseCase';
import { AppError, ErrorCode } from '@shared/errors/AppError';
import { signToken } from '@shared/auth/jwt';
import bcrypt from 'bcrypt';

class LoginUseCase implements IUseCase<LoginInput, LoginOutput> {
  private readonly authenticationRepository: IAuthenticationRepository;

  constructor(authenticationRepository: IAuthenticationRepository) {
    this.authenticationRepository = authenticationRepository;
  }

  async execute(input: LoginInput): Promise<LoginOutput> {
    const user = await this.authenticationRepository.findByEmail(input.email);
    if (!user) {
      throw new AppError(ErrorCode.UNAUTHORIZED, 'Invalid email or password');
    }
    const passwordMatch = await bcrypt.compare(input.password, user.password);
    if (!passwordMatch) {
      throw new AppError(ErrorCode.UNAUTHORIZED, 'Invalid email or password');
    }
    const token = signToken({ sub: user.id, email: user.email });
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    };
  }
}

export default LoginUseCase;
