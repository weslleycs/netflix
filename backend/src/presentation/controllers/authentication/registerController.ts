import { controllerInputType, httpResponseType } from '@domain/types/controller.type';
import { registerInput } from '@domain/types/authenticationTypes';
import RegisterUserUseCase from '@application/useCases/authentication/registerUseCase';

class RegisterUserController {
  private readonly registerUserUseCase: RegisterUserUseCase;

  constructor(registerUserUseCase: RegisterUserUseCase) {
    this.registerUserUseCase = registerUserUseCase;
  }

  async run(
    input: controllerInputType<object, object, object, registerInput>,
  ): Promise<httpResponseType<string>> {
    await this.registerUserUseCase.execute(input.body);

    return {
      statusCode: 201,
      data: 'User registered successfully',
    };
  }
}

export default RegisterUserController;
