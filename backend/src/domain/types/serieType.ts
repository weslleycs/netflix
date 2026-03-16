export type CreateSerieInput = {
  title: string;
  description?: string | null;
  imageUrl?: string | null;
};

export type Serie = {
  id: number;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  userId?: number | null;
  createdAt: Date;
  updatedAt: Date;
};

export type SerieInput = {
  title: string;
  page?: number;
  limit?: number;
};

export type GetAllLimite = {
  page?: number;
  limit?: number;
};

export type GetCommentsAndRateSerieById = {
  serieId: number;
  page?: number;
  limit?: number;
};

export type GetCommentsAndRateSerieByIdOutput = {
  rate: number;
  comments: string[];
};

export type GetSeriesByGenre = {
  genre: string;
  page?: number;
  limit?: number;
};
