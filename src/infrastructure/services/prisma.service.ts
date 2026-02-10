class PrismaService {
        private readonly prisma: PrismaClient;

    /**
     * Cria uma instância do serviço Prisma
     * @param {Prisma.PrismaClientOptions} [options] - Opções de configuração do Prisma Client
     */
    constructor(options?: Prisma.PrismaClientOptions) {
        this.prisma = new PrismaClient(options);

        this.setupEventListeners();
    }

    /**
     * Configura listeners de eventos do Prisma para logging automático
     * @private
     */
    private setupEventListeners(): void {
        this.prisma.$on('query' as never, (event: Prisma.QueryEvent) => {
            logger.debug(
                {
                    query: event.query,
                    duration: event.duration,
                    target: event.target,
                },
                'Prisma query executed',
            );
        });

        this.prisma.$on('error' as never, (error: Prisma.LogEvent) => {
            logger.error(error, 'Prisma client error');
        });

        this.prisma.$on('info' as never, (message: Prisma.LogEvent) => {
            logger.info(message, 'Prisma info message');
        });
    }

    /**
     * Retorna a instância ativa do Prisma Client
     * @returns \{PrismaClient\} Instância configurada do Prisma
     * @example
     * const prisma = prismaService.getConnection();
     * await prisma.user.findMany();
     */
    getConnection(): PrismaClient {
        return this.prisma;
    }

    /**
     * Desconecta seguramente do banco de dados
     * @throws {Error} Se a desconexão falhar
     * @example
     * await prismaService.end();
     */
    async end(): Promise<void> {
        try {
            await this.prisma.$disconnect();
            logger.info('[prisma service class][end method] conexao prisma encerrada com sucesso');
        } catch (error) {
            logger.error(
                error,
                '[prisma service class][end method] falha ao encerrar conexao prisma',
            );
            throw error;
        }
    }

    /**
     * Verifica a saúde da conexão com o banco
     * @returns \{Promise<boolean>\} `true` se a conexão está saudável
     * @example
     * const isHealthy = await prismaService.healthCheck();
     */
    async healthCheck(): Promise<boolean> {
        try {
            await this.prisma.$queryRaw`SELECT 1`;
            return true;
        } catch (error) {
            logger.error(error, 'falha na verificacao de integridade do banco de dados');
            return false;
        }
    }
}

export default PrismaService