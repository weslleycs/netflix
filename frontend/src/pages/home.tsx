import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-red-500">
          Projeto Netflix
        </h1>

        <Link
          to="/login"
          className="inline-block px-6 py-3 bg-red-600 rounded font-semibold"
        >
          Ir para Login
        </Link>
      </div>
    </div>
  );
}
