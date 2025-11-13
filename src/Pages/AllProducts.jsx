import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <section className="min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-10 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-12">
          <span className="text-black">🌍 All</span>{" "}
          <span className="text-blue-600">Products</span>
        </h2>

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {products.map((p) => {
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
                  whileHover={{
                    rotateY: 5,
                    rotateX: -3,
                    scale: 1.05,
                    y: -6,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 10,
                  }}
                  className="bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition-transform duration-500 relative group border border-gray-100 w-full max-w-sm sm:max-w-full mx-auto"
                >
                  {/* Product Image */}
                  <div className="relative overflow-hidden h-52 sm:h-60 md:h-64 lg:h-72">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                    />
                    <div className="absolute top-3 left-3 bg-yellow-400 px-3 py-1 rounded-full font-semibold text-xs sm:text-sm shadow">
                      ⭐ {p.rating}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-5 sm:p-6 flex flex-col justify-between h-[210px]">
                    <div className="mb-3">
                      <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">
                        {p.name}
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

                    {/* See Details Button */}
                    <Link to={`/product/${p._id}`}>
                      <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 sm:py-2.5 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 text-sm sm:text-base">
                        See Details
                      </button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProducts;
