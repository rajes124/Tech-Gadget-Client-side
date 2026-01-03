import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link,  } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiPackage,        // Imported Quantity
  FiDollarSign,     // Price
  FiStar,           // Rating
  FiGlobe,          // Origin Country
  FiBox,            // Available Quantity
  FiTrash2,         // Remove
  FiEye,            // See Details
  FiRefreshCw,      // Re-Import
  FiShoppingCart,   // General import feel
} from "react-icons/fi";

const MyImports = () => {
  //const { theme } = useOutletContext();
const theme = localStorage.getItem("theme") || "light";
  const [imports, setImports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [importingId, setImportingId] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const intervalRef = useRef(null);

  const fetchImports = async () => {
    if (!user || !user.uid) return;
    try {
      const res = await fetch(`https://back-end-server-theta.vercel.app/my-imports/${user.uid}`);
      if (!res.ok) throw new Error("Failed to fetch imports");
      const data = await res.json();
      setImports(data.filter(Boolean));
      setLoading(false);
    } catch {
      toast.error("Failed to load imports 😢");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user || !user.uid) {
      navigate("/login");
      return;
    }

    fetchImports();

    intervalRef.current = setInterval(() => {
      fetchImports();
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [user, navigate]);

  const handleRemove = async (id) => {
    if (!window.confirm("Are you sure you want to remove this import?")) return;
    try {
      const res = await fetch(`https://back-end-server-theta.vercel.app/my-imports/${user.uid}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Import removed successfully!");
      fetchImports();
    } catch {
      toast.error("Failed to remove import");
    }
  };

  const handleReImport = async (id, available) => {
    if (available <= 0) return toast.warn("Out of stock!");

    const quantityInput = prompt(`Enter quantity (max ${available})`);
    const quantity = Number(quantityInput);

    if (!quantity || quantity <= 0 || quantity > available) {
      return toast.warn("Invalid quantity!");
    }

    setImportingId(id);
    try {
      const res = await fetch(`https://back-end-server-theta.vercel.app/products/import/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity, userId: user.uid }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(`Imported ${data.importedQuantity} items!`);
        fetchImports();
      } else {
        toast.error(`${data.message}`);
      }
    } catch {
      toast.error("Failed to import");
    } finally {
      setImportingId(null);
    }
  };

  // Loading & Empty states same as before (আগের polished version থেকে)
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-6 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );

  if (!imports.length)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
        <FiShoppingCart className="w-24 h-24 text-gray-300 dark:text-gray-600 mb-8" />
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          No Imports Yet
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
          You haven't imported any products. Browse and start importing now!
        </p>
        <Link
          to="/"
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all"
        >
          Browse Products
        </Link>
      </div>
    );

  const getFlag = (country) => {
    const flags = {
      usa: "🇺🇸",
      germany: "🇩🇪",
      china: "🇨🇳",
      japan: "🇯🇵",
      "south korea": "🇰🇷",
      india: "🇮🇳",
      malaysia: "🇲🇾",
    };
    return flags[(country || "").toLowerCase()] || "🌐";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20 px-4 sm:px-6 lg:px-12 transition-colors">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-black mb-4">
          <span className="text-gray-800 dark:text-white">My</span>{" "}
          <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
            Imported Products
          </span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Real-time tracking of all your imported gadgets
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
        <AnimatePresence>
          {imports.map((item, idx) => (
            <motion.div
              key={item._id}
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
                hover:border-purple-200/50 dark:hover:border-purple-400/30 flex flex-col"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-48 sm:h-52">
                <img
                  src={item.image || "https://i.ibb.co/2kzH8v1/no-image.png"}
                  alt={item.name || item.productName}
                  className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
                    {item.name || item.productName}
                  </h3>

                  {/* Rich Meta with Icons */}
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                      <FiDollarSign className="w-5 h-5 text-green-500" />
                      <span className="font-semibold">${item.price?.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                      <FiStar className="w-5 h-5 text-yellow-500" />
                      <span>Rating: <span className="font-semibold">{item.rating || "N/A"}</span></span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                      <FiGlobe className="w-5 h-5 text-blue-500" />
                      <span>{getFlag(item.originCountry)} {item.originCountry || "Global"}</span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                      <FiPackage className="w-5 h-5 text-purple-500" />
                      <span>Imported: <span className="font-semibold">{item.importedQuantity} pcs</span></span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                      <FiBox className="w-5 h-5 text-indigo-500" />
                      <span>Available: <span className="font-semibold">{item.availableQuantity || 0} pcs</span></span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons with Icons */}
                <div className="grid grid-cols-3 gap-3 mt-6">
                  {/* Remove */}
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="flex flex-col items-center justify-center gap-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white py-3 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <FiTrash2 className="w-5 h-5" />
                    <span className="text-xs">Remove</span>
                  </button>

                  {/* View Details */}
                  <button
                    onClick={() => navigate(`/product/${item._id}`)}
                    className="flex flex-col items-center justify-center gap-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <FiEye className="w-5 h-5" />
                    <span className="text-xs">View</span>
                  </button>

                  {/* Re-Import */}
                  <button
                    onClick={() => handleReImport(item._id, item.availableQuantity || 0)}
                    disabled={importingId === item._id || (item.availableQuantity || 0) <= 0}
                    className={`flex flex-col items-center justify-center gap-1 text-white py-3 rounded-2xl font-medium shadow-lg transition-all duration-300 ${
                      item.availableQuantity > 0
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:shadow-xl"
                        : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                    }`}
                  >
                    <FiRefreshCw className={`w-5 h-5 ${importingId === item._id ? "animate-spin" : ""}`} />
                    <span className="text-xs">
                      {importingId === item._id ? "Importing..." : item.availableQuantity > 0 ? "Re-Import" : "Out of Stock"}
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <ToastContainer position="bottom-right" theme={theme === "dark" ? "dark" : "light"} />
    </div>
  );
};

export default MyImports;