import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FiHome, 
  FiPackage, 
  FiShoppingCart, 
  FiPlusCircle, 
  FiUser, 
  FiLogOut,
  FiMenu,
  FiX
} from "react-icons/fi";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";

const DashboardLayout = () => {
  const { theme } = useOutletContext(); // dark mode (যদি App.jsx থেকে পাস করো)
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const isAdmin = user.email === "admin@techgadget.com"; // চাইলে change করো

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const menuItems = [
    { to: "/dashboard", label: "Overview", icon: FiHome },
    { to: "/dashboard/exports", label: "My Exports", icon: FiPackage },
    { to: "/dashboard/imports", label: "My Imports", icon: FiShoppingCart },
    { to: "/dashboard/add-export", label: "Add Export", icon: FiPlusCircle },
    { to: "/dashboard/profile", label: "Profile", icon: FiUser },
  ];

  if (isAdmin) {
    menuItems.splice(1, 0, { to: "/dashboard/admin", label: "Admin Panel", icon: FiUser });
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-r border-gray-200 dark:border-gray-700 shadow-2xl flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text">
            Dashboard
          </h2>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <FiX className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <FiLogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar – User Info Professional Card */}
      {/* Top Bar */}
<header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 px-6 py-5 flex items-center justify-between sticky top-0 z-10">
  <button
    onClick={() => setSidebarOpen(true)}
    className="lg:hidden text-2xl text-gray-700 dark:text-gray-300"
  >
    <FiMenu />
  </button>

  {/* User Info Card – navbar-এর সাথে perfect মিল */}
  <div className="flex items-center gap-5 bg-gray-100/60 dark:bg-gray-700/60 backdrop-blur-md rounded-3xl px-8 py-4 shadow-2xl border border-gray-200 dark:border-gray-600">
    <img
      src={user.photoURL || "https://i.ibb.co/2kzH8v1/user.png"}
      alt="Profile"
      className="w-20 h-20 rounded-full ring-4 ring-blue-500/40 shadow-2xl object-cover"
    />
    <div>
      <p className="text-2xl font-bold text-gray-800 dark:text-white">
        {user.displayName || user.email?.split("@")[0] || "User"}
      </p>
      <p className="text-base font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2 mt-1">
        <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
        {isAdmin ? "Administrator" : "Registered User"}
      </p>
    </div>
  </div>
</header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;