import { controllerInputType, httpResponseType } from "@domain/types/controller.type";
import RegisterUserUseCase from "@application/useCases/registerUser.useCase";
import { registerInput } from "@domain/types/authentication.type";


class RegisterUserController {
  private readonly registerUserUseCase: RegisterUserUseCase;

  constructor(registerUserUseCase: RegisterUserUseCase) {
    this.registerUserUseCase = registerUserUseCase;
  }

  async run(input: controllerInputType<object, object, object, registerInput>): Promise<httpResponseType<string>> {
    await this.registerUserUseCase.execute(input.body);

    return {
      statusCode: 200,
      data: "User Register",
    };
  }
}

export default RegisterUserController;