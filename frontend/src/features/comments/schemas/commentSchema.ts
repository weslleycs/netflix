import { z } from 'zod';

export const commentSchema = z.object({
  comment : z.string().min(1, 'Comment is required').max(500, 'Too long')
});

export type CommentFormValues = z.infer<typeof commentSchema>;

