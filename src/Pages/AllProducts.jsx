import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/products")
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
      const productDisplayName = p.productName || p.name || "";
      return (
        productDisplayName.toLowerCase().includes(q) ||
        (p.originCountry || "").toLowerCase().includes(q) ||
        String(p.price || "").toLowerCase().includes(q)
      );
    });
  }, [products, searchTerm]);

  return (
    <section className="min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-10 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center sm:text-left">
            <span className="text-black">🌍 All</span>{" "}
            <span className="text-blue-600">Products</span>
          </h2>

          <div className="w-full sm:w-96">
            <label className="relative block">
              <span className="sr-only">Search products</span>
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FiSearch className="w-5 h-5 text-gray-500" />
              </span>
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products (name, country, price...)"
                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-gray-200 rounded-xl py-2 pl-10 pr-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label="Search products"
              />
            </label>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"
            />
            <p className="ml-3 text-gray-600 font-medium">Loading products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((p) => {
              const productDisplayName = p.productName || p.name || "";
              let flag = "";
              switch ((p.originCountry || "").toLowerCase()) {
                case "usa":
                  flag = "🇺🇸";
                  break;
                case "germany":
                  flag = "🇩🇪";
                  break;
                case "china":
                  flag = "🇨🇳";
                  break;
                case "japan":
                  flag = "🇯🇵";
                  break;
                case "south korea":
                  flag = "🇰🇷";
                  break;
                case "india":
                  flag = "🇮🇳";
                  break;
                case "malaysia":
                  flag = "🇲🇾";
                  break;
                default:
                  flag = "🌐";
              }

              return (
                <motion.div
                  key={p._id}
                  whileHover={{ rotateY: 5, rotateX: -3, scale: 1.05, y: -6 }}
                  transition={{ type: "spring", stiffness: 150, damping: 10 }}
                  className="bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition-transform duration-500 relative group border border-gray-100 w-full max-w-sm sm:max-w-full mx-auto flex flex-col h-full"
                >
                  <div className="relative overflow-hidden h-52 sm:h-60 md:h-64 lg:h-72 flex-shrink-0">
                    <img
                      src={p.image || p.img || "https://via.placeholder.com/600x400?text=No+Image"}
                      alt={productDisplayName}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1 block"
                    />
                    <div className="absolute top-3 left-3 bg-yellow-400 px-3 py-1 rounded-full font-semibold text-xs sm:text-sm shadow">
                      ⭐ {p.rating}
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 flex-1 flex flex-col">
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">
                        {productDisplayName}
                      </h3>

                      <p className="text-gray-800 font-semibold mb-1 text-sm sm:text-base">
                        Price: ${p.price}
                      </p>

                      <p className="text-gray-600 mb-2 flex items-center gap-2 text-sm sm:text-base">
                        {flag} {p.originCountry || "Unknown"}
                      </p>

                      <span
                        className={`inline-block px-3 py-1 rounded-full font-semibold text-xs sm:text-sm ${
                          p.availableQuantity > 50
                            ? "bg-green-100 text-green-800"
                            : p.availableQuantity > 20
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {p.availableQuantity} pcs Available
                      </span>
                    </div>

                    <div className="mt-auto">
                      <Link to={`/product/${p._id}`}>
                        <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 sm:py-2.5 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 text-sm sm:text-base">
                          See Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-600">
                No products found for "{searchTerm}".
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProducts;
