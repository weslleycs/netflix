import { Router } from "express";
import { getUserFactory } from "@infrastructure/factories/getUser.factory";
import expressRouteAdapter from "@infrastructure/adapters/expressRoute.adapter";
import PrismaService from "@infrastructure/services/prisma.service";
import { registertUserFactory } from "@infrastructure/factories/registerUser.factory";

export function createRouter(prismaService: PrismaService) {
  const router = Router();

  router.get("/ping", (_req, res) => {
    return res.status(200).json("pong");
  });

  router.get("/users", (req, res) =>
    expressRouteAdapter(req, res, getUserFactory(prismaService)),
  );

  router.post("/register", (req, res) =>
    expressRouteAdapter(req, res, registertUserFactory(prismaService)),
  );

  return router;
}
