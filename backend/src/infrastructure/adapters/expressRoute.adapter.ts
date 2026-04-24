import { Request, Response } from 'express';
import { AppError, ErrorCode, ErrorMessage } from '@shared/errors/AppError';

type AnyInput = {
  body: unknown;
  params: unknown;
  query: unknown;
  headers: unknown;
};

type Controller<T = unknown> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  run: (input: any) => Promise<{ statusCode: number; data: T }>;
};

export default async function expressRouteAdapter<T>(
  req: Request,
  res: Response,
  controller: Controller<T>,
) {
  try {
    const input: AnyInput = {
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
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
