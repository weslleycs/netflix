export type Serie = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  genre: string;
  createdAt: string;
};


export const seriesData: Serie[] = [
  {
    id: "1",
    title: "Stranger Things",
    description:
      "Um grupo de amigos enfrenta forças sobrenaturais em uma pequena cidade cheia de mistérios.",
    imageUrl:
      "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SY679_.jpg",
    genre: "Sci-Fi",
    createdAt: "2016-07-15",
  },
  {
    id: "2",
    title: "Breaking Bad",
    description:
      "Um professor de química começa a fabricar metanfetamina após ser diagnosticado com câncer.",
    imageUrl:
      "https://m.media-amazon.com/images/I/81VStYnDGrL._AC_SY679_.jpg",
    genre: "Drama",
    createdAt: "2008-01-20",
  },
  {
    id: "3",
    title: "The Witcher",
    description:
      "Geralt de Rívia, um caçador de monstros solitário, luta para encontrar seu lugar em um mundo cruel.",
    imageUrl:
      "https://m.media-amazon.com/images/I/91ErF1WnG-L._AC_SY679_.jpg",
    genre: "Fantasy",
    createdAt: "2019-12-20",
  },
];