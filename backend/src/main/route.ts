import { Router } from "express";
import { getUserFactory } from "@infrastructure/factories/getUser.factory";
import expressRouteAdapter from "@infrastructure/adapters/expressRoute.adapter";
import PrismaService from "@infrastructure/services/prisma.service";
import { registerUserFactory } from "@infrastructure/factories/authentication/registerUser.factory";
import { loginFactory } from "@infrastructure/factories/authentication/login.factory";
import { movieFactory } from "@infrastructure/factories/movies/registerMovie.factory";

export function createRouter(prismaService: PrismaService) {
  const router = Router();

  router.get("/ping", (_req, res) => {
    return res.status(200).json("pong");
  });

  router.get("/users", (req, res) =>
    expressRouteAdapter(req, res, getUserFactory(prismaService)),
  );

  router.post("/register", (req, res) =>
    expressRouteAdapter(req, res, registerUserFactory(prismaService)),
  );

  router.post("/login", (req, res) =>
    expressRouteAdapter(req, res, loginFactory(prismaService)),
  );

   router.post("/movies", (req, res) =>
    expressRouteAdapter(req, res, movieFactory(prismaService)),
  );

  return router;
}
