import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Home from "./Pages/Home.jsx";
import AllProducts from "./Pages/AllProducts.jsx";
import ProductDetails from "./Pages/ProductDetails.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import MyExports from "./Pages/MyExports.jsx";
import MyImports from "./Pages/MyImports.jsx";
import AddExport from "./Pages/AddExport.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/all-products", element: <AllProducts /> },
      {
        path: "/product/:id",
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/my-exports",
        element: (
          <PrivateRoute>
            <MyExports />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-imports",
        element: (
          <PrivateRoute>
            <MyImports />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-export",
        element: (
          <PrivateRoute>
            <AddExport />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
