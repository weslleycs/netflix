import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginInput, LoginOutput } from "@domain/types/authentication.type";
import AuthenticationRepository from "@infrastructure/repositories/authentication.repository";



class LoginUseCase {
  private readonly authenticationRepository: AuthenticationRepository;

  constructor(authenticationRepository: AuthenticationRepository) {
    this.authenticationRepository = authenticationRepository;
  }

  async execute(input: loginInput): Promise<LoginOutput> {
  
    const user = await this.authenticationRepository.login(input.email);


    const isCorrectPassword = await bcrypt.compare(input.password, user.password);

    if (!isCorrectPassword) {
      throw new Error("Email or password invalid");
    }

    
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET not configured");
    }

    const token = jwt.sign(
      { email: user.email, role: user.role },
      secret,
      { expiresIn: "1h" }
    );

   
    return { token };
  }
}

export default LoginUseCase;

