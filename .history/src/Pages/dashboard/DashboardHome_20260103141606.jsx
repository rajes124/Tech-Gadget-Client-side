import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiPackage, FiShoppingCart, FiDollarSign, FiTrendingUp } from "react-icons/fi";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useOutletContext } from "react-router-dom";

const DashboardHome = () => {
  const { theme } = useOutletContext();
  const [stats, setStats] = useState({
    totalExports: 0,
    totalImports: 0,
    totalRevenue: 0,
    activeProducts: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // My Exports count
        const expRes = await fetch(`https://back-end-server-theta.vercel.app/my-exports/${user.email}`);
        const exports = await expRes.json();
        
        // My Imports count
        const impRes = await fetch(`https://back-end-server-theta.vercel.app/my-imports/${user.uid}`);
        const imports = await impRes.json();

        // Calculate stats
        const revenue = exports.reduce((sum, item) => sum + (item.price * item.availableQuantity), 0);

        setStats({
          totalExports: exports.length,
          totalImports: imports.length,
          totalRevenue: revenue,
          activeProducts: exports.length + imports.length,
        });

        // Recent activity (last 6)
        const allActivity = [
          ...exports.map(item => ({ ...item, type: "export", date: item.createdAt || new Date() })),
          ...imports.map(item => ({ ...item, type: "import", date: item.createdAt || new Date() }))
        ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);

        setRecentActivity(allActivity);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchStats();
  }, [user]);

  // Chart Data
  const barData = [
    { name: "Exports", value: stats.totalExports },
    { name: "Imports", value: stats.totalImports },
  ];

  const pieData = [
    { name: "Revenue from Exports", value: stats.totalRevenue },
    { name: "Pending Imports", value: stats.totalImports * 1000 }, // dummy
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  const cards = [
    { title: "Total Exports", value: stats.totalExports, icon: FiPackage, color: "from-blue-500 to-blue-600" },
    { title: "Total Imports", value: stats.totalImports, icon: FiShoppingCart, color: "from-green-500 to-emerald-600" },
    { title: "Estimated Revenue", value: `$${stats.totalRevenue.toLocaleString()}`, icon: FiDollarSign, color: "from-purple-500 to-pink-600" },
    { title: "Active Products", value: stats.activeProducts, icon: FiTrendingUp, color: "from-orange-500 to-red-600" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-16 h-16 border-6 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-black mb-2">
          Welcome back, <span className="text-transparent bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text">{user?.displayName || "User"}</span>!
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">Here's your dashboard overview</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 dark:border-gray-700/50"
          >
            <div className="flex items-center justify-between mb-4">
              <card.icon className="w-10 h-10 text-white" />
              <div className={`w-16 h-16 bg-gradient-to-r ${card.color} rounded-2xl opacity-20`} />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{card.title}</p>
            <p className="text-3xl font-black text-gray-900 dark:text-white mt-2">{card.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl p-6"
        >
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Exports vs Imports</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl p-6"
        >
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Activity Table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 overflow-hidden"
      >
        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Recent Activity</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4">Product</th>
                <th className="text-left py-3 px-4">Type</th>
                <th className="text-left py-3 px-4">Price</th>
                <th className="text-left py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 px-4">{item.productName || item.name}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.type === "export" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                    }`}>
                      {item.type === "export" ? "Export" : "Import"}
                    </span>
                  </td>
                  <td className="py-3 px-4">${item.price}</td>
                  <td className="py-3 px-4 text-gray-500">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;