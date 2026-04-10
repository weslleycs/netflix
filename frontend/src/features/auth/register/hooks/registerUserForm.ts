import { useForm, type SubmitHandler } from 'react-hook-form';
import type { RegisterUserFormValues } from '../schemas/registerUserSchema';

export function useUserRegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterUserFormValues>();

  const onSubmit: SubmitHandler<RegisterUserFormValues> = async (data) => {
    console.log(data);
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    successMessage: null,
  };
}