import "dotenv/config";
import express from "express";
import PrismaService from "@infrastructure/services/prisma.service";
import { createRouter } from "./route";

const app = express();
const prismaService = new PrismaService();

app.use(express.json());

app.use(createRouter(prismaService));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  const user= await prismaService.getConnection().$executeRawUnsafe("select * from users")
  console.log(`🚀 Server running on port ${prismaService.getConnection().$executeRawUnsafe("select * from users")}`);
  console.log(`🚀 Server running on port ${PORT}`);
});


