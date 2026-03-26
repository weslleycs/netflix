export type RegisterCommentSerie = {
  comment: string;
  serieId: number;
  userId: number;
};

export type RegisterCommentMovie = {
  comment: string;
  movieId: number;
  userId: number;
};

export type DeleteCommentParams = {
  id: number;
};

export type DeleteCommentBody = {
  userId: number;
};

export type DeleteCommentInput = {
  commentId: number;
  userId: number;
};

export type EditComment = {
  id: number;
  comment: string;
};

export type EditCommentParams = {
  id: number;
};

export type EditCommentBody = {
  comment: string;
};
