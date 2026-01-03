import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { FaDownload } from "react-icons/fa";

// Flag helper function (তোমার Latest Products-এ যেভাবে ছিল)
const getFlag = (country) => {
  switch ((country || "").toLowerCase()) {
    case "usa": return "🇺🇸";
    case "germany": return "🇩🇪";
    case "japan": return "🇯🇵";
    case "china": return "🇨🇳";
    case "south korea": return "🇰🇷";
    case "india": return "🇮🇳";
    case "malaysia": return "🇲🇾";
    default: return "🌐";
  }
};

// Skeleton Card Component (Latest Products-এর মতোই)
const SkeletonCard = () => (
  <div className="group bg-white/70 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 dark:border-gray-700/50 flex flex-col animate-pulse">
    <div className="h-40 sm:h-44 md:h-48 bg-gray-200 dark:bg-gray-700"></div>
    <div className="p-4 sm:p-5 space-y-4">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
    </div>
  </div>
);

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDark, setIsDark] = useState(false); // তুমি যদি global dark mode use করো তাহলে এটা context থেকে নিবে

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
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = useMemo(() => {
    const q = (searchTerm || "").toLowerCase().trim();
    if (!q) return products;
    return products.filter((p) => {
      const name = (p.productName || p.name || "").toLowerCase();
      const country = (p.originCountry || "").toLowerCase();
      const price = String(p.price || "");
      return name.includes(q) || country.includes(q) || price.includes(q);
    });
  }, [products, searchTerm]);

  return (
    <section className="py-16 sm:py-20 md:py-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      {/* Header with Search */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-12 sm:mb-16"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
          <span className={isDark ? "text-white" : "text-gray-900"}>All</span>{" "}
          <span className="text-transparent bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text">
            Tech Products
          </span>
        </h2>
        <p className="text-lg md:text-xl font-medium text-gray-400 dark:text-gray-500 max-w-2xl mx-auto">
          Explore our complete collection from Japan, Germany, USA and beyond
        </p>
      </motion.div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500 dark:text-gray-400" />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, country, price..."
            className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 
              text-gray-900 dark:text-gray-100 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300/50 dark:focus:ring-blue-500/50 transition-all"
          />
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {Array(12).fill().map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">
            No products found for "{searchTerm}"
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-500 mt-2">
            Try different keywords
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredProducts.map((p, idx) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{
                  y: -12,
                  scale: 1.02,
                  rotateX: -5,
                  rotateY: 5,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
                className="group bg-white/70 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-3xl 
                  overflow-hidden transition-all duration-500 border border-white/50 dark:border-gray-700/50 
                  hover:border-blue-200/50 dark:hover:border-blue-400/30 flex flex-col"
              >
                {/* Image Section */}
                <div className="relative overflow-hidden h-40 sm:h-44 md:h-48 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-700 dark:to-gray-800">
                  <img
                    src={p.image || p.img || "https://i.ibb.co/2kzH8v1/no-image.png"}
                    alt={p.productName || p.name}
                    className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                    onError={(e) => {
                      e.target.src = "https://i.ibb.co/2kzH8v1/no-image.png";
                    }}
                  />

                  {/* Rating Badge */}
                  <div className="absolute top-2 left-2">
                    <div className="bg-gradient-to-r from-yellow-400 to-amber-500 dark:from-yellow-500 dark:to-amber-600 text-black dark:text-white px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-md backdrop-blur-sm">
                      <svg className="w-3 h-3 fill-current text-yellow-600 dark:text-yellow-300" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <span>{p.rating || 4.8}</span>
                      <span className="font-normal opacity-80">({Math.floor(Math.random() * 1000) + 100})</span>
                    </div>
                  </div>

                  {/* TOP / HOT Badge */}
                  <div className="absolute top-2 right-2">
                    <div className={`px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-md backdrop-blur-sm text-white ${
                      p.availableQuantity > 100
                        ? "bg-gradient-to-r from-purple-500 to-pink-600 dark:from-purple-600 dark:to-pink-700"
                        : "bg-gradient-to-r from-red-500 to-orange-600 dark:from-red-600 dark:to-orange-700"
                    }`}>
                      <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                        {p.availableQuantity > 100 ? (
                          <path d="M18 2H6v2h-.5A2.5 2.5 0 003 6.5V8a3 3 0 002.5 2.95A4.99 4.99 0 009 15.9V22h6v-6.1a4.99 4.99 0 003.5-4.95A3 3 0 0021 8v-1.5A2.5 2.5 0 0018.5 4H18V2zM19 8a1 1 0 01-2 0V6h-2v2a1 1 0 01-2 0V6H9v2a1 1 0 01-2 0V6H5v1.5A.5.5 0 015.5 8h13a.5.5 0 01.5.5V8z"/>
                        ) : (
                          <path d="M12 23a1.5 1.5 0 01-1.5-1.5v-9.46a6.98 6.98 0 013-1.35 6.98 6.98 0 013 1.35V21.5A1.5 1.5 0 0115 23h-3zM12 0c-3.87 0-7 2.69-7 6 0 2.29 1.39 4.29 3.5 5.48V13h7v-1.52C17.61 10.29 19 8.29 19 6c0-3.31-3.13-6-7-6z"/>
                        )}
                      </svg>
                      <span>{p.availableQuantity > 100 ? "TOP" : "HOT"}</span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-lg font-bold line-clamp-2 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {p.productName || p.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400">
                        ${p.price?.toLocaleString() || "1,299"}
                      </span>
                      <span className="text-xs bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 px-2 py-0.5 rounded-full font-semibold">
                        Save 15%
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                      {getFlag(p.originCountry)} {p.originCountry || "Global Origin"}
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M20 7h-3V4a1 1 0 00-1-1H8a1 1 0 00-1 1v3H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM9 5h6v2H9V5zm11 13H4V9h3v2h10V9h3v9z"/>
                        </svg>
                        {p.availableQuantity || 0} pcs left
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17v-2h2v2h-2zm1-3.5c-2.76 0-5-2.24-5-5h2c0 1.65 1.35 3 3 3s3-1.35 3-3-1.35-3-3-3v-1.5c2.76 0 5 2.24 5 5s-2.24 5-5 5z"/>
                        </svg>
                        Ships worldwide
                      </span>
                    </div>

                    <Link
                      to={`/product/${p._id}`}
                      className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-2.5 px-4 rounded-2xl font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <FaDownload className="text-xs" /> View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
};

export default AllProducts;