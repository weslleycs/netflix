import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="w-full">
      <div className="flex items-center justify-between max-w-6xl px-6 py-6 mx-auto">
        <NavLink to="/movies" className="text-2xl font-extrabold tracking-wide text-red-600">
          WESLLEYFLIX
        </NavLink>

        <div className="flex gap-3">
          <NavLink
            to="/movies"
            className="px-4 py-2 text-sm font-semibold transition border rounded border-white/20 bg-white/5 hover:bg-white/10"
          >
            Home
          </NavLink>

          <NavLink
            to="/movies/register"
            className="px-4 py-2 text-sm font-semibold transition bg-red-600 rounded hover:bg-red-700"
          >
            Register Movie
          </NavLink>
        </div>
      </div>
    </header>
  );
}
