import { Genre } from "@prisma/client";

export type Season={
  season: number;
  episodes:number;
}

export type CreateSerieInput = {
  title: string;
  description: string;
  imageUrl: string;
  genre:Genre;
  seasons: Season[];  
};

export type SerieSearchInput = {
  title?: string;
  genre?:Genre
};


export type SerieSearchOutput = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  genre:Genre;
};

export type GetById = {
  id: number;
};

export type UpdaterSerieBody = {
  title?: string;
  description?: string;
  imageUrl?: string;
  genre?:Genre
};

export type UpdaterSerie = {
  id: number;
  title?: string;
  description?: string;
  imageUrl?: string;
  genre?:Genre
};

export type SeriesListQuery = {
  genre?: Genre;
};






