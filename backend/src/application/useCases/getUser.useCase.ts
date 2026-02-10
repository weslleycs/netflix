import { UserType } from "@domain/types/user.type";
import UserRepository from "@infrastructure/repositories/user.repository";

class GetUserUseCase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(): Promise<UserType[]> {

    return this.userRepository.findAll();
  }
}

export default GetUserUseCase;
