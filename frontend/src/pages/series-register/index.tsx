import { Card } from '@/shared/ui/card'
import RegisterForm from '@/features/series/register/components/registerForm'
import { useSerieRegisterForm } from '@/features/series/register/hooks/serieRegisterForm'

export default function SeriesRegisterPage() {
  const { register, errors, isSubmitting, onSubmit, successMessage } = useSerieRegisterForm()

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <Card>
        <h1 className="text-3xl font-extrabold">Create Serie</h1>
        <p className="mt-2 text-white/60">Add a new serie to the catalog.</p>
        <div className="mt-6">
          <RegisterForm
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
            successMessage={successMessage}
          />
        </div>
      </Card>
    </div>
  )
}
