import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    if (!user || !user.uid) {
      navigate("/login");
      return;
    }

    fetch(`http://localhost:4000/my-imports/${user.uid}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch imports");
        return res.json();
      })
      .then((data) => {
        setImports(data.filter(Boolean));
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load imports 😢");
        setLoading(false);
      });
  }, [user, navigate]);

  const handleRemove = (id) => {
    if (!window.confirm("Are you sure?")) return;
    fetch(`http://localhost:4000/my-imports/${user.uid}/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        setImports((prev) => prev.filter((item) => item._id !== id));
        toast.success("🗑️ Import removed successfully!");
      })
      .catch(() => toast.error("❌ Failed to remove import"));
  };

  const handleReImport = async (id, available) => {
    if (available <= 0) return toast.warn("⚠️ Out of stock!");
    const quantity = Number(prompt(`Enter quantity (max ${available})`));
    if (!quantity || quantity <= 0) return;

    setImportingId(id);
    try {
      const res = await fetch(`http://localhost:4000/products/import/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity, userId: user.uid }),
      });
      const data = await res.json();
      if (res.ok) {
        setImports((prev) =>
          prev.map((item) =>
            item._id === id
              ? {
                  ...item,
                  importedQuantity: (item.importedQuantity || 0) + data.importedQuantity,
                  availableQuantity: data.availableQuantity,
                }
              : item
          )
        );
        toast.success(`✅ Imported ${data.importedQuantity} items!`);
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
      <div className="flex items-center justify-center h-[70vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );

  if (!imports.length)
    return (
      <div className="text-center mt-20 text-gray-600">
        <h2 className="text-3xl font-bold">No Imports Found 😢</h2>
        <Link to="/" className="text-blue-500 mt-4 inline-block hover:underline">
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
    <div className="max-w-6xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-10 text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        My Imports
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
            {/* Gradient glow border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                            opacity-0 group-hover:opacity-100 blur-lg transition-all duration-700 -z-10"></div>

            {/* Card Content */}
            <div className="p-4 flex flex-col h-full justify-between">
              {/* Image */}
              <div className="overflow-hidden rounded-xl mb-3">
                <motion.img
                  whileHover={{ scale: 1.07 }}
                  transition={{ duration: 0.4 }}
                  src={item.image}
                  alt={item.name || item.productName}
                  className="w-full h-36 sm:h-40 md:h-44 object-cover rounded-xl"
                />
              </div>

              {/* Info */}
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

              {/* Buttons */}
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
                  onClick={() => handleReImport(item._id, item.availableQuantity || 0)}
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
