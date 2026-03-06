import expressRouteAdapter from "@infrastructure/adapters/expressRoute.adapter";
import { moviesGetAllFactory } from "@infrastructure/factories/movies/getAll.factory";
import { movieGetByGenreFactory } from "@infrastructure/factories/movies/getByGenre.factory";
import { movieGetByIdFactory } from "@infrastructure/factories/movies/getById.factory";
import { movieGetByTitleFactory } from "@infrastructure/factories/movies/getByTitle.factory";
import { movieRegisterFactory } from "@infrastructure/factories/movies/register.factory";
import { movieUpdaterFactory } from "@infrastructure/factories/movies/updater.factory";
import { adminOnly } from "@infrastructure/middlewares/adminOnly.middleware";
import { authMiddleware } from "@infrastructure/middlewares/auth.middleware";
import PrismaService from "@infrastructure/services/prisma.service";
import { Router } from "express";


export function movieRoutes(router: Router, prismaService: PrismaService) {

  router.post("/movie/register", authMiddleware, (req, res) =>
    expressRouteAdapter(req, res, movieRegisterFactory(prismaService)),
  );

  router.get("/movie/title",authMiddleware, (req, res) =>
    expressRouteAdapter(req, res, movieGetByTitleFactory(prismaService)),
  );
  router.get("/movie/genre",authMiddleware, (req, res) =>
    expressRouteAdapter(req, res, movieGetByGenreFactory(prismaService)),
  );

  router.get("/movie", authMiddleware, (req, res) =>
    expressRouteAdapter(req, res, moviesGetAllFactory(prismaService)),
  );


  router.get("/movie/:id",authMiddleware, (req, res) =>
    expressRouteAdapter(req, res, movieGetByIdFactory(prismaService)),
  );

  router.put("/movie/:id",authMiddleware, adminOnly, (req, res) =>
    expressRouteAdapter(req, res, movieUpdaterFactory(prismaService)),
  );
}
