import type { ReactNode } from 'react';

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen text-white bg-black">
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,rgba(229,9,20,0.25),transparent_55%)]">
        <div className="min-h-screen bg-black/60">
          <div className="flex items-center w-full max-w-md min-h-screen px-4 mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
