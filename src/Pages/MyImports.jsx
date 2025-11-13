import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css";

const MyImports = () => {
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

    // Initial fetch
    fetchImports();

    
    intervalRef.current = setInterval(() => {
      fetchImports();
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [user, navigate]);

  const handleRemove = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const res = await fetch(`back-end-server-theta.vercel.app/my-imports/${user.uid}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("🗑️ Import removed successfully!");
      fetchImports(); 
    } catch {
      toast.error("❌ Failed to remove import");
    }
  };

  const handleReImport = async (id, available) => {
    if (available <= 0) return toast.warn("⚠️ Out of stock!");
    const quantity = Number(prompt(`Enter quantity (max ${available})`));
    if (!quantity || quantity <= 0) return;

    setImportingId(id);
    try {
      const res = await fetch(`back-end-server-theta.vercel.app/products/import/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity, userId: user.uid }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(`✅ Imported ${data.importedQuantity} items!`);
        fetchImports(); // Refresh after re-import
      } else {
        toast.error(`❌ ${data.message}`);
      }
    } catch {
      toast.error("🚫 Failed to import");
    } finally {
      setImportingId(null);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-[70vh] 
                      bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );

  if (!imports.length)
    return (
      <div className="text-center mt-20 text-gray-700 
                      bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 
                      min-h-[70vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-4">No Imports Found 😢</h2>
        <Link to="/" className="text-blue-600 hover:underline text-lg">
          Browse Products
        </Link>
        <ToastContainer position="bottom-right" />
      </div>
    );

  const flags = {
    usa: "🇺🇸",
    germany: "🇩🇪",
    china: "🇨🇳",
    japan: "🇯🇵",
    "south korea": "🇰🇷",
    india: "🇮🇳",
    malaysia: "🇲🇾",
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative 
                    bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 overflow-hidden">
      {/* Optional subtle floating gradient overlay */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-200 rounded-full opacity-20 blur-3xl pointer-events-none"></div>

      <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-10 text-center 
                     bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        My Imports
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10">
        {imports.map((item, i) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
            className="relative bg-white rounded-2xl overflow-hidden border border-gray-200
                       hover:border-transparent hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-2
                       transition-all duration-500 group"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                            opacity-0 group-hover:opacity-100 blur-lg transition-all duration-700 -z-10"></div>

            <div className="p-4 flex flex-col h-full justify-between">
              <div className="overflow-hidden rounded-xl mb-3">
                <motion.img
                  whileHover={{ scale: 1.07 }}
                  transition={{ duration: 0.4 }}
                  src={item.image}
                  alt={item.name || item.productName}
                  className="w-full h-36 sm:h-40 md:h-44 object-cover rounded-xl"
                />
              </div>

              <div className="flex flex-col flex-grow text-gray-800">
                <h3 className="text-base sm:text-lg font-semibold mb-1 line-clamp-1">
                  {item.name || item.productName}
                </h3>
                <p className="text-xs sm:text-sm"><strong>💰 Price:</strong> ${item.price}</p>
                <p className="text-xs sm:text-sm"><strong>⭐ Rating:</strong> {item.rating}</p>
                <p className="text-xs sm:text-sm">
                  <strong>🌍 Origin:</strong> {flags[(item.originCountry || "").toLowerCase()] || "🌐"} {item.originCountry}
                </p>
                <p className="text-xs sm:text-sm"><strong>📦 Imported:</strong> {item.importedQuantity}</p>
                <p className="text-xs sm:text-sm"><strong>🛒 Available:</strong> {item.availableQuantity || 0}</p>
              </div>

              <div className="mt-3 flex flex-col sm:flex-row sm:justify-between gap-2">
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleRemove(item._id)}
                  className="flex-1 px-3 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs sm:text-sm font-medium rounded-lg shadow-md 
                             hover:shadow-lg hover:brightness-110 transition-all"
                >
                  Remove
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => navigate(`/product/${item._id}`)}
                  className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs sm:text-sm font-medium rounded-lg shadow-md 
                             hover:shadow-lg hover:brightness-110 transition-all"
                >
                  See Details
                </motion.button>

                <motion.button
  whileTap={{ scale: 0.96 }}
  whileHover={{ scale: 1.02 }}
  onClick={() => {
    const quantity = Number(prompt(`Enter quantity (max ${item.availableQuantity})`));
    if (!quantity || quantity <= 0 || quantity > (item.availableQuantity || 0)) {
      return toast.warn("⚠️ Invalid quantity!");
    }
    handleReImport(item._id, item.availableQuantity || 0, quantity);
  }}
  disabled={importingId === item._id || (item.availableQuantity || 0) <= 0}
  className={`flex-1 px-3 py-2 text-white text-xs sm:text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all ${
    item.availableQuantity > 0
      ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:brightness-110"
      : "bg-gray-400 cursor-not-allowed"
  }`}
>
  {item.availableQuantity > 0
    ? importingId === item._id
      ? "Importing..."
      : "Re-Import"
    : "Out of Stock"}
</motion.button>

              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default MyImports;
