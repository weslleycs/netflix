import { registerInput, User } from '@domain/types/authenticationTypes';

export interface IAuthenticationRepository {
  findByEmail(email: string): Promise<User | null>;
  create(input: registerInput): Promise<boolean>;
}
