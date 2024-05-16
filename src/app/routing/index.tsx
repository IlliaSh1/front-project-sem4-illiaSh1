import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import {
  BOOKS_ROUTE,
  FAVORITE_BOOKS_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  FEEDBACK_ROUTE,
  USERS_ROUTE,
  PDF_ROUTE,
  UNIVERSITIES_D_PAGINATION,
} from "./config";

import Books from "../../pages/books";
import Login from "../../pages/users/login";
import AllUsers from "../../pages/users";

import AuthRoute from "./routes/authRoute";
import AdminRoute from "./routes/adminRoute";
import FavoriteBooks from "../../pages/books/favorite_books";
import Home from "../../pages/home";
import Feedbacks from "../../pages/feedback";
// import MyDocument from '../../pages/pdf';
// import PDFDownloadLink from '../../pages/pdf';
import PdfPage from "../../pages/pdf";
import UniversitiesPage from "../../pages/universities";

const MainRouter = () => {
  const basePaths: RouteObject[] = [
    { path: HOME_ROUTE, element: <Home /> },
    { path: BOOKS_ROUTE, element: <Books /> },
    { path: FEEDBACK_ROUTE, element: <Feedbacks /> },
    { path: LOGIN_ROUTE, element: <Login /> },
    { path: PDF_ROUTE, element: <PdfPage /> },
    { path: UNIVERSITIES_D_PAGINATION, element: <UniversitiesPage /> },
    { path: "*", element: <Navigate to={"/"} replace /> },
  ];

  const authPaths: RouteObject[] = [
    {
      path: "/",
      element: <AuthRoute />,
      children: [
        { path: FAVORITE_BOOKS_ROUTE, element: <FavoriteBooks /> },
        { path: FEEDBACK_ROUTE, element: <Feedbacks /> },
      ],
    },
  ];

  const adminPaths: RouteObject[] = [
    {
      path: "/",
      element: <AdminRoute />,
      children: [{ path: USERS_ROUTE, element: <AllUsers /> }],
    },
  ];

  const resultPaths: RouteObject[] = basePaths;
  resultPaths.push(...authPaths);
  resultPaths.push(...adminPaths);

  return useRoutes(resultPaths);
};

export default MainRouter;
