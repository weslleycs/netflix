import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerSchema, type RegisterFormValues } from '../schema/registerSchema';
import { registerMovie } from '@/features/movies/api/movie';

export function useSerieRegisterForm() {
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
    const { ...payload } = values;

    try {
      await registerMovie(payload);

      setSuccessMessage('Movie created successfully! Redirecting...');

      navigate('/series');
    } catch (err: any) {
      const status = err?.response?.status;

      if (status === 409) {
        setError('title', {
          type: 'server',
          message: 'Movie already in use',
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
