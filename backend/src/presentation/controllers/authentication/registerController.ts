import { controllerInputType, httpResponseType } from '@domain/types/controller.type';
import { registerInput } from '@domain/types/authenticationTypes';
import RegisterUserUseCase from '@application/useCases/authentication/registerUseCase';
import { IController } from '@presentation/controllers/ports/IController';

class RegisterUserController
  implements IController<object, object, object, registerInput, string>
{
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
