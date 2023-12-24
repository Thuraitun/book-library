import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "../pages/layouts/Layout.jsx";
import Home from '../pages/Home.jsx'
import BookForm from "../pages/BookForm.jsx";
import Search from "../pages/Search.jsx";
import BookDetail from "../pages/BookDetail.jsx";
import NotFound from "../pages/NotFound.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
  
  

const index = () => {

  const { authReady, user } = useContext(AuthContext)

  const isAuthenticated = Boolean(user)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
            path: "",
            element: isAuthenticated ? <Home /> : <Navigate to="/login" />
        },
        {
            path: "/create",
            element: isAuthenticated ? <BookForm /> : <Navigate to="/login" />
        },
        {
          path: "/edit/:id",
          element: isAuthenticated ? <BookForm /> : <Navigate to="/login" />
        },
        {
            path: "/search",
            element: isAuthenticated ? <Search /> : <Navigate to="/login" />
        },
        {
          path: "/books/:id",
          element: isAuthenticated ? <BookDetail /> : <Navigate to="/login" />
        },
        {
          path: "/register",
          element: !isAuthenticated ? <Register /> : <Navigate to="/" />
        },
        {
          path: "/login",
          element: !isAuthenticated ? <Login /> : <Navigate to="/" />
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ]
    },
  ]);

  return (
    authReady && <RouterProvider router={router} />
  );
}

export default index;
