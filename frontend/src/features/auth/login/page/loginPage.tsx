import { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { login } from "../../api/auth";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const token = useAuthStore((s) => s.token);
  const setAuth = useAuthStore((s) => s.setAuth);

  useEffect(() => {
    if (token) navigate("/app", { replace: true });
  }, [token, navigate]);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAuth({ token: data.token, user: data.user });
      navigate("/app", { replace: true });
    },
  });

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
        <h1 className="text-3xl font-extrabold">Login</h1>
        <p className="text-zinc-600 mt-1">Enter your credentials to continue.</p>

        <form onSubmit={handleSubmit((v) => mutation.mutate(v))} className="space-y-4 mt-6">
          <div>
            <label className="text-sm text-zinc-700">Email</label>
            <input
              className="mt-1 w-full px-3 py-2 rounded border border-zinc-300 outline-none focus:border-red-600"
              placeholder="you@email.com"
              {...register("email")}
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="text-sm text-zinc-700">Password</label>
            <input
              type="password"
              className="mt-1 w-full px-3 py-2 rounded border border-zinc-300 outline-none focus:border-red-600"
              placeholder="••••••••"
              {...register("password")}
            />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {mutation.isError && (
            <p className="text-red-600 text-sm">Login failed. Check your credentials.</p>
          )}

          <button
            disabled={mutation.isPending}
            className="w-full bg-red-600 text-white py-2 rounded font-semibold hover:bg-red-700 transition disabled:opacity-60"
          >
            {mutation.isPending ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-zinc-600 mt-4">
          New here?{" "}
          <NavLink className="text-red-600 font-semibold" to="/register">
            Create an account
          </NavLink>
        </p>
      </div>
    </div>
  );
}