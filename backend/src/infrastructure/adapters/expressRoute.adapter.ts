import { Request, Response } from 'express';
import { AppError, ErrorCode, ErrorMessage } from '@shared/errors/AppError'; // ajuste o path

export default async function expressRouteAdapter(req: Request, res: Response, controller: any) {
  try {
    const input = {
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
    };

    const response = await controller.run(input);

    return res.status(response.statusCode).json(response.data);
  } catch (err: any) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    console.error(err);
    return res.status(ErrorCode.INTERNAL).json({
      message: ErrorMessage.INTERNAL,
    });
  }
}
