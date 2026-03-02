import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { GENRES } from "@/features/movies/home/schema/genre";


export default function AppHeader() {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function goAll() {
    setOpen(false);
    navigate("/movies/listAll");
  }

  function goGenre(value: string) {
    setOpen(false);
    navigate(`/movies/listAll?genre=${value}`);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/movies/listAll?q=${search}`);
  }

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

        
        <NavLink to="/movies">
          <span className="text-xl font-extrabold text-white tracking-wide">
            <span className="text-red-600">WESLLEY</span>FLIX
          </span>
        </NavLink>

        
        <div className="flex items-center gap-6">

      
          <div className="relative" ref={ref}>
            <button
              onClick={() => setOpen(v => !v)}
              className="text-sm text-zinc-200 hover:text-white"
            >
              Movies ▾
            </button>

            {open && (
              <div className="absolute mt-3 w-56 bg-zinc-950 border border-zinc-800 rounded-xl shadow-lg">
                <button
                  onClick={goAll}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-white/5"
                >
                  All Movies
                </button>

                {GENRES.map(genre => (
                  <button
                    key={genre.value}
                    onClick={() => goGenre(genre.value)}
                    className="w-full text-left px-4 py-3 text-sm text-zinc-200 hover:bg-white/5"
                  >
                    {genre.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          
          <NavLink
            to="/series"
            className="text-sm text-zinc-200 hover:text-white"
          >
            Series
          </NavLink>

          
          <form onSubmit={handleSearch}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search movies..."
              className="h-9 w-48 rounded-full bg-zinc-950 border border-zinc-800 px-4 text-sm text-white outline-none"
            />
          </form>

        
          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-400 hidden md:block">
              {user?.email}
            </span>

            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm bg-red-600 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}