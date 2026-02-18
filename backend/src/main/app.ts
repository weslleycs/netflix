import "dotenv/config";
import express from "express";
import PrismaService from "@infrastructure/services/prisma.service";
import { loggerMiddleware } from "@shared/logger";
import { errorHandler } from "@infrastructure/middlewares/errorHandler.middleware";
import { createRouter } from "./route";

const app = express();
const prismaService = new PrismaService();

app.use(express.json());

// Logger - antes das rotas (loga cada request)
app.use(loggerMiddleware);

// Rotas
app.use(createRouter(prismaService));

// Error handler - depois das rotas (captura erros)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
