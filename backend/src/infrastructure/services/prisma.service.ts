import { PrismaClient } from "@prisma/client";

class PrismaService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  getConnection(): PrismaClient {
    return this.prisma;
  }

  async end(): Promise<void> {
    await this.prisma.$disconnect();
  }
}

export default PrismaService;