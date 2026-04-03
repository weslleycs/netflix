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
  id?: number;
  title?: string;
  genre?: string;
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
  comments: {
    id: number;
    comment: string;
    userName: string;
  }[];
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
export type CommentMovieInput = {
  movieId: number;
};

export type CommentMovieOutput = {
  id: number;
  comment: string;
  userName: string;
};

export type MovieDetailsInput = {
  movieId: number;
};

export type MovieDetails = {
  id: number;
  title: string;
  description: string | null;
  imageUrl: string | null;
  genre: string[];
  rate: number;
};
