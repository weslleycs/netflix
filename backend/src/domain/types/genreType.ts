export type CreateGenreInput = {
  name: string;
  description: string;
};

export type GetbyId = {
  id: number;
};

export type GetByoutpout = {
  movieId: number;
  title: string;
  description: string;
  imageUrl: string;
  genreIds: number[];
};

export type GetAllGenre = {
  id: number;
  name: string;
  description: string | null;
};

export type InputGenreMovie = {
  genreId: number[];
  movieId: number;
};

export type GetAllMoviesByGenresOutput = {
  id: number;
  name: string;
  description: string | null;
  movies: {
    id: number;
    title: string;
    description: string | null;
    imageUrl: string | null;
    userId: number | null;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

export type GetAllSeriesByGenresOutput = {
  id: number;
  name: string;
  description: string | null;
  series: {
    id: number;
    title: string;
    description: string | null;
    imageUrl: string | null;
    userId: number | null;
    createdAt: Date;
    updatedAt: Date;
  }[];
};
