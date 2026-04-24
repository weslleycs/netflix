import type {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import { Button } from '@/shared/ui/button';
import { FormField } from '@/shared/ui/formField';
import type { RegisterUserFormValues } from '../schemas/registerUserSchema';
import { Link } from 'react-router-dom';

type Props = {
  register: UseFormRegister<RegisterUserFormValues>;
  handleSubmit: UseFormHandleSubmit<RegisterUserFormValues>;
  errors: FieldErrors<RegisterUserFormValues>;
  isSubmitting: boolean;
  onSubmit: SubmitHandler<RegisterUserFormValues>;
  successMessage: string | null;
};

export default function RegisterUserForm({
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
        label="Name"
        type="text"
        placeholder="Name"
        {...register('name')}
        error={errors.name?.message}
      />

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
        {isSubmitting ? 'Creating...' : 'Create account'}
      </Button>
      <p className="text-sm text-center text-white/60">
        Already have an account?{' '}
        <Link to="/login" className="text-red-500 hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}