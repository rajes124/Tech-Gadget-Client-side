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

// ✅ নতুন ইমপোর্ট – Dashboard Layout & Home
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import DashboardHome from "./Pages/DashboardHome.jsx"; // তুমি যেখানে রেখেছ সেখান থেকে import করো

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/all-products", element: <AllProducts /> },

      // Product Details (publicly accessible as per assignment)
      {
        path: "/product/:id",
        element: <ProductDetails />, // publicly accessible করলাম (assignment-এ বলা আছে)
      },

      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },

      // Terms & Privacy (public)
      { path: "/terms", element: <Terms /> },
      { path: "/privacy", element: <Privacy /> },

      // ✅ Dashboard – সব প্রাইভেট পেজ এখানে nested
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

      // ✅ পুরানো URL গুলো থেকে auto redirect (UX ভালো হবে)
      // কেউ যদি পুরানো লিঙ্কে যায়, সে dashboard-এ চলে যাবে
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