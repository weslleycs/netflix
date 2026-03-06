import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormValues } from '../schemas/registerSchema';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '@/features/auth/api/auth';

export function useRegisterForm() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    const { confirmPassword, ...payload } = values;

    try {
      await registerUser(payload);

      setSuccessMessage('Account created successfully! Redirecting...');

      navigate('/login');
    } catch (err: any) {
      const status = err?.response?.status;

      if (status === 409) {
        setError('email', {
          type: 'server',
          message: 'Email already in use',
        });
        return;
      }

      setError('root', {
        type: 'server',
        message: 'Something went wrong. Please try again.',
      });
    }
  });

  return {
    register,
    errors,
    isSubmitting,
    onSubmit,
    successMessage,
  };
}
