import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { FaDownload } from "react-icons/fa";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    document.title = "All Products - Tech Gadget Hub";
  }, []);

  useEffect(() => {
    fetch("https://back-end-server-theta.vercel.app/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredProducts = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return products.filter(
      (p) =>
        p.productName?.toLowerCase().includes(q) ||
        p.originCountry?.toLowerCase().includes(q)
    );
  }, [products, searchTerm]);

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-4xl font-black text-center mb-4">
          <span className="text-gray-900 dark:text-white">All </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
            Tech Products
          </span>
        </h2>

        <p className="text-center text-gray-600 dark:text-gray-300 mb-10">
          Explore products from Japan, USA, Germany & more
        </p>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-12 relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700"
          />
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredProducts.map((p) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden"
              >
                <img
                  src={p.image}
                  alt={p.productName}
                  className="h-44 w-full object-cover"
                />

                <div className="p-4">
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {p.productName}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-black text-xl">
                    ${p.price}
                  </p>

                  <Link
                    to={`/product/${p._id}`}
                    className="mt-3 block text-center bg-gradient-to-r from-blue-600 to-green-600 text-white py-2 rounded-xl font-bold"
                  >
                    <FaDownload className="inline mr-2" />
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default AllProducts;
