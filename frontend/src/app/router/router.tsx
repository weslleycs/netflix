import { Navigate } from 'react-router-dom'

import PrivateLayout from '../layout/privateLayout'
import PublicLayout from '../layout/publicLayout'

import LandingPage from '@/pages/landing'
import LoginPage from '@/pages/login'
import RegisterPage from '@/pages/register'

import MoviesHomePage from '@/pages/movies-home'
import MoviesListPage from '@/pages/movies-list'
import MoviesRegisterPage from '@/pages/movies-register'
import MovieDetailsPage from '@/pages/movie-detail'
import MoviesEditPage from '@/pages/movie-edit'

import SeriesHomePage from '@/pages/series-home'
import SeriesListPage from '@/pages/series-list'
import SerieDetailsPage from '@/pages/serie-detail'
import SeriesRegisterPage from '@/pages/series-register'

import GenresRegisterPage from '@/pages/genres-register'
import ProfilePage from '@/pages/profile'

export const routes = [
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
  {
    path: '/movies',
    element: <PrivateLayout />,
    children: [
      { index: true, element: <MoviesHomePage /> },
      { path: 'list', element: <MoviesListPage /> },
      { path: 'register', element: <MoviesRegisterPage /> },
      { path: 'details', element: <MovieDetailsPage /> },
      { path: 'edit', element: <MoviesEditPage /> },
    ],
  },
  {
    path: '/series',
    element: <PrivateLayout />,
    children: [
      { index: true, element: <SeriesHomePage /> },
      { path: 'list', element: <SeriesListPage /> },
      { path: 'register', element: <SeriesRegisterPage /> },
      { path: 'details', element: <SerieDetailsPage /> },
    ],
  },
  {
    path: '/genres',
    element: <PrivateLayout />,
    children: [{ path: 'register', element: <GenresRegisterPage /> }],
  },
  {
    path: '/profile',
    element: <PrivateLayout />,
    children: [{ index: true, element: <ProfilePage /> }],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]
