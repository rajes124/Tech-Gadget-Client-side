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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-10">
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

      {/* Grid – card size control করার জন্য */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        <AnimatePresence>
          {imports.map((item, idx) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl 
                overflow-hidden transition-all duration-500 border border-gray-200 dark:border-gray-700 
                flex flex-col h-full"
            >
              {/* Image – fixed height */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={item.image || "https://i.ibb.co/2kzH8v1/no-image.png"}
                  alt={item.name || item.productName}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content – compact */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
                    {item.name || item.productName}
                  </h3>

                  {/* Meta Info – smaller text */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <FiDollarSign className="w-4 h-4 text-green-500" />
                      <span className="font-medium">${item.price?.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiStar className="w-4 h-4 text-yellow-500" />
                      <span>Rating: <span className="font-medium">{item.rating || "N/A"}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiGlobe className="w-4 h-4 text-blue-500" />
                      <span>{getFlag(item.originCountry)} {item.originCountry || "Global"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiPackage className="w-4 h-4 text-purple-500" />
                      <span>Imported: <span className="font-medium">{item.importedQuantity} pcs</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiBox className="w-4 h-4 text-indigo-500" />
                      <span>Available: <span className="font-medium">{item.availableQuantity || 0} pcs</span></span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons – compact 3-column */}
                <div className="grid grid-cols-3 gap-2 mt-5">
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="flex flex-col items-center gap-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl text-xs font-medium transition"
                  >
                    <FiTrash2 className="w-4 h-4" />
                    Remove
                  </button>

                  <button
                    onClick={() => navigate(`/product/${item._id}`)}
                    className="flex flex-col items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl text-xs font-medium transition"
                  >
                    <FiEye className="w-4 h-4" />
                    View
                  </button>

                  <button
                    onClick={() => handleReImport(item._id, item.availableQuantity || 0)}
                    disabled={importingId === item._id || (item.availableQuantity || 0) <= 0}
                    className={`flex flex-col items-center gap-1 text-white py-2 rounded-xl text-xs font-medium transition ${
                      item.availableQuantity > 0
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <FiRefreshCw className={`w-4 h-4 ${importingId === item._id ? "animate-spin" : ""}`} />
                    {importingId === item._id ? "..." : item.availableQuantity > 0 ? "Re-Import" : "Out"}
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