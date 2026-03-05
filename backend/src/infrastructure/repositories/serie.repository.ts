import { CreateSerieInput, GetById, SerieSearchInput, SerieSearchOutput, SeriesListQuery, UpdaterSerie } from "@domain/types/serie.type";
import PrismaService from "@infrastructure/services/prisma.service";
import { AppError, ErrorCode, ErrorMessage } from "@shared/errors/AppError";


class SerieRepository {
  private readonly prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  async register(input: CreateSerieInput): Promise<boolean> {
    const prisma= this.prismaService.getConnection(); 
    try {
      
      
    const dataSerie = await prisma.serie.create({
      data: {
            title: input.title,
            description: input.description,
            imageUrl: input.imageUrl,
            genre:input.genre
      }
    })
     await Promise.all(
      input.seasons.map((season)=>{
       prisma.season.create({
        data: {
          season: season.season,
          episodes: season.episodes,
          serieId: dataSerie.id,
        }
      })
    })
     ) 
    return true
    } catch (error) {
      console.log(error);
      
    }
  }

  async serchByTitle(input: SerieSearchInput): Promise<SerieSearchOutput[]> {
    const prisma= this.prismaService.getConnection();
    const series= await prisma.serie.findMany({
      where: {
        title: {
          contains: input.title,
        }
      }
    })
    return series
  }

  async serchByGenre(input: SerieSearchInput): Promise<SerieSearchOutput[]> {
    const prisma= this.prismaService.getConnection();
    const series= await prisma.serie.findMany({
      where: {
        genre: input.genre
      }
    })
    return series
  }

  async listAll(): Promise<SerieSearchOutput[]> {
    const prisma = this.prismaService.getConnection();
    return prisma.serie.findMany();
  }     

async getById(input: GetById): Promise<SerieSearchOutput> {
  try {
    const prisma = this.prismaService.getConnection();
    const serie = await prisma.serie.findUnique({
      where: {
        id: Number(input.id),
      },
    });

    if (!serie) {
      throw new AppError(ErrorCode.NOT_FOUND, ErrorMessage.NOT_FOUND);
    }

    return serie;
  } catch (error) {
    if (error instanceof AppError) throw error;
    const message = error instanceof Error ? error.message : ErrorMessage.INTERNAL;
    throw new AppError(ErrorCode.INTERNAL, message);
  }
}

async updater(data: UpdaterSerie): Promise<boolean > {
  const prisma= this.prismaService.getConnection();
  const { id, ...updaterData } = data
  await prisma.serie.update({
    data: {
      ...updaterData,
      updatedAt: new Date()
    },
    where:{
      id: Number(id)
    }
  });

  return true;
}

}

export default SerieRepository;
