import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { 
  HiMenu, HiX, HiHome, HiUser, HiLogout, HiPlusCircle, 
  HiUpload, HiDownload, HiUsers, HiCube, HiDocumentText  // HiPackage remove, HiCube add
} from 'react-icons/hi';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user?.name || user?.email?.split("@")[0] || "User";
  const userPhoto = user?.photoURL || "https://via.placeholder.com/40";
  const userRole = user?.role || "user";

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const baseMenuItems = [
    { name: 'Dashboard Home', icon: <HiHome className="text-xl" />, path: '/dashboard' },
    { name: 'Add Export', icon: <HiPlusCircle className="text-xl" />, path: '/dashboard/add-export' },
    { name: 'My Exports', icon: <HiUpload className="text-xl" />, path: '/dashboard/exports' },
    { name: 'My Imports', icon: <HiDownload className="text-xl" />, path: '/dashboard/imports' },
    { name: 'Profile', icon: <HiUser className="text-xl" />, path: '/dashboard/profile' },
  ];

  const adminMenuItems = [
    { name: 'Manage Users', icon: <HiUsers className="text-xl" />, path: '/dashboard/admin/users' },
    { name: 'Manage Products', icon: <HiCube className="text-xl" />, path: '/dashboard/admin/products' }, // FIXED: HiPackage → HiCube
    { name: 'All Orders/Inquiries', icon: <HiDocumentText className="text-xl" />, path: '/dashboard/admin/orders' },
  ];

  const menuItems = userRole === 'admin' ? [...baseMenuItems, ...adminMenuItems] : baseMenuItems;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      {/* Top Navbar */}
      <header className="bg-white dark:bg-gray-800 shadow-lg fixed top-0 left-0 right-0 z-30">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-600 dark:text-gray-300 focus:outline-none lg:hidden"
            >
              {sidebarOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
              Export-Import Dashboard
            </h1>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 text-gray-700 dark:text-gray-200 focus:outline-none"
            >
              <img
                src={userPhoto}
                alt="Profile"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full ring-2 ring-blue-500"
              />
              <span className="hidden sm:block font-medium">{userName}</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl py-3 border border-gray-200 dark:border-gray-700">
                <Link to="/dashboard" className="flex items-center gap-3 px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition" onClick={() => setDropdownOpen(false)}>
                  <HiHome className="text-lg" /> Dashboard Home
                </Link>
                <Link to="/dashboard/profile" className="flex items-center gap-3 px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition" onClick={() => setDropdownOpen(false)}>
                  <HiUser className="text-lg" /> Profile
                </Link>

                {userRole === 'admin' && (
                  <>
                    <hr className="my-2 border-gray-200 dark:border-gray-700" />
                    <Link to="/dashboard/admin/users" className="flex items-center gap-3 px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition" onClick={() => setDropdownOpen(false)}>
                      <HiUsers className="text-lg" /> Manage Users
                    </Link>
                  </>
                )}

                <hr className="my-2 border-gray-200 dark:border-gray-700" />
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-6 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition text-left">
                  <HiLogout className="text-lg" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-20 w-64 bg-white dark:bg-gray-800 shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} pt-16 lg:pt-0 border-r border-gray-200 dark:border-gray-700`}>
          <nav className="mt-6 px-4">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-4 px-6 py-4 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl mx-2 transition"
              >
                {item.icon}
                <span className="font-medium text-lg">{item.name}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-10 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
};

export default DashboardLayout;