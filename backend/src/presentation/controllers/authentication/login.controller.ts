import { controllerInputType, httpResponseType } from "@domain/types/controller.type";
import { loginInput, LoginOutput } from "@domain/types/authentication.type";
import LoginUseCase from "@application/useCases/authentication/login.useCase";


class LoginController {
  private readonly loginUseCase: LoginUseCase;

  constructor(loginUseCase: LoginUseCase) {
    this.loginUseCase = loginUseCase;
  }

  async run(
    input: controllerInputType<object, object, object, loginInput>
  ): Promise<httpResponseType<LoginOutput>> {
    const result = await this.loginUseCase.execute(input.body);
    return {
      statusCode: 200,
      data: result, 
    };
  }
}

export default LoginController;
