import { Outlet, NavLink, useLocation } from "react-router-dom";

export default function PublicLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <header className="flex items-center justify-between px-8 py-5 border-b border-zinc-200">
        {isHome ? (
          <span className="text-2xl font-extrabold text-red-600 tracking-wide">
            ProjetoNetflix
          </span>
        ) : (
          <NavLink to="/" className="text-2xl font-extrabold text-red-600 tracking-wide">
            ProjetoNetflix
          </NavLink>
        )}

        <div className="flex items-center gap-3">
          {pathname !== "/login" && (
            <NavLink
              to="/login"
              className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition font-semibold"
            >
              Login
            </NavLink>
          )}
          {pathname !== "/register" && (
            <NavLink
              to="/register"
              className="px-4 py-2 rounded border border-zinc-300 hover:bg-zinc-50 transition"
            >
              Register
            </NavLink>
          )}
        </div>
      </header>

      <main className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}