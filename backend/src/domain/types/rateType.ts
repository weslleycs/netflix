export type RegisterRateMovie = {
  userId: number;
  movieId: number;
  rate: number;
};
export type RegisterRateSerie = {
  userId: number;
  serieId: number;
  rate: number;
};

export type SerieInput = {
  serieId: number;
};

export type GetRateSerie = {
  rate: number;
};

export type MovieInput = {
  movieId: number;
};

export type GetRateMovie = {
  rate: number;
};
