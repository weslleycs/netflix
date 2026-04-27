import { Request, Response } from 'express';
import { AppError, ErrorCode, ErrorMessage } from '@shared/errors/AppError';
import { IController } from '@presentation/controllers/ports/IController';

type AnyInput = {
  body: unknown;
  params: unknown;
  query: unknown;
  headers: unknown;
  userId?: number;
};

export default async function expressRouteAdapter<T>(
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  controller: IController<any, any, any, any, T>,
) {
  try {
    const input: AnyInput = {
      body: req.body,
      params: req.validatedParams ?? req.params,
      query: req.validatedQuery ?? req.query,
      headers: req.headers,
      userId: req.userId,
    };

    const response = await controller.run(input);
    return res.status(response.statusCode).json(response.data);
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    console.error(err);
    return res.status(ErrorCode.INTERNAL).json({
      message: ErrorMessage.INTERNAL,
    });
  }
}
