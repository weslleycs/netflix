import { Card } from "@/shared/ui/card";
import LoginForm from "../components/loginForm";
import { useLoginForm } from "../hooks/useLoginForm";

export default function LoginPage() {
  const { register, errors, isSubmitting, onSubmit, successMessage } =
    useLoginForm();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <Card>
        <h1 className="text-2xl font-semibold text-white">Login</h1>
        <p className="mt-1 text-zinc-400">Enter your credentials..</p>

        <div className="mt-6">
          <LoginForm
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
