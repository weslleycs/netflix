import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useEffect, useState } from "react";
import type { Movie } from "../movie.type";
import { getMovies } from "../../api/movie";
import CardContainerCarouselMovies from "../components/cardContainerCaroselMovies";



export default function MoviesHomePage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function loadMovies() {
      const data = await getMovies();
      setMovies(data);
    }

    loadMovies();
  }, []);

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  function handleListAll() {
  navigate("/movies/listAll");
}

  return (
    <div className="min-h-screen text-white bg-black">
      <div className="w-full max-w-6xl px-4 py-6 mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Private Area</h1>
          <p className="text-zinc-400">
            Logged as: <span className="text-white">{user?.email ?? "Unknown"}</span>
          </p>

          <button
            onClick={handleLogout}
            className="px-4 py-2 transition rounded bg-zinc-800 hover:bg-zinc-700"
          >
            Logout
          </button>
           <button
              onClick={handleListAll}
              className="px-4 py-2 transition rounded bg-zinc-800 hover:bg-zinc-700"
            >
              Listar todos
          </button>
        </div>
        <CardContainerCarouselMovies title="Lançamentos" movies={movies} />        
      </div>
    </div>
  );
}