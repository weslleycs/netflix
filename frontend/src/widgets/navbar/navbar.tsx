import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { FaUserCircle } from 'react-icons/fa'

import { useDebounce } from '@/shared/hooks/useDebounce'
import { getAllGenres } from '@/entities/genre/api/genres'
import type { Genres } from '@/entities/genre/model/genres'

export default function Navbar() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 400)

  const { data: genres = [] } = useQuery<Genres[]>({
    queryKey: ['genres'],
    queryFn: getAllGenres,
  })

  function handleGenreChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value
    setSearch('')

    if (value === 'listAll') {
      navigate('/movies/list')
    } else if (value) {
      navigate(`/movies/list?genre=${value}`)
    }else if (value === 'listAllSeries') {
      navigate('/series/list')
    }else if (value === 'listt') {
      navigate(`/movies/list?genre=${value}`)
    }
  }

  useEffect(() => {
    if (debouncedSearch.trim()) {
      navigate(`/movies/list?title=${debouncedSearch}`)
    }
  }, [debouncedSearch, navigate])

  return (
    <header className="w-full">
      <div className="flex items-center justify-between max-w-6xl px-6 py-6 mx-auto">
        <NavLink
          to="/movies"
          className="text-2xl font-extrabold tracking-wide text-red-600"
        >
          WESLLEYFLIX
        </NavLink>

        <div className="flex gap-3">
          <select
            onChange={handleGenreChange}
            className="px-4 py-2 text-white border rounded-md bg-zinc-900 border-white/20 focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <option value="">Movies</option>
            <option value="listAll">All movies</option>

            {genres.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
          <select
            onChange={handleGenreChange}
            className="px-4 py-2 text-white border rounded-md bg-zinc-900 border-white/20 focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <option value="">Series</option>
            <option value="listAllSeries">All Series</option>

            {genres.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-48 px-4 py-2 text-sm text-white border rounded-md bg-zinc-900 border-white/20 focus:outline-none focus:ring-2 focus:ring-red-600 placeholder:text-white/50"
          />

          <NavLink
            to="/profile"
            className="flex items-center text-[2rem] text-white/60 hover:text-white"
          >
            <FaUserCircle />
          </NavLink>
        </div>
      </div>
    </header>
  )
}