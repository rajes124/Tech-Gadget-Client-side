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
import DashboardHome from "./Pages/dashboard/DashboardHome.jsx";

// Admin Pages (path ঠিক করা হয়েছে – তোমার project structure অনুযায়ী)
import ManageUsers from "./Pages/dashboard/admin/ManageUsers.jsx";
import ManageProducts from "./Pages/dashboard/admin/ManageProducts.jsx";
import AllOrders from "./Pages/dashboard/admin/AllOrders.jsx";

// ==================== ADMIN ROUTE COMPONENT ====================
// Admin হলে শুধু access, না হলে dashboard home-এ redirect
const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

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

          // ==================== ADMIN ONLY ROUTES ====================
          {
            element: <AdminRoute />, // শুধু admin-এর জন্য wrapper
            children: [
              { path: "admin/users", element: <ManageUsers /> },
              { path: "admin/products", element: <ManageProducts /> },
              { path: "admin/orders", element: <AllOrders /> },
            ],
          },
        ],
      },

      // ==================== OLD URL REDIRECTS (UX ভালো করার জন্য) ====================
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

      // 404 fallback
      {
        path: "*",
        element: (
          <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <h1 className="text-4xl sm:text-6xl font-black text-gray-800 dark:text-white">
              404 - Page Not Found
            </h1>
          </div>
        ),
      },
    ],
  },
]);

export default router;