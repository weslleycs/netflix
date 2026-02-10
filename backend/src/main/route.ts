import { Router } from "express";
import { getUserFactory } from "@infrastructure/factories/getUser.factory";
import expressRouteAdapter from "@infrastructure/adapters/expressRoute.adapter";

const router = Router();

router.get("/ping", (_req, res) => {
  return res.status(200).json("pong");
});

router.get("/users", (req, res) =>
  expressRouteAdapter(req, res, getUserFactory()),
);

export default router;
