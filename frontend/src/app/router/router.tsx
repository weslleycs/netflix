import { Navigate } from 'react-router-dom';
import PrivateLayout from '../layout/privateLayout';
import MoviesHomePage from '@/pages/movies-home/index';
import MoviesRegisterPage from '@/pages/movies-register/index';

export const routes = [
  {
    path: '/',
    element: <Navigate to="/movies" replace />,
  },
  {
    path: '/movies',
    element: <PrivateLayout />,
    children: [
      { index: true, element: <MoviesHomePage /> },
      { path: 'register', element: <MoviesRegisterPage /> },
    ],
  },
];
