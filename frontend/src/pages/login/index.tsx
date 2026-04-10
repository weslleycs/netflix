import { Card } from '@/shared/ui/card';
import { useLoginForm } from '@/features/auth/login/hooks/useLoginForm';
import LoginForm from '@/features/auth/login/components/loginForm';

export default function LoginPage() {
  const { register, handleSubmit, errors, isSubmitting, onSubmit, successMessage } = useLoginForm();

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <Card>
        <h1 className="text-3xl font-extrabold">Login</h1>
        <div className="mt-6">
          <LoginForm
            register={register}
            handleSubmit={handleSubmit}
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
