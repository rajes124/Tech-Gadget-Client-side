import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiHome, 
  HiPlusCircle, 
  HiUpload, 
  HiDownload, 
  HiUsers, 
  HiCube,                 // Products এর জন্য (HiPackage এর বদলে)
  HiDocumentText          // Orders এর জন্য
} from 'react-icons/hi';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardHome = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = user?.role === "admin";

  const [stats, setStats] = useState({
    totalExports: 0,
    totalImports: 0,
    totalProducts: 0,
    totalUsers: 0,
    monthlyGrowth: "+32%",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      fetch("https://back-end-server-theta.vercel.app/admin/stats")
        .then(res => res.json())
        .then(data => setStats(data))
        .catch(() => setStats(prev => ({ ...prev })))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [isAdmin]);

  const categoryData = [
    { name: 'Smartphones', value: 45 },
    { name: 'Laptops', value: 25 },
    { name: 'Accessories', value: 20 },
    { name: 'Drones', value: 10 },
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  const monthlyData = [
    { month: 'Jan', exports: 45 }, { month: 'Feb', exports: 62 }, { month: 'Mar', exports: 78 },
    { month: 'Apr', exports: 85 }, { month: 'May', exports: 92 }, { month: 'Jun', exports: 110 },
  ];

  return (
    <div className="space-y-10 sm:space-y-16">
      {/* Welcome Section */}
      <div className="text-center py-8 sm:py-12">
        <h1 className="text-3xl sm:text-5xl font-black text-gray-800 dark:text-white mb-4">
          Welcome Back, {user?.name?.split(" ")[0] || "User"}! 👋
          {isAdmin && <span className="block text-2xl mt-2 text-transparent bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text">Admin Panel</span>}
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4">
          {isAdmin ? "Manage the entire platform with full control" : "Manage your export-import business efficiently"}
        </p>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto px-4">
        <Link to="/dashboard/add-export" className="group bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transform hover:-translate-y-3 transition-all duration-500">
          <HiPlusCircle className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 group-hover:scale-110 transition" />
          <h3 className="text-2xl font-bold text-center">Add New Export</h3>
          <p className="text-center mt-3 opacity-90 text-sm sm:text-base">List a new product for export</p>
        </Link>

        <Link to="/dashboard/exports" className="group bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transform hover:-translate-y-3 transition-all duration-500">
          <HiUpload className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 group-hover:scale-110 transition" />
          <h3 className="text-2xl font-bold text-center">My Exports</h3>
          <p className="text-center mt-3 opacity-90 text-sm sm:text-base">View and manage exported products</p>
        </Link>

        <Link to="/dashboard/imports" className="group bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transform hover:-translate-y-3 transition-all duration-500">
          <HiDownload className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 group-hover:scale-110 transition" />
          <h3 className="text-2xl font-bold text-center">My Imports</h3>
          <p className="text-center mt-3 opacity-90 text-sm sm:text-base">Track all imported items</p>
        </Link>

        {/* Admin Extra Cards – HiPackage → HiCube করা হয়েছে */}
        {isAdmin && (
          <>
            <Link to="/dashboard/admin/users" className="group bg-gradient-to-br from-red-600 to-orange-600 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transform hover:-translate-y-3 transition-all duration-500">
              <HiUsers className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 group-hover:scale-110 transition" />
              <h3 className="text-2xl font-bold text-center">Manage Users</h3>
            </Link>

            <Link to="/dashboard/admin/products" className="group bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transform hover:-translate-y-3 transition-all duration-500">
              <HiCube className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 group-hover:scale-110 transition" /> {/* FIXED: HiPackage → HiCube */}
              <h3 className="text-2xl font-bold text-center">Manage Products</h3>
            </Link>

            <Link to="/dashboard/admin/orders" className="group bg-gradient-to-br from-teal-600 to-cyan-600 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transform hover:-translate-y-3 transition-all duration-500">
              <HiDocumentText className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 group-hover:scale-110 transition" />
              <h3 className="text-2xl font-bold text-center">All Orders</h3>
            </Link>
          </>
        )}
      </div>

      {/* Stats + Charts for Admin */}
      {isAdmin && !loading && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto px-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-xl">
              <h4 className="text-4xl font-black text-blue-600">{stats.totalUsers}</h4>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Total Users</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-xl">
              <h4 className="text-4xl font-black text-purple-600">{stats.totalProducts}</h4>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Total Products</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-xl">
              <h4 className="text-4xl font-black text-green-600">{stats.totalExports}</h4>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Total Exports</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-xl">
              <h4 className="text-4xl font-black text-orange-600">{stats.monthlyGrowth}</h4>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Growth</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto px-4">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl">
              <h3 className="text-2xl font-bold mb-6 text-center">Products by Category</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl">
              <h3 className="text-2xl font-bold mb-6 text-center">Monthly Exports Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="exports" fill="#8B5CF6" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardHome;