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
    <div className="space-y-4 text-white">
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
    </div>
  );
}