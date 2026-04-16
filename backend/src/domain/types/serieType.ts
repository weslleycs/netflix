export type CreateSerieInput = {
  title: string;
  description?: string | null;
  imageUrl?: string | null;
};

export type SerieListAllInput = {
  id?: number;
  title?: string;
  genre?: string;
  limit?: number;
  page?: number;
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

export type SerieDetailsInput = {
  id: number;
};

export type SerieDetails = {
  id: number;
  title: string;
  description: string | null;
  imageUrl: string | null;
  genre: string[];
  rate: number;
};
