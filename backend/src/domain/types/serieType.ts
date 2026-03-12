export type CreateSerieInput = {
  title: string;
  description?: string | null;
  imageUrl?: string | null;
};

export type Series = {
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
};

export type GetCommentsAndRateSerieByIdOutput = {
  rate: number;
  comments: string[];
};
