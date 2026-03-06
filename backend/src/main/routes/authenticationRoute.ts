import expressRouteAdapter from "@infrastructure/adapters/expressRoute.adapter";
import { registerUserFactory } from "@infrastructure/factories/authentication/registerFactory";
import PrismaService from "@infrastructure/services/prisma.service";
import { Router } from "express";

export function authenticationRoutes(router: Router, prismaService: PrismaService) {
 
  router.post("/auth/register", (req, res) =>
    expressRouteAdapter(req, res, registerUserFactory(prismaService)),
  );
}
