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
};
