import { useSearchParams } from 'react-router-dom'
import { Card } from '@/shared/ui/card'
import EditForm from '@/features/movies/edit/components/editForm'
import { useMovieEditForm } from '@/features/movies/edit/hooks/useMovieEditForm'
import { Loading } from '@/shared/ui/loading'
import { ErrorMessage } from '@/shared/ui/errorMessage'

export default function MoviesEditPage() {
  const [searchParams] = useSearchParams()
  const movieId = Number(searchParams.get('movieId'))

  const {
    register,
    errors,
    isSubmitting,
    onSubmit,
    isLoading,
    successMessage,
  } = useMovieEditForm(movieId)

  if (!movieId) return <ErrorMessage title="Missing movie id" message="No movie was selected." />
  if (isLoading) return <Loading label="Loading movie..." />

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <Card>
        <h1 className="text-3xl font-extrabold">Edit Movie</h1>
        <p className="mt-2 text-white/60">Update your movie.</p>

        <div className="mt-6">
          <EditForm
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