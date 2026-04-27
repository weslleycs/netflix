import { PrismaClient } from '@prisma/client';

export interface IPrismaService {
  getConnection(): PrismaClient;
  end(): Promise<void>;
}
