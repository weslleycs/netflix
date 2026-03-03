import { Navigate } from "react-router-dom";
import LandingPage from "@/pages/landing/index";
import LoginPage from "@/pages/login/index";
import RegisterPage from "@/pages/register/index";
import MoviesHomePage from "@/pages/movies-home/index";
import MoviesListPage from "@/pages/movies-list/index";
import MoviesRegisterPage from "@/pages/movies-register/index";
import PublicLayout from "../layout/publicLayout";
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
    path: "/movies",
    element: <PrivateLayout />,
    children: [
      { index: true, element: <MoviesHomePage /> },
      { path: "list", element: <MoviesListPage /> },
      { path: "register", element: <MoviesRegisterPage /> },
    ],
  },
  // /series — futuro: mesmo padrão de /movies
  // {
  //   path: "/series",
  //   element: <PrivateLayout />,
  //   children: [
  //     { index: true, element: <SeriesHomePage /> },
  //     { path: "list", element: <SeriesListPage /> },
  //     { path: "register", element: <SeriesRegisterPage /> },
  //   ],
  // },
];
