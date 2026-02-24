import { NavLink } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";

export default function LoginPage() {
  const { register, errors, onSubmit, isPending, isError } = useLogin();

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white border shadow-sm border-zinc-200 rounded-2xl">
        <h1 className="text-3xl font-extrabold">Login</h1>
        <p className="mt-1 text-zinc-600">Enter your credentials to continue.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-zinc-700">Email</label>
            <Input
              type="email"
              placeholder="you@email.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-zinc-700">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          {isError && (
            <p className="text-sm text-red-600">
              Login failed. Check your credentials.
            </p>
          )}

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Signing in..." : "Login"}
          </Button>
        </form>

        <p className="mt-4 text-sm text-zinc-600">
          New here?{" "}
          <NavLink className="font-semibold text-red-600" to="/register">
            Create an account
          </NavLink>
        </p>
      </div>
    </div>
  );
}