import LoginUseCase from '@application/useCases/authentication/loginUseCase';
import { LoginInput } from '@domain/types/authenticationTypes';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';

class LoginController {
  private readonly loginUseCase: LoginUseCase;
  constructor(loginUsease: LoginUseCase) {
    this.loginUseCase = loginUsease;
  }
  async run(
    input: controllerInputType<object, object, object, LoginInput>,
  ): Promise<httpResponseType<string>> {
    await this.loginUseCase.execute(input.body);
    return {
      statusCode: 200,
      data: 'Login Success',
    };
  }
}

export default LoginController;
