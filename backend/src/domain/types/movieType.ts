export type CreateMovieInput = {
  title: string;
  description?: string;
  imageUrl?: string;
};

export type Movies = {
  id: number;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  userId?: number | null;
  createdAt: Date;
  updatedAt: Date;
};

export type GetByTitleMovie = {
  title: string;
};

export type GetByGenreMovie = {
  movieId: number;
};

export type Genres = {
  genreId: number[];
};
