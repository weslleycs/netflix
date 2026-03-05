import { controllerInputType, httpResponseType } from "@domain/types/controller.type";
import { UserType } from "@domain/types/user.type";
import GetUserUseCase from "@application/useCases/getUser.useCase";

class GetUserController {
  private readonly getUserUseCase: GetUserUseCase;

  constructor(getUserUseCase: GetUserUseCase) {
    this.getUserUseCase = getUserUseCase;
  }

  async run(input: controllerInputType): Promise<httpResponseType<UserType[]>> {
    const users = await this.getUserUseCase.execute();

    return {
      statusCode: 200,
      data: users,
    };
  }
}

export default GetUserController;