export function registerCommentSerie(prismaService: PrismaService): registerCommentSerieController {
  const commentRepository = new CommentRepositoy(prismaService);
  const registerCommentSerieUseCase = new RegisterCommentSerieUseCase(commentRepository);
  const controller = new registerCommentSerieController(registerCommentSerieUseCase);
  return controller;
}
