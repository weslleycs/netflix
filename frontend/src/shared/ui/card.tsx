import type { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="w-full p-6 border rounded-2xl border-white/10 bg-white/5 backdrop-blur">
      {children}
    </div>
  );
}