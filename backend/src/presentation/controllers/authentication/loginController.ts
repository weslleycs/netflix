import LoginUseCase from '@application/useCases/authentication/loginUseCase';
import { LoginInput, LoginOutput } from '@domain/types/authenticationTypes';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';
import { IController } from '@presentation/controllers/ports/IController';

class LoginController
  implements IController<object, object, object, LoginInput, LoginOutput>
{
  private readonly loginUseCase: LoginUseCase;
  constructor(loginUsease: LoginUseCase) {
    this.loginUseCase = loginUsease;
  }
  async run(
    input: controllerInputType<object, object, object, LoginInput>,
  ): Promise<httpResponseType<LoginOutput>> {
    const data = await this.loginUseCase.execute(input.body);
    return {
      statusCode: 200,
      data,
    };
  }
}

export default LoginController;
