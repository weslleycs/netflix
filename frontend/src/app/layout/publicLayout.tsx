import { Outlet, NavLink } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="min-h-screen text-white bg-black">
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,rgba(229,9,20,0.22),transparent_60%)]">
        <div className="min-h-screen bg-black/60">
          <header className="w-full">
            <div className="flex items-center justify-between max-w-6xl px-6 py-6 mx-auto">
              <NavLink to="/" className="text-2xl font-extrabold tracking-wide text-red-600">
                WESLLEYFLIX
              </NavLink>

              <div className="flex gap-3">
                <NavLink
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold transition bg-red-600 rounded hover:bg-red-700"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold transition border rounded border-white/20 bg-white/5 hover:bg-white/10"
                >
                  Register
                </NavLink>
              </div>
            </div>
          </header>
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