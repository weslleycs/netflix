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

export type MovieListAllInput = {
  limit?: number;
  page?: number;
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
export type GetMoviesByGenreinput = {
  genre: string;
};

export type GetMoviesByGenreoutput = {
  id: number;
  title: string;
  description: string | null;
  imageUrl: string | null;
  userId: number | null;
  createdAt: Date;
  updatedAt: Date;
};

export type GetCommentsAndRateMovieById = {
  movieId: number;
};

export type GetCommentsAndRateMovieByIdOutput = {
  rate: number;
  comments: string[];
};

export type GetById = {
  id: number;
};

export type UpdaterMovieBody = {
  title?: string;
  description?: string;
  imageUrl?: string;
};

export type UpdaterMovie = {
  id: number;
  title?: string;
  description?: string;
  imageUrl?: string;
};
