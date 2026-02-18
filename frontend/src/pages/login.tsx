import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-zinc-900 p-6 rounded-xl space-y-4">
        <h1 className="text-2xl font-bold">Login</h1>

        <input
          className="w-full p-3 rounded bg-zinc-800 outline-none"
          placeholder="Email"
        />
        <input
          className="w-full p-3 rounded bg-zinc-800 outline-none"
          placeholder="Senha"
          type="password"
        />

        <button className="w-full p-3 rounded bg-red-600 font-semibold">
          Entrar
        </button>

        <p className="text-sm text-zinc-300">
          Não tem conta?{" "}
          <Link to="/register" className="underline text-white">
            Criar agora
          </Link>
        </p>
      </div>
    </div>
  );
}
