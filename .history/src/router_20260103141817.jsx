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
import Profile from "./Pages/Profile.jsx";
import Terms from "./Pages/Terms.jsx";
import Privacy from "./Pages/Privacy.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

// ✅ নতুন ইমপোর্ট
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import DashboardHome from "./Pages/DashboardHome.jsx"; // তুমি যেখানে রেখেছ সেখান থেকে

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

      // ✅ Terms & Privacy (public)
      { path: "/terms", element: <Terms /> },
      { path: "/privacy", element: <Privacy /> },

      // ✅ Dashboard with Layout + Nested Private Routes
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          { index: true, element: <DashboardHome /> }, // /dashboard → Overview
          { path: "exports", element: <MyExports /> },
          { path: "imports", element: <MyImports /> },
          { path: "add-export", element: <AddExport /> },
          { path: "profile", element: <Profile /> },
        ],
      },

      // ✅ পুরানো standalone private routes রাখলাম (optional redirect-এর জন্য)
      // যদি কেউ পুরানো URL-এ যায়, তাহলে dashboard-এ redirect করতে পারো (নিচে দেখো)
      {
        path: "/my-exports",
        element: <PrivateRoute redirectTo="/dashboard/exports" />,
      },
      {
        path: "/my-imports",
        element: <PrivateRoute redirectTo="/dashboard/imports" />,
      },
      {
        path: "/add-export",
        element: <PrivateRoute redirectTo="/dashboard/add-export" />,
      },
      {
        path: "/profile",
        element: <PrivateRoute redirectTo="/dashboard/profile" />,
      },
    ],
  },
]);

export default router;