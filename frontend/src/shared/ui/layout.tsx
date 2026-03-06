import type { ReactNode } from 'react';

export function Layout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen text-white bg-black">{children}</div>;
}
