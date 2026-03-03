import { Navigate } from "react-router-dom";
import LandingPage from "@/features/public/landing/page/landingPage";
import LoginPage from "@/features/auth/login/page/loginPage";
import RegisterPage from "@/features/auth/register/page/registerPage";
import MoviesHomePage from "@/features/movies/home/page/moviesHomePage";
import PublicLayout from "../layout/publicLayout";
import MoviesListPage from "@/features/movies/home/page/listMoviesPage";
import PrivateLayout from "../layout/privateLayout";


export const routes = [
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
  {
    element: <PrivateLayout />,
    children: [
      { path: "/home", element: <MoviesHomePage /> },
      { path: "/listmovies", element: <MoviesListPage /> },
      { path: "*", element: <Navigate to="/home" replace /> },
    ],
  },
];