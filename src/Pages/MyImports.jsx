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

    // ✅ Fetch only if user exists
    fetch(`http://localhost:4000/my-imports/${user.uid}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch imports");
        return res.json();
      })
      .then((data) => {
        setImports(data.filter(Boolean));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load imports 😢");
        setLoading(false);
      });
  }, [user, navigate]);

  // Remove import
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

  // Re-import
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
    } catch (err) {
      console.error(err);
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
    <div className="max-w-6xl mx-auto py-20 px-6">
      <h2 className="text-3xl font-bold mb-10 text-center">My Imports</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {imports.map((item) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col"
          >
            <img
              src={item.image}
              alt={item.name || item.productName}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{item.name || item.productName}</h3>
            <p>
              <strong>💰 Price:</strong> ${item.price}
            </p>
            <p>
              <strong>⭐ Rating:</strong> {item.rating}
            </p>
            <p>
              <strong>🌍 Origin:</strong> {flags[(item.originCountry || "").toLowerCase()] || "🌐"}{" "}
              {item.originCountry}
            </p>
            <p>
              <strong>📦 Imported Quantity:</strong> {item.importedQuantity}
            </p>
            <p>
              <strong>🛒 Available Quantity:</strong> {item.availableQuantity || 0}
            </p>

            <div className="mt-auto flex gap-2">
              <button
                onClick={() => handleRemove(item._id)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
              >
                Remove
              </button>
              <button
                onClick={() => navigate(`/product/${item._id}`)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
              >
                See Details
              </button>
              <button
                onClick={() => handleReImport(item._id, item.availableQuantity || 0)}
                disabled={importingId === item._id || (item.availableQuantity || 0) <= 0}
                className={`flex-1 px-4 py-2 rounded-xl text-white transition ${
                  item.availableQuantity > 0
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {item.availableQuantity > 0
                  ? importingId === item._id
                    ? "Importing..."
                    : "Re-Import"
                  : "Out of Stock"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default MyImports;
