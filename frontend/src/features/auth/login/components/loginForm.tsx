import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Button } from '@/shared/ui/button';
import { FormField } from '@/shared/ui/formField';
import type { LoginFormValues } from '../schemas/loginSchema';

type Props = {
  register: UseFormRegister<LoginFormValues>;
  errors: FieldErrors<LoginFormValues>;
  isSubmitting: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  successMessage: string | null;
};

export default function LoginForm({
  register,
  errors,
  isSubmitting,
  onSubmit,
  successMessage,
}: Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormField
        label="Email"
        type="email"
        placeholder="you@email.com"
        {...register('email')}
        error={errors.email?.message}
      />
      <FormField
        label="Password"
        type="password"
        placeholder="••••••••"
        {...register('password')}
        error={errors.password?.message}
      />
      {errors.root?.message ? (
        <p className="text-sm text-red-600">{errors.root.message as string}</p>
      ) : null}

      {successMessage ? <p className="text-sm text-green-600">{successMessage}</p> : null}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Waiting...' : 'Login'}
      </Button>
    </form>
  );
}
