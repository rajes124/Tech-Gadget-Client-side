import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const MyImports = () => {
  const [imports, setImports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [importingId, setImportingId] = useState(null); // import process loader
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetch(`http://localhost:4000/my-imports/${user.uid}`)
      .then((res) => res.json())
      .then((data) => {
        setImports(data.filter(Boolean)); // null/undefined remove
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user, navigate]);

  const handleRemove = (productId) => {
    if (!window.confirm("Are you sure you want to remove this import?")) return;

    fetch(`http://localhost:4000/my-imports/${user.uid}/${productId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setImports((prev) => prev.filter((item) => item._id !== productId));
        alert("✅ Product removed successfully!");
      })
      .catch((err) => {
        console.error(err);
        alert("❌ Failed to remove product.");
      });
  };

  const handleReImport = async (productId, availableQuantity) => {
    if (availableQuantity <= 0) return alert("Product out of stock");

    const quantity = Number(prompt(`Enter quantity to import (max ${availableQuantity})`));
    if (!quantity || quantity <= 0) return;

    setImportingId(productId);

    try {
      const res = await fetch(`http://localhost:4000/products/import/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity, userId: user.uid }),
      });
      const data = await res.json();

      if (res.ok) {
        setImports((prev) =>
          prev.map((item) =>
            item._id === productId
              ? { ...item, importedQuantity: (item.importedQuantity || 0) + data.importedQuantity, availableQuantity: data.availableQuantity }
              : item
          )
        );
        alert(`✅ Imported ${data.importedQuantity} items successfully!`);
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error(error);
      alert("❌ Failed to import product");
    } finally {
      setImportingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!imports.length) {
    return (
      <div className="text-center mt-20 text-gray-600">
        <h2 className="text-3xl font-bold">No Imports Found 😢</h2>
        <Link to="/" className="text-blue-500 mt-4 inline-block hover:underline">
          Browse Products
        </Link>
      </div>
    );
  }

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
            <p><strong>💰 Price:</strong> ${item.price}</p>
            <p><strong>⭐ Rating:</strong> {item.rating}</p>
            <p>
              <strong>🌍 Origin:</strong> {flags[(item.originCountry || "").toLowerCase()] || "🌐"} {item.originCountry}
            </p>
            <p><strong>📦 Imported Quantity:</strong> {item.importedQuantity}</p>
            <p><strong>🛒 Available Quantity:</strong> {item.availableQuantity || 0}</p>

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
                  (item.availableQuantity || 0) > 0
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {(item.availableQuantity || 0) > 0
                  ? importingId === item._id
                    ? "Importing..."
                    : "Re-Import"
                  : "Out of Stock"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyImports;
