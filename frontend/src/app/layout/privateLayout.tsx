import { useAuthStore } from "@/features/auth/store/auth.store";
import { GENRES } from "@/features/movies/schema/genre";
import { useEffect, useState} from "react";
import { FaUserCircle } from "react-icons/fa";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";

export default function PrivateLayout(){
  const navigate = useNavigate()
  const token = useAuthStore((s) => s.token);
  const [search, setSearch] = useState("");
  const [selectValue, setSelectValue] = useState("");
  if (!token) return <Navigate to="/login" replace />;

  useEffect(() => {
    if(selectValue === "listAll"){
      navigate(`list`)
    }else if (selectValue){
      navigate(`list?genre=${selectValue}`)
    }
    setSearch("")
  },[selectValue])

  useEffect(() => {
    if(search){
      navigate(`list?title=${search}`)
    }
    setSelectValue("")
  },[search])
  
  return (
    <div className="min-h-screen text-white bg-black">
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,rgba(229,9,20,0.22),transparent_60%)]">
        <div className="min-h-screen bg-black/60">
          <header className="w-full">
            <div className="flex items-center justify-between max-w-6xl px-6 py-6 mx-auto">
              <NavLink to="/" className="text-2xl font-extrabold tracking-wide text-red-600">
                WESLLEYFLIX
              </NavLink>

              <div className="flex gap-3">
                <nav>
                 <select
                    id="nav-select"
                    onChange={(e)=>setSelectValue(e.target.value)}
                    value={"selectValue"}
                    className="px-4 py-2 text-white border rounded-md bg-zinc-900 border-white/20 focus:outline-none focus:ring-2 focus:ring-red-600"
                  >
                    <option value="">Movies</option>
                    <option value="listAll">Todos os filmes</option>
                    {GENRES.map((genre) => (
                      <option  value={`${genre.value}`}>
                        {genre.label}
                      </option>
                    ))}
                </select>
                </nav>
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-48 px-4 py-2 pr-10 text-sm text-white border rounded-md bg-zinc-900 border-white/20 focus:outline-none focus:ring-2 focus:ring-red-600 placeholder:text-white/50"
                />
                <button
                  type="button"
                  className="flex items-center pr-3 text-[2rem] text-white/60 hover:text-white"
                >
                  <FaUserCircle/>
                </button>
              </div>
            </div>
          </header>
          <main>
            <div className="max-w-6xl px-6 mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>

  )
}

