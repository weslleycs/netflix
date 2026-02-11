import { controllerInputType, httpResponseType } from "@domain/types/controller.type";
import { loginInput } from "@domain/types/authentication.type";
import LoginUseCase from "@application/useCases/authentication/login.useCase";


class LoginController {
  private readonly loginUseCase: LoginUseCase;

  constructor(loginUseCase: LoginUseCase) {
    this.loginUseCase = loginUseCase;
  }

  async run(input: controllerInputType<object, object, object, loginInput>): Promise<httpResponseType<string>> {
    const isCorrectPassword = await this.loginUseCase.execute(input.body);
    if(isCorrectPassword){
      return {
        statusCode: 200,
        data: "Logado",
      };
    }else{
      return {
        statusCode: 400,
        data: "Deu errado",
      };
    }
  }
}

export default LoginController;