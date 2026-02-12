import { Router } from "express";
import { getUserFactory } from "@infrastructure/factories/getUser.factory";
import expressRouteAdapter from "@infrastructure/adapters/expressRoute.adapter";
import PrismaService from "@infrastructure/services/prisma.service";
import { registerUserFactory } from "@infrastructure/factories/authentication/registerUser.factory";
import { loginFactory } from "@infrastructure/factories/authentication/login.factory";
import { movieRegisterFactory } from "@infrastructure/factories/movies/movieRegister.factory";
import { movieSearchFactory } from "@infrastructure/factories/movies/movieSearch.factory";
import { moviesListFactory } from "@infrastructure/factories/movies/moviesList.factory";


export function createRouter(prismaService: PrismaService) {
  const router = Router();

  router.get("/ping", (_req, res) => {
    return res.status(200).json("pong");
  });

  router.get("/users", (req, res) =>
    expressRouteAdapter(req, res, getUserFactory(prismaService)),
  );

  router.post("/auth/register", (req, res) =>
    expressRouteAdapter(req, res, registerUserFactory(prismaService)),
  );

  router.post("/auth/login", (req, res) =>
    expressRouteAdapter(req, res, loginFactory(prismaService)),
  );

   router.post("/movie/register", (req, res) =>
    expressRouteAdapter(req, res, movieRegisterFactory(prismaService)),
  );

   router.get("/movie/Search", (req, res) =>
    expressRouteAdapter(req, res, movieSearchFactory(prismaService)),
  );

  router.get("/movies", (req, res) =>
    expressRouteAdapter(req, res, moviesListFactory(prismaService)),
  );


  return router;
}
