import { Request, Response } from "express";
import { controllerInputType } from "@domain/types/controller.type";

interface IController {
  run(input: controllerInputType): Promise<{ statusCode: number; data: unknown }>;
}

const expressRouteAdapter = async (
  req: Request,
  res: Response,
  controller: IController,
): Promise<Response> => {
  const input: controllerInputType = {
    headers: req.headers,
    params: req.params,
    query: req.query,
    body: req.body,
  };

  const { statusCode, data } = await controller.run(input);

  return res.status(statusCode).json(data);
};

export default expressRouteAdapter;
