export type Genres = {
    id: number, 
    name: string, 
    description: string | null 
}
export type GetAllMoviesByGenresOutput = {
  id: number;
  name: string;
  description: string | null;
  movies: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    genre: string;
    createdAt: string;
  }[];
};

export type GetAllSeriesByGenresOutput = {
  id: number;
  name: string;
  description: string | null;
  series: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    genre: string;
    createdAt: string;
  }[];
};