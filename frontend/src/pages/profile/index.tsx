import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/entities/session/model/auth.store'
import { Card } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'

export default function ProfilePage() {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  if (!user) {
    return (
      <div className="py-16 text-center text-white/60">
        You are not signed in.
      </div>
    )
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <Card>
        <h1 className="text-3xl font-extrabold">Profile</h1>
        <p className="mt-2 text-white/60">Account information.</p>

        <dl className="grid grid-cols-1 gap-4 mt-6 text-sm">
          <div>
            <dt className="text-white/50">Name</dt>
            <dd className="mt-1 text-base font-medium">{user.name}</dd>
          </div>
          <div>
            <dt className="text-white/50">Email</dt>
            <dd className="mt-1 text-base font-medium break-all">{user.email}</dd>
          </div>
          <div>
            <dt className="text-white/50">User ID</dt>
            <dd className="mt-1 text-base font-medium">#{user.id}</dd>
          </div>
        </dl>

        <div className="mt-8">
          <Button onClick={handleLogout}>Log out</Button>
        </div>
      </Card>
    </div>
  )
}
