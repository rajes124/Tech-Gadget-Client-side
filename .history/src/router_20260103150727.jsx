import { createBrowserRouter, Navigate } from "react-router-dom";
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

// Dashboard imports
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import DashboardHome from "./Pages/dashboard/DashboardHome.jsx"; // তোমার path ঠিক আছে

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/all-products", element: <AllProducts /> },
      { path: "/product/:id", element: <ProductDetails /> },

      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/terms", element: <Terms /> },
      { path: "/privacy", element: <Privacy /> },

      // ==================== DASHBOARD SECTION ====================
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          { index: true, element: <DashboardHome /> }, // /dashboard → Dashboard Home
          { path: "add-export", element: <AddExport /> },
          { path: "exports", element: <MyExports /> },
          { path: "imports", element: <MyImports /> },
          { path: "profile", element: <Profile /> },
        ],
      },

      // ==================== OLD URL REDIRECTS (UX ভালো করার জন্য) ====================
      // যদি কেউ পুরানো লিঙ্কে যায়, তাকে নতুন dashboard-এ নিয়ে যাবে
      {
        path: "/add-export",
        element: <PrivateRoute><Navigate to="/dashboard/add-export" replace /></PrivateRoute>,
      },
      {
        path: "/my-exports",
        element: <PrivateRoute><Navigate to="/dashboard/exports" replace /></PrivateRoute>,
      },
      {
        path: "/my-imports",
        element: <PrivateRoute><Navigate to="/dashboard/imports" replace /></PrivateRoute>,
      },
      {
        path: "/profile",
        element: <PrivateRoute><Navigate to="/dashboard/profile" replace /></PrivateRoute>,
      },

      // 404 fallback (optional কিন্তু ভালো)
      {
        path: "*",
        element: (
          <div className="flex items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">404 - Page Not Found</h1>
          </div>
        ),
      },
    ],
  },
]);

export default router;