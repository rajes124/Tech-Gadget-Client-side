import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [importQuantity, setImportQuantity] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")); // Logged-in user

  useEffect(() => {
    fetch(`http://localhost:4000/products/${id}`)
      .then(res => res.json())
      .then(data => { setProduct(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center h-[70vh]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
      />
    </div>
  );

  if (!product || !product._id) return (
    <div className="text-center mt-20 text-gray-600">
      <h2 className="text-3xl font-bold">Product Not Found 😢</h2>
      <Link to="/" className="text-blue-500 mt-4 inline-block hover:underline">Go Back Home</Link>
    </div>
  );

  const flags = { usa:"🇺🇸", germany:"🇩🇪", china:"🇨🇳", japan:"🇯🇵", "south korea":"🇰🇷", india:"🇮🇳", malaysia:"🇲🇾" };
  const flag = flags[(product.originCountry||"").toLowerCase()] || "🌐";

  const handleImport = () => {
    if (!user) { alert("❌ Please login first!"); navigate("/login"); return; }
    if (importQuantity <= 0 || importQuantity > product.availableQuantity) { alert("⚠️ Enter valid quantity!"); return; }

    setSubmitting(true);
    fetch(`http://localhost:4000/products/import/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: importQuantity, userId: user.uid }),
    })
    .then(res => res.json())
    .then(() => {
      setShowModal(false);
      setSubmitting(false);
      setImportQuantity(0);
      alert("✅ Product imported successfully!");
      navigate("/my-imports"); // Redirect
    })
    .catch(err => { console.error(err); setSubmitting(false); alert("❌ Failed to import product."); });
  };

  return (
    <div className="max-w-6xl mx-auto py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="grid md:grid-cols-2 gap-10 items-center bg-gradient-to-br from-white/70 to-blue-50/50 backdrop-blur-md shadow-2xl rounded-3xl p-10 border border-white/40 relative overflow-hidden"
      >
        <motion.img
          src={product.image}
          alt={product.name}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 150 }}
          className="rounded-2xl w-full object-cover h-96 shadow-2xl border border-gray-200"
        />

        <div className="space-y-4">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight drop-shadow-md">{product.name}</h2>
          <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>

          <div className="text-gray-800 text-base space-y-1">
            <p><strong>💰 Price:</strong> ${product.price}</p>
            <p><strong>🌍 Origin:</strong> {flag} {product.originCountry}</p>
            <p><strong>📦 Available:</strong> {product.availableQuantity} pcs</p>
            <p><strong>⭐ Rating:</strong> {product.rating}</p>
          </div>

          <div className="flex gap-5 mt-6">
            <Link to="/" className="px-6 py-2 rounded-xl bg-gray-200 text-gray-800 font-medium shadow hover:shadow-md hover:bg-gray-300 transition">← Back</Link>
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold px-8 py-2.5 rounded-xl shadow-lg hover:shadow-blue-300 transition"
            >
              Import Now
            </motion.button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-8 w-[380px] shadow-2xl border border-gray-200"
            >
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Import Product</h3>
              <p className="text-gray-600 mb-4">Available Quantity: {product.availableQuantity}</p>

              <input
                type="number"
                min="1"
                max={product.availableQuantity}
                value={importQuantity}
                onChange={(e) => setImportQuantity(Number(e.target.value))}
                className="w-full border p-2.5 rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter quantity"
              />

              <div className="flex justify-end gap-4">
                <button onClick={() => setShowModal(false)} className="px-5 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition">Cancel</button>
                <button
                  onClick={handleImport}
                  disabled={importQuantity <= 0 || importQuantity > product.availableQuantity || submitting}
                  className={`px-5 py-2 rounded-lg text-white font-semibold transition ${importQuantity <= 0 || importQuantity > product.availableQuantity || submitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-md"}`}
                >
                  {submitting ? "Importing..." : "Confirm"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetails;
