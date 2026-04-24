import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuthStore } from '@/entities/session/model/auth.store'
import { loginSchema, type LoginFormValues } from '../schema/loginSchema'
import { loginUser } from '../../api/auth'
import { getStatus } from '@/shared/api/errors'

export function useLoginForm() {
  const navigate = useNavigate()
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const setAuth = useAuthStore((s) => s.setAuth)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    try {
      const data = await loginUser(values)
      setAuth({
        token: data.token,
        user: { id: data.id, name: data.name, email: data.email },
      })
      setSuccessMessage('Logging in...')
      navigate('/movies')
    } catch (err) {
      if (getStatus(err) === 401) {
        setError('root', { message: 'Invalid email or password' })
      } else {
        setError('root', { message: 'Something went wrong. Please try again.' })
      }
    }
  }

  return { register, handleSubmit, errors, isSubmitting, onSubmit, successMessage }
}