import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { registerUserSchema, type RegisterUserFormValues } from '../schemas/registerUserSchema'
import { registerUser } from '@/features/auth/api/auth'
import { getStatus } from '@/shared/api/errors'

export function useUserRegisterForm() {
  const navigate = useNavigate()
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterUserFormValues>({
    resolver: zodResolver(registerUserSchema),
  })

  const onSubmit: SubmitHandler<RegisterUserFormValues> = async (values) => {
    try {
      await registerUser(values)
      setSuccessMessage('Account created. Redirecting to login...')
      setTimeout(() => navigate('/login'), 800)
    } catch (err) {
      if (getStatus(err) === 409) {
        setError('email', { message: 'Email already in use' })
        return
      }
      setError('root', { message: 'Something went wrong. Please try again.' })
    }
  }

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    successMessage,
  }
}
