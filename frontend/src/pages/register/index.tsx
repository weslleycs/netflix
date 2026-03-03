import { Card } from "@/shared/ui/card";
import RegisterForm from "@/features/auth/register/components/registerForm";
import { useRegisterForm } from "@/features/auth/register/hooks/useRegisterForm";

export default function RegisterPage() {
  const { register, errors, isSubmitting, onSubmit, successMessage } =
    useRegisterForm();

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <Card>
        <h1 className="text-3xl font-extrabold">Create account</h1>
        <p className="mt-2 text-white/60">Create your account.</p>
        <div className="mt-6">
          <RegisterForm
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
            successMessage={successMessage}
          />
        </div>
      </Card>
    </div>
  );
}
