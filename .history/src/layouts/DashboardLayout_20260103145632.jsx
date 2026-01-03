import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { HiMenu, HiX, HiHome, HiUser, HiLogout, HiChartPie, HiTable } from 'react-icons/hi'; // তোমার প্রজেক্ট অনুযায়ী icons change করতে পারো

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // তোমার existing logout logic এখানে দাও (localStorage.clear() বা firebase signOut ইত্যাদি)
    // উদাহরণ:
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Sidebar menu items (single role হলে minimum 2, admin থাকলে more add করো)
  const menuItems = [
    { name: 'Dashboard Home', icon: <HiHome className="text-xl" />, path: '/dashboard' },
    { name: 'Profile', icon: <HiUser className="text-xl" />, path: '/dashboard/profile' },
    // Add more if admin: { name: 'Manage Users', icon: <HiTable />, path: '/dashboard/users' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Top Navbar */}
      <div className="bg-white dark:bg-gray-800 shadow-md fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-600 dark:text-gray-300 focus:outline-none lg:hidden"
            >
              {sidebarOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
            </button>
            <h1 className="ml-4 text-xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-3 text-gray-700 dark:text-gray-200 focus:outline-none"
            >
              <img
                src="https://via.placeholder.com/40" // তোমার user photo বা default avatar
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <span>User Name</span> {/* তোমার dynamic user name দাও */}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2">
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setDropdownOpen(false)}
                >
                  Dashboard Home
                </Link>
                <Link
                  to="/dashboard/profile"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex pt-16"> {/* pt-16 for top navbar space */}
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-20 bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 w-64 pt-16 lg:pt-0`}
        >
          <nav className="mt-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:ml-64">
          <Outlet /> {/* এখানে DashboardHome, Profile ইত্যাদি pages render হবে */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;