import expressRouteAdapter from "@infrastructure/adapters/expressRoute.adapter";
import { loginFactory } from "@infrastructure/factories/authentication/login.factory";
import { registerUserFactory } from "@infrastructure/factories/authentication/registerUser.factory";
import { movieRegisterFactory } from "@infrastructure/factories/movies/register.factory";
import PrismaService from "@infrastructure/services/prisma.service";
import { Router } from "express";

export function authenticationRoutes(router: Router, prismaService: PrismaService){
  router.post("/movie/register", (req, res) =>
    expressRouteAdapter(req, res, movieRegisterFactory(prismaService)),
  );
  router.post("/auth/register", (req, res) =>
    expressRouteAdapter(req, res, registerUserFactory(prismaService)),
  );

  router.post("/auth/login", (req, res) =>
    expressRouteAdapter(req, res, loginFactory(prismaService)),
  );
}