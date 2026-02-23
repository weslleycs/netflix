import type React from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { RegisterFormValues } from "../schemas/registerSchema";

type Props = {
  register: UseFormRegister<RegisterFormValues>;
  errors: FieldErrors<RegisterFormValues> & {
    root?: { message?: string };
  };
  isSubmitting: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => void | Promise<void>;
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

     {successMessage && (
        <p className="text-green-600 text-sm">
        {successMessage}
        </p>
    )}

      {errors.root?.message && (
        <p className="text-red-500 text-sm">{errors.root.message}</p>
      )}

      <div className="space-y-1">
        <input
          type="text"
          placeholder="Nome"
          {...register("name")}
          className="w-full border rounded px-3 py-2"
        />
        {errors.name?.message && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full border rounded px-3 py-2"
        />
        {errors.email?.message && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <input
          type="password"
          placeholder="Senha"
          {...register("password")}
          className="w-full border rounded px-3 py-2"
        />
        {errors.password?.message && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <input
          type="password"
          placeholder="Confirmar senha"
          {...register("confirmPassword")}
          className="w-full border rounded px-3 py-2"
        />
        {errors.confirmPassword?.message && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-black text-white rounded px-3 py-2 disabled:opacity-60"
      >
        {isSubmitting ? "Registrando..." : "Registrar"}
      </button>
    </form>
  );
}