export default function LandingPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
          Unlimited movies, series and more.
          <span className="text-red-600"> Netflix vibe.</span>
        </h1>

        <p className="mt-4 text-lg text-white/70">
          Watch anywhere. Cancel anytime.
        </p>

        <div className="mt-8">
          <a
            href="/register"
            className="inline-flex items-center justify-center px-6 py-3 font-semibold transition bg-red-600 rounded hover:bg-red-700"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
}
