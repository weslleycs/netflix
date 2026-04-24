import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Button } from '@/shared/ui/button'
import { FormField } from '@/shared/ui/formField'
import type { RegisterGenreFormValues } from '../schema/registerSchema'

type Props = {
  register: UseFormRegister<RegisterGenreFormValues>
  errors: FieldErrors<RegisterGenreFormValues>
  isSubmitting: boolean
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
  successMessage: string | null
}

export default function RegisterGenreForm({
  register,
  errors,
  isSubmitting,
  onSubmit,
  successMessage,
}: Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormField
        label="Name"
        type="text"
        placeholder="Action, Drama, Comedy..."
        {...register('name')}
        error={errors.name?.message}
      />

      <FormField
        label="Description"
        type="text"
        placeholder="A short description"
        {...register('description')}
        error={errors.description?.message}
      />

      {errors.root?.message ? (
        <p className="text-sm text-red-600">{errors.root.message as string}</p>
      ) : null}

      {successMessage ? <p className="text-sm text-green-500">{successMessage}</p> : null}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Creating...' : 'Create genre'}
      </Button>
    </form>
  )
}
