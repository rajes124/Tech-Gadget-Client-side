import React from 'react';
import { Link } from 'react-router-dom';
import { HiHome, HiPlusCircle, HiUpload, HiDownload } from 'react-icons/hi';

const DashboardHome = () => {
  return (
    <div className="space-y-10 sm:space-y-16">
      {/* Welcome Section */}
      <div className="text-center py-8 sm:py-12">
        <h1 className="text-3xl sm:text-5xl font-black text-gray-800 dark:text-white mb-4">
          Welcome Back, {JSON.parse(localStorage.getItem("user") || "{}")?.name?.split(" ")[0] || "User"}! 👋
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4">
          Manage your export-import business efficiently from one central dashboard
        </p>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto px-4">
        <Link
          to="/dashboard/add-export"
          className="group bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transform hover:-translate-y-3 transition-all duration-500"
        >
          <HiPlusCircle className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 group-hover:scale-110 transition" />
          <h3 className="text-2xl font-bold text-center">Add New Export</h3>
          <p className="text-center mt-3 opacity-90 text-sm sm:text-base">List a new product for export</p>
        </Link>

        <Link
          to="/dashboard/exports"
          className="group bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transform hover:-translate-y-3 transition-all duration-500"
        >
          <HiUpload className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 group-hover:scale-110 transition" />
          <h3 className="text-2xl font-bold text-center">My Exports</h3>
          <p className="text-center mt-3 opacity-90 text-sm sm:text-base">View and manage exported products</p>
        </Link>

        <Link
          to="/dashboard/imports"
          className="group bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transform hover:-translate-y-3 transition-all duration-500"
        >
          <HiDownload className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 group-hover:scale-110 transition" />
          <h3 className="text-2xl font-bold text-center">My Imports</h3>
          <p className="text-center mt-3 opacity-90 text-sm sm:text-base">Track all imported items</p>
        </Link>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-xl">
          <h4 className="text-3xl sm:text-4xl font-black text-blue-600">24</h4>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base">Total Exports</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-xl">
          <h4 className="text-3xl sm:text-4xl font-black text-green-600">18</h4>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base">Total Imports</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-xl">
          <h4 className="text-3xl sm:text-4xl font-black text-purple-600">156</h4>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base">Available Items</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-xl">
          <h4 className="text-3xl sm:text-4xl font-black text-orange-600">+32%</h4>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base">Monthly Growth</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;