import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import PrismaService from '@infrastructure/services/prisma.service';
import { loggerMiddleware } from '@shared/logger';
import { createRouter } from './route';
import { errorHandler } from '@infrastructure/middlewares/errorHandler.middleware';

const app = express();
const prismaService = new PrismaService();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

app.use(express.json());
app.use(loggerMiddleware);

app.use(createRouter(prismaService));
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
