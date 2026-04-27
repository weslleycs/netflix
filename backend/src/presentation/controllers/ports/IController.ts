import { controllerInputType, httpResponseType } from '@domain/types/controller.type';

export interface IController<
  H = object,
  P = object,
  Q = object,
  B = object,
  R = unknown,
> {
  run(input: controllerInputType<H, P, Q, B>): Promise<httpResponseType<R>>;
}
