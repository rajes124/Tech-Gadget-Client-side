import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { HiMenu, HiX, HiHome, HiUser, HiLogout, HiPlusCircle, HiUpload, HiDownload } from 'react-icons/hi';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user?.name || user?.email?.split("@")[0] || "User";
  const userPhoto = user?.photoURL || "https://via.placeholder.com/40";

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Sidebar Menu Items – অ্যাসাইনমেন্টে single role, minimum 2 menu
 // ... অন্যান্য import same থাকবে

const menuItems = [
  { name: 'Dashboard Home', icon: <HiHome className="text-xl" />, path: '/dashboard' },
  { name: 'Add Export', icon: <HiPlusCircle className="text-xl" />, path: '/dashboard/add-export' },
  { name: 'My Exports', icon: <HiUpload className="text-xl" />, path: '/dashboard/exports' },
  { name: 'My Imports', icon: <HiDownload className="text-xl" />, path: '/dashboard/imports' },
  { name: 'Profile', icon: <HiUser className="text-xl" />, path: '/dashboard/profile' },
];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Top Navbar */}
      <div className="bg-white dark:bg-gray-800 shadow-lg fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-600 dark:text-gray-300 focus:outline-none lg:hidden"
            >
              {sidebarOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
            </button>
            <h1 className="ml-4 text-2xl font-bold text-gray-800 dark:text-white">Export-Import Dashboard</h1>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-3 text-gray-700 dark:text-gray-200 focus:outline-none"
            >
              <img
                src={userPhoto}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-blue-500"
              />
              <span className="font-medium">{userName}</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl py-3 border border-gray-200 dark:border-gray-700">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-3 px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  onClick={() => setDropdownOpen(false)}
                >
                  <HiHome className="text-lg" />
                  Dashboard Home
                </Link>
                <Link
                  to="/dashboard/profile"
                  className="flex items-center gap-3 px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  onClick={() => setDropdownOpen(false)}
                >
                  <HiUser className="text-lg" />
                  Profile
                </Link>
                <hr className="my-2 border-gray-200 dark:border-gray-700" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-6 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition"
                >
                  <HiLogout className="text-lg" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-20 bg-white dark:bg-gray-800 shadow-xl transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 w-64 pt-16 lg:pt-0 border-r border-gray-200 dark:border-gray-700`}
        >
          <nav className="mt-6">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center gap-4 px-6 py-4 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
          <Outlet /> {/* এখানে DashboardHome, AddExport, MyExports, MyImports, Profile render হবে */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;