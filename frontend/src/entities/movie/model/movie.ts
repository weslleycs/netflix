
export type Movie = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  genre: string;
  createdAt: string;
};

export type MovieDeatils = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  genre:string[];
  rate: number;
}

export type RateMovieBody = {
  movieId: number;
  rate: number;
};



