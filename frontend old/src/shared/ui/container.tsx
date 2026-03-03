import type { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-6xl px-6 mx-auto">
      {children}
    </div>
  );
}