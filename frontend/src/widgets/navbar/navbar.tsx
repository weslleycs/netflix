import { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { FaUserCircle } from 'react-icons/fa'

import { useDebounce } from '@/shared/hooks/useDebounce'
import { getAllGenres } from '@/entities/genre/api/genres'
import type { Genres } from '@/entities/genre/model/genres'

const ALL_MOVIES = '__all_movies__'
const ALL_SERIES = '__all_series__'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 400)

  const { data: genres = [] } = useQuery<Genres[]>({
    queryKey: ['genres'],
    queryFn: getAllGenres,
  })

  function handleMovieGenre(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value
    setSearch('')
    if (!value) return
    if (value === ALL_MOVIES) navigate('/movies/list')
    else navigate(`/movies/list?genre=${encodeURIComponent(value)}`)
    e.target.selectedIndex = 0
  }

  function handleSerieGenre(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value
    setSearch('')
    if (!value) return
    if (value === ALL_SERIES) navigate('/series/list')
    else navigate(`/series/list?genre=${encodeURIComponent(value)}`)
    e.target.selectedIndex = 0
  }

  useEffect(() => {
    const term = debouncedSearch.trim()
    if (!term) return
    const target = location.pathname.startsWith('/series') ? '/series/list' : '/movies/list'
    navigate(`${target}?title=${encodeURIComponent(term)}`)
  }, [debouncedSearch, location.pathname, navigate])

  return (
    <header className="sticky top-0 z-20 w-full border-b backdrop-blur-md border-white/5 bg-black/70">
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 mx-auto max-w-6xl">
        <div className="flex items-center gap-6">
          <NavLink
            to="/movies"
            className="text-2xl font-extrabold tracking-wide text-red-600"
          >
            WESLLEYFLIX
          </NavLink>
          <nav className="hidden gap-4 text-sm text-white/70 md:flex">
            <NavLink to="/movies" className={({ isActive }) => (isActive ? 'text-white' : 'hover:text-white')} end>
              Movies
            </NavLink>
            <NavLink to="/series" className={({ isActive }) => (isActive ? 'text-white' : 'hover:text-white')} end>
              Series
            </NavLink>
            <NavLink to="/movies/register" className={({ isActive }) => (isActive ? 'text-white' : 'hover:text-white')}>
              + Movie
            </NavLink>
            <NavLink to="/series/register" className={({ isActive }) => (isActive ? 'text-white' : 'hover:text-white')}>
              + Serie
            </NavLink>
            <NavLink to="/genres/register" className={({ isActive }) => (isActive ? 'text-white' : 'hover:text-white')}>
              + Genre
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <select
            onChange={handleMovieGenre}
            defaultValue=""
            className="px-3 py-2 text-sm text-white border rounded-md bg-zinc-900 border-white/20 focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <option value="" disabled>
              Movie genres
            </option>
            <option value={ALL_MOVIES}>All movies</option>
            {genres.map((g) => (
              <option key={`m-${g.id}`} value={g.name}>
                {g.name}
              </option>
            ))}
          </select>

          <select
            onChange={handleSerieGenre}
            defaultValue=""
            className="px-3 py-2 text-sm text-white border rounded-md bg-zinc-900 border-white/20 focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <option value="" disabled>
              Serie genres
            </option>
            <option value={ALL_SERIES}>All series</option>
            {genres.map((g) => (
              <option key={`s-${g.id}`} value={g.name}>
                {g.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-48 px-3 py-2 text-sm text-white border rounded-md bg-zinc-900 border-white/20 focus:outline-none focus:ring-2 focus:ring-red-600 placeholder:text-white/50"
          />

          <NavLink
            to="/profile"
            aria-label="Profile"
            className="flex items-center text-[1.75rem] text-white/60 hover:text-white"
          >
            <FaUserCircle />
          </NavLink>
        </div>
      </div>
    </header>
  )
}
