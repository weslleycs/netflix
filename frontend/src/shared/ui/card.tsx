import type { ReactNode } from 'react';

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-md p-8 text-white border rounded-2xl border-white/10 bg-black/60 backdrop-blur">
      {children}
    </div>
  );
}
