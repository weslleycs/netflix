import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'

import { registerGenreSchema, type RegisterGenreFormValues } from '../schema/registerSchema'
import { registerGenre } from '@/features/genres/api/genre'
import { getStatus } from '@/shared/api/errors'

export function useGenreRegisterForm() {
  const queryClient = useQueryClient()
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterGenreFormValues>({
    resolver: zodResolver(registerGenreSchema),
  })

  const onSubmit = handleSubmit(async (values) => {
    try {
      await registerGenre(values)
      await queryClient.invalidateQueries({ queryKey: ['genres'] })
      setSuccessMessage(`Genre "${values.name}" created.`)
      reset()
    } catch (err) {
      if (getStatus(err) === 409) {
        setError('name', { type: 'server', message: 'Genre already exists' })
        return
      }
      setError('root', {
        type: 'server',
        message: 'Something went wrong. Please try again.',
      })
    }
  })

  return { register, errors, isSubmitting, onSubmit, successMessage }
}
