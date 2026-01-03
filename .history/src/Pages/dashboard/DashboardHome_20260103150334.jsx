import React from 'react';
import { Link } from 'react-router-dom';
import { HiHome, HiPlusCircle, HiUpload, HiDownload, HiUser } from 'react-icons/hi';

const DashboardHome = () => {
  return (
    <div className="space-y-12">
      {/* Welcome Section */}
      <div className="text-center py-10">
        <h1 className="text-5xl font-black text-gray-800 dark:text-white mb-4">
          Welcome to Your Dashboard 👋
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Manage your export-import business efficiently from one central place
        </p>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {/* Add Export */}
        <Link
          to="/add-export"  // তোমার existing route
          className="group bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transform hover:-translate-y-3 transition-all duration-500"
        >
          <HiPlusCircle className="w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition" />
          <h3 className="text-2xl font-bold text-center">Add New Export</h3>
          <p className="text-center mt-3 opacity-90">List a new product for global export</p>
        </Link>

        {/* My Exports */}
        <Link
          to="/my-exports"  // তোমার existing route
          className="group bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transform hover:-translate-y-3 transition-all duration-500"
        >
          <HiUpload className="w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition" />
          <h3 className="text-2xl font-bold text-center">My Exports</h3>
          <p className="text-center mt-3 opacity-90">View and manage your exported products</p>
        </Link>

        {/* My Imports */}
        <Link
          to="/my-imports"  // তোমার existing route
          className="group bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transform hover:-translate-y-3 transition-all duration-500"
        >
          <HiDownload className="w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition" />
          <h3 className="text-2xl font-bold text-center">My Imports</h3>
          <p className="text-center mt-3 opacity-90">Track all your imported items</p>
        </Link>
      </div>

      {/* Stats (Optional – fake data) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mt-16">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-xl">
          <h4 className="text-4xl font-black text-blue-600">24</h4>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Total Exports</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-xl">
          <h4 className="text-4xl font-black text-green-600">18</h4>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Total Imports</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-xl">
          <h4 className="text-4xl font-black text-purple-600">156</h4>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Available Items</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-xl">
          <h4 className="text-4xl font-black text-orange-600">+32%</h4>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Growth</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;