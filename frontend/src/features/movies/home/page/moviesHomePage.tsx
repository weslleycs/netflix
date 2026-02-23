import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/auth.store";

export default function MoviesHomePage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="text-white space-y-4">
      <h1 className="text-3xl font-bold">Private Area</h1>
      <p className="text-zinc-400">
        Logged as: <span className="text-white">{user?.email ?? "Unknown"}</span>
      </p>

      <button
        onClick={handleLogout}
        className="bg-zinc-800 px-4 py-2 rounded hover:bg-zinc-700 transition"
      >
        Logout
      </button>
    </div>
  );
}