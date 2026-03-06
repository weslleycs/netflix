import { PrismaClient } from '@prisma/client';

class PrismaService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'warn', 'error'] : ['warn', 'error'],
    });
  }

  getConnection(): PrismaClient {
    return this.prisma;
  }

  async end(): Promise<void> {
    await this.prisma.$disconnect();
  }
}

export default PrismaService;
