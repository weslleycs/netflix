import { NavLink } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

export default function LoginPage() {
  const { register, errors, onSubmit, isPending, isError } = useLogin();

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <Card>
        <h1 className="text-4xl font-extrabold tracking-tight">LOGIN</h1>
        <p className="mt-2 text-white/60">Enter your credentials to continue.</p>

        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <div>
            <label className="text-sm text-white/70">Email</label>
            <Input
              type="email"
              placeholder="you@email.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-white/70">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {isError && (
            <p className="text-sm text-red-500">
              Login failed. Check your credentials.
            </p>
          )}

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="flex items-center justify-between mt-6 text-sm text-white/60">
          <span>
            New here?{" "}
            <NavLink className="font-semibold text-red-500 hover:underline" to="/register">
              Create an account
            </NavLink>
          </span>

          <NavLink className="font-semibold text-red-500 hover:underline" to="/forgot-password">
            Forgot password?
          </NavLink>
        </div>
      </Card>
    </div>
  );
}