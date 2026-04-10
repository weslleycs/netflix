import RegisterUserForm from '@/features/auth/register/components/registerUserForm';
import { useUserRegisterForm } from '@/features/auth/register/hooks/registerUserForm';
import { Card } from '@/shared/ui/card';

export default function RegisterPage() {
  const { register, handleSubmit, errors, isSubmitting, onSubmit, successMessage } = useUserRegisterForm();

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <Card>
        <h1 className="text-3xl font-extrabold">Create account</h1>
        <div className="mt-6">
          <RegisterUserForm
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
