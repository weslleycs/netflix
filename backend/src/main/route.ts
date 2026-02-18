import { Router } from "express";
import { getUserFactory } from "@infrastructure/factories/getUser.factory";
import expressRouteAdapter from "@infrastructure/adapters/expressRoute.adapter";
import PrismaService from "@infrastructure/services/prisma.service";
import { authenticationRoutes } from "./routes/authentication.route";
import { movieRoutes } from "./routes/movie.route";



export function createRouter(prismaService: PrismaService) {
  const router = Router();

  router.get("/ping", (_req, res) => {
    return res.status(200).json("pong");
  });
    router.get("/users", (req, res) =>
    expressRouteAdapter(req, res, getUserFactory(prismaService)),
  );
   authenticationRoutes(router,prismaService)
   movieRoutes(router, prismaService)


  return router;
}
