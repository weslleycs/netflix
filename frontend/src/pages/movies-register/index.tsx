import { Card } from '@/shared/ui/card';
import RegisterForm from '@/features/movies/register/components/registerForm';
import { useMovieRegisterForm } from '@/features/movies/register/hooks/movieRegisterForm';

export default function MoviesRegisterPage() {
  const { register, errors, isSubmitting, onSubmit, successMessage } = useMovieRegisterForm();

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <Card>
        <h1 className="text-3xl font-extrabold">Create Movie</h1>
        <p className="mt-2 text-white/60">Create your Movie.</p>
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
