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
