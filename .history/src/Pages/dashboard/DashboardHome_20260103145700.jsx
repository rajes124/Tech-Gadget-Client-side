import React from 'react';
import { HiChartPie, HiTable, HiUserGroup } from 'react-icons/hi';

const DashboardHome = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Welcome to Dashboard</h2>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Total Users</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">1,234</h3> {/* dynamic data */}
            </div>
            <HiUserGroup className="text-4xl text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Revenue</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">$45,678</h3>
            </div>
            <HiChartPie className="text-4xl text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Items</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">567</h3>
            </div>
            <HiTable className="text-4xl text-purple-500" />
          </div>
        </div>
      </div>

      {/* Dynamic Charts & Table (এখানে তোমার backend থেকে data fetch করে chart/table দেখাও) */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Statistics Chart</h3>
        {/* Example: Recharts বা Chart.js দিয়ে Bar/Line/Pie chart add করো */}
        <p className="text-gray-500">Chart here (use real data from backend)</p>
      </div>

      <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Recent Data Table</h3>
        {/* Table with dynamic data */}
        <p className="text-gray-500">Data table here</p>
      </div>
    </div>
  );
};

export default DashboardHome;