import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { CommentFormValues } from "../schemas/commentSchema";

type Props = {
  register: UseFormRegister<CommentFormValues>;
  errors: FieldErrors<CommentFormValues>;
  isSubmitting: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
};

export default function CommentForm({
  register,
  errors,
  isSubmitting,
  onSubmit,
}: Props) {
  return (
    <>
      <form onSubmit={onSubmit} className="flex gap-3 mt-6">
        <input
          type="text"
          placeholder="Write a comment..."
          {...register("comment")}
          className="flex-1 px-4 py-2 text-sm text-white border rounded-lg bg-zinc-900 border-white/20 focus:outline-none focus:ring-2 focus:ring-red-600 placeholder:text-white/50"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 text-sm font-semibold text-white transition bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-60"
        >
          {isSubmitting ? "..." : "Send"}
        </button>
      </form>

      {errors.comment && (
        <p className="mt-1 text-sm text-red-500">
          {errors.comment.message}
        </p>
      )}
    </>
  );
}