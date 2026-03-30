import { LoginInput, LoginOutput } from '@domain/types/authenticationTypes';
import AuthenticationRepository from '@infrastructure/repositories/authenticationRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class LoginUseCase {
  private readonly authenticationRepository: AuthenticationRepository;
  constructor(authenticationRepository: AuthenticationRepository) {
    this.authenticationRepository = authenticationRepository;
  }
  async execute(input: LoginInput): Promise<LoginOutput> {
    const user = await this.authenticationRepository.findByEmail(input.email);
    if (!user) {
      throw new Error('Email or password not found');
    }
    const passwordMatch = await bcrypt.compare(input.password, user.password);
    if (!passwordMatch) {
      throw new Error('Email or password not found');
    }
    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET || 'secret',
      {
        expiresIn: '1m',
      },
    );
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    };
  }
}

export default LoginUseCase;
