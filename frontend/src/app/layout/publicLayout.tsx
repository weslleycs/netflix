import PublicNavbar from "@/widgets/navbar/publicNavbar";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="min-h-screen text-white bg-black">
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,rgba(229,9,20,0.22),transparent_60%)]">
        <div className="min-h-screen bg-black/60">
          <PublicNavbar />
          <main>
            <div className="max-w-6xl px-6 mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
