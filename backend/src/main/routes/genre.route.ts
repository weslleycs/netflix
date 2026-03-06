import expressRouteAdapter from "@infrastructure/adapters/expressRoute.adapter";
import { registerGenreFactory } from "@infrastructure/factories/genre/registerFactory";
import PrismaService from "@infrastructure/services/prisma.service";
import { Router } from "express";

export function genreRoutes(router: Router, prismaService: PrismaService) {
 
  router.post("/genre/register", (req, res) =>
    expressRouteAdapter(req, res, registerGenreFactory(prismaService)),
  );
}