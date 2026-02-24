import { Navigate } from "react-router-dom";
import LandingPage from "@/features/public/landing/page/landingPage";
import LoginPage from "@/features/auth/login/page/loginPage";
import RegisterPage from "@/features/auth/register/page/registerPage";
import ProtectedRoute from "./protectedRoute";
import MoviesHomePage from "@/features/movies/home/page/moviesHomePage";
import PublicLayout from "../layout/publicLayout";


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
    element: <ProtectedRoute />,
    children: [{ path: "/app", element: <MoviesHomePage /> }],
  },
];