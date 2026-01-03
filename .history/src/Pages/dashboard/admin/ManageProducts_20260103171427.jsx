import React from "react";

const ManageProducts = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center max-w-4xl">
        <h1 className="text-4xl sm:text-5xl font-black text-gray-800 dark:text-white mb-6">
          <span className="text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text">
            Manage All Products
          </span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Admin can view, edit, approve, or delete all products listed for export-import from this panel.
        </p>
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10">
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Full product management table and features are under development.
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-4">
            (You can later copy logic from MyExports page here and fetch all products from backend)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;   // <--- এই লাইনটা সবচেয়ে গুরুত্বপূর্ণ! অবশ্যই থাকতে হবে