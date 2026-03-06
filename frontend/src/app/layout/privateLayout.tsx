import { useAuthStore } from '@/entities/session/model/auth.store';
import Navbar from '@/widgets/navbar/navbar';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateLayout() {
  const token = useAuthStore((s) => s.token);
  if (!token) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen text-white bg-black">
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,rgba(229,9,20,0.22),transparent_60%)]">
        <div className="min-h-screen bg-black/60">
          <Navbar />
          <main>
            <div className="max-w-6xl px-6 mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
