import RegisterForm from "../components/registerForm";
import { useRegisterForm } from "../hooks/useRegisterForm";


export default function RegisterPage() {
  const { register, errors, isSubmitting, onSubmit, successMessage } =
    useRegisterForm();

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
        <h1 className="text-3xl font-extrabold">Register</h1>
        <p className="text-zinc-600 mt-1">Create your account.</p>

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