import { NavLink } from "react-router-dom";

export default function LandingPage() {
  return (
    <section className="py-10">
      <div className="max-w-3xl">
        <h1 className="text-5xl font-extrabold leading-tight">
          Unlimited movies, series and more.
        </h1>

        <p className="text-zinc-600 mt-4 text-lg">
          Watch anywhere. Cancel anytime.
        </p>

        <div className="mt-8 flex gap-3">
          <NavLink
            to="/login"
            className="bg-red-600 text-white hover:bg-red-700 transition px-6 py-3 rounded font-semibold"
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            className="border border-zinc-300 hover:bg-zinc-50 transition px-6 py-3 rounded font-semibold"
          >
            Register
          </NavLink>
        </div>
      </div>
    </section>
  );
}