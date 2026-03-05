import { GenreMovie } from "@prisma/client";

export type CreateMovieInput = {
  title: string;
  description: string;
  imageUrl: string;
  genre:GenreMovie
};

export type MovieSearchInput = {
  title?: string;
  genre?:GenreMovie
};


export type MovieSearchOutput = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  genre:GenreMovie;
};

export type GetById = {
  id: number;
};

export type UpdaterMovieBody = {
  title?: string;
  description?: string;
  imageUrl?: string;
  genre?:GenreMovie
};

export type UpdaterMovie = {
  id: number;
  title?: string;
  description?: string;
  imageUrl?: string;
  genre?:GenreMovie
};

export type MoviesListQuery = {
  genre?: GenreMovie;
};






