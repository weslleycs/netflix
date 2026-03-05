import expressRouteAdapter from "@infrastructure/adapters/expressRoute.adapter";
import { serieRegisterFactory } from "@infrastructure/factories/series/register.factory";
import PrismaService from "@infrastructure/services/prisma.service";
import { Router } from "express";

export function serieRoutes(router: Router, prismaService: PrismaService) {

  router.post("/serie/register", (req, res) =>
    expressRouteAdapter(req, res, serieRegisterFactory(prismaService)),
  );
}
//   router.get("/serie/title",authMiddleware, (req, res) =>
//     expressRouteAdapter(req, res, serieGetByTitleFactory(prismaService)),
//   );
//   router.get("/serie/genre",authMiddleware, (req, res) =>
//     expressRouteAdapter(req, res, serieGetByGenreFactory(prismaService)),
//   );

//   router.get("/serie", authMiddleware, (req, res) =>
//     expressRouteAdapter(req, res, seriesGetAllFactory(prismaService)),
//   );


//   router.get("/serie/:id",authMiddleware, (req, res) =>
//     expressRouteAdapter(req, res, serieGetByIdFactory(prismaService)),
//   );

//   router.put("/serie/:id",authMiddleware, adminOnly, (req, res) =>
//     expressRouteAdapter(req, res, serieUpdaterFactory(prismaService)),
//   );
// 