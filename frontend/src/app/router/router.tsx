import { Navigate } from 'react-router-dom';
import PrivateLayout from '../layout/privateLayout';
import LoginPage from '@/pages/login';
import RegisterPage from '@/pages/register';
import LandingPage from '@/pages/landing';
import PublicLayout from '../layout/publicLayout';
import MoviesHomePage from '@/pages/movies-home';
import MoviesListPage from '@/pages/movies-list';
import MovieDetailsPage from '@/pages/movie-detail';

export const routes = [
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
  {
    path: '/movies',
    element: <PrivateLayout />,
    children: [
      { index: true, element: <MoviesHomePage /> },
      { path: 'list', element: <MoviesListPage /> },
      { path: 'details', element: <MovieDetailsPage /> }
      //{ path: '*', element: <Navigate to="/" replace /> },
    ],
  },
];
