import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { loginSchema, type LoginFormValues } from '../schemas/loginSchema';
import { loginUser } from '@/features/auth/api/auth';
import { useAuthStore } from '@/entities/session/model/auth.store';
import type { User } from '@/entities/user/model/user';

export function useLoginForm() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const { token, id, name, email } = await loginUser(values);
      const user: User = {
        id, 
        name,
        email
      }
      setAuth({ token, user });

      setSuccessMessage('Login successful! Redirecting...');

      navigate('/movies/list', { replace: true });
    } catch (err: any) {
      const status = err?.response?.status;

      if (status === 401) {
        setError('root', {
          type: 'server',
          message: 'Email of Password Not Found.',
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
