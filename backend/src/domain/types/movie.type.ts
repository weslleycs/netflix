export type CreateMovieInput = {
  title: string;
  description: string;
  imageUrl: string;
  genre:string
};

export type MovieSearchInput = {
  title: string;
};


export type MovieSearchOutput = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  genre:string;
};






