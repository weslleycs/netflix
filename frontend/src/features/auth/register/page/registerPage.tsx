import RegisterForm from "../components/registerForm";
import { useRegisterForm } from "../hooks/useRegisterForm";

export default function RegisterPage() {
  const { register, errors, isSubmitting, onSubmit, successMessage } =
    useRegisterForm();

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white border shadow-sm border-zinc-200 rounded-2xl">
        <h1 className="text-3xl font-extrabold">Create account</h1>
        <p className="mt-1 text-zinc-600">Create your account.</p>

        <div className="mt-6">
          <RegisterForm
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
            successMessage={successMessage}
          />
        </div>
      </div>
    </div>
  );
}