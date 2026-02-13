import expressRouteAdapter from "@infrastructure/adapters/expressRoute.adapter";
import { moviesGetAllFactory } from "@infrastructure/factories/movies/getAll.factory";
import { movieGetByIdFactory } from "@infrastructure/factories/movies/getById.factory";
import { movieGetByTitlleFactory } from "@infrastructure/factories/movies/getByTitle.factory";
import { movieRegisterFactory } from "@infrastructure/factories/movies/register.factory";
import { movieUpdaterFactory } from "@infrastructure/factories/movies/updater.factory";
import PrismaService from "@infrastructure/services/prisma.service";
import { Router } from "express";

export function movieRoutes(router: Router, prismaService: PrismaService){
   router.post("/movie/register", (req, res) =>
    expressRouteAdapter(req, res, movieRegisterFactory(prismaService)),
  );

   router.get("/movie/GetByTitle", (req, res) =>
    expressRouteAdapter(req, res, movieGetByTitlleFactory(prismaService)),
  );

   router.get("/movie", (req, res) =>
    expressRouteAdapter(req, res, moviesGetAllFactory(prismaService)),
  );

   router.get("/movie/:id", (req, res) =>
    expressRouteAdapter(req, res, movieGetByIdFactory(prismaService)),
  );

  router.put("/movie/:id", (req, res) =>
  expressRouteAdapter(req, res, movieUpdaterFactory(prismaService)),
);

}