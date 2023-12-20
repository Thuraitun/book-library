import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/layouts/Layout.jsx";
import Home from '../pages/Home.jsx'
import BookForm from "../pages/BookForm.jsx";
import Search from "../pages/Search.jsx";
import BookDetail from "../pages/BookDetail.jsx";
import NotFound from "../pages/NotFound.jsx";
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
            path: "",
            element: <Home />,
        },
        {
            path: "/create",
            element: <BookForm />,
        },
        {
          path: "/edit/:id",
          element: <BookForm />,
        },
        {
            path: "/search",
            element: <Search />,
        },
        {
          path: "/books/:id",
          element: <BookDetail />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ]
    },
  ]);

export default router;