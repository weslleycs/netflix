import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { Button } from "@/shared/ui/button";
import { FormField } from "@/shared/ui/formField";
import { GENRES, type RegisterFormValues } from "../schema/registerSchema";

type Props = {
  register: UseFormRegister<RegisterFormValues>;
  errors: FieldErrors<RegisterFormValues>;
  isSubmitting: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  successMessage: string | null;
};

export default function RegisterForm({
  register,
  errors,
  isSubmitting,
  onSubmit,
  successMessage,
}: Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormField
        label="Title"
        type="text"
        placeholder="Your title"
        {...register("title")}
        error={errors.title?.message}
      />

      <FormField
        label="Description"
        type="text"
        placeholder="Description"
        {...register("description")}
        error={errors.description?.message}
      />

      <FormField
        label="ImagenUrl"
        type="text"
        placeholder="URL"
        {...register("imageUrl")}
        error={errors.imageUrl?.message}
      />

      <FormField
        label="Genre"
        as="select"
        options={GENRES.map((genre) => ({ label: genre.label, value: genre.value }))}
        {...register("genre")}
        error={errors.genre?.message}
      />

      {errors.root?.message ? (
        <p className="text-sm text-red-600">{errors.root.message as string}</p>
      ) : null}

      {successMessage ? (
        <p className="text-sm text-green-600">{successMessage}</p>
      ) : null}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Creating..." : "Create movie"}
      </Button>
    </form>
  );
}