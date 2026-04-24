import type {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui/button';
import { FormField } from '@/shared/ui/formField';
import type { LoginFormValues } from '../schema/loginSchema';

type Props = {
  register: UseFormRegister<LoginFormValues>;
  handleSubmit: UseFormHandleSubmit<LoginFormValues>;
  errors: FieldErrors<LoginFormValues>;
  isSubmitting: boolean;
  onSubmit: SubmitHandler<LoginFormValues>;
  successMessage: string | null;
};

export default function LoginForm({
  register,
  handleSubmit,
  errors,
  isSubmitting,
  onSubmit,
  successMessage,
}: Props) {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        label="Email"
        type="text"
        placeholder="you@example.com"
        {...register('email')}
        error={errors.email?.message}
      />

      <FormField
        label="Password"
        type="password"
        placeholder="Password"
        {...register('password')}
        error={errors.password?.message}
      />

      {errors.root?.message ? (
        <p className="text-sm text-red-600">{errors.root.message as string}</p>
      ) : null}

      {successMessage ? (
        <p className="text-sm text-green-600">{successMessage}</p>
      ) : null}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Logging in...' : 'Login'}
      </Button>
      <p className="text-sm text-center text-white/60">
        Don't have an account?{' '}
        <Link to="/register" className="text-red-500 hover:underline">
          Create one
        </Link>
      </p>
    </form>
  );
}