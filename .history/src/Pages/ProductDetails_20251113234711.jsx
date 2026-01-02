import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [importQuantity, setImportQuantity] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch(`https://back-end-server-theta.vercel.app/products/${id}`)
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
    if (!user) { toast.error("❌ Please login first!"); navigate("/login"); return; }
    if (importQuantity <= 0 || importQuantity > product.availableQuantity) { toast.warn("⚠️ Enter valid quantity!"); return; }

    setSubmitting(true);
    fetch(`https://back-end-server-theta.vercel.app/products/import/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: importQuantity, userId: user.uid }),
    })
    .then(res => res.json())
    .then(() => {
      setShowModal(false);
      setSubmitting(false);
      setImportQuantity(0);
      toast.success("✅ Product imported successfully!");
      navigate("/my-imports");
    })
    .catch(err => { console.error(err); setSubmitting(false); toast.error("❌ Failed to import product."); });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/80 via-blue-50/70 to-white/80 flex flex-col">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex-1">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center 
                     bg-white/60 backdrop-blur-md shadow-2xl rounded-3xl p-6 sm:p-10 
                     border border-white/30 relative overflow-hidden"
        >
          <motion.img
            src={product.image}
            alt={product.name}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 150 }}
            className="rounded-2xl w-full object-cover h-64 sm:h-80 md:h-96 shadow-2xl border border-gray-200"
          />

          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight drop-shadow-md">{product.name}</h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{product.description}</p>

            <div className="text-gray-800 text-sm sm:text-base space-y-1">
              <p><strong>💰 Price:</strong> ${product.price?.toFixed(2)}</p>
              <p><strong>🌍 Origin:</strong> {flag} {product.originCountry}</p>
              <p><strong>📦 Available:</strong> {product.availableQuantity} pcs</p>
              <p><strong>⭐ Rating:</strong> {product.rating}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link to="/" className="px-6 py-2 rounded-xl bg-gray-200 text-gray-800 font-medium shadow hover:shadow-md hover:bg-gray-300 transition text-center">← Back</Link>
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowModal(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold px-8 py-2.5 rounded-xl shadow-lg hover:shadow-blue-300 transition w-full sm:w-auto"
              >
                Import Now
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl border border-gray-200 flex flex-col gap-4"
            >
              <h3 className="text-2xl font-bold text-gray-900 drop-shadow-sm">Import Product</h3>
              <p className="text-gray-700 text-sm">Available Quantity: <span className="font-semibold">{product.availableQuantity}</span></p>

              <input
                type="number"
                min="1"
                max={product.availableQuantity}
                value={importQuantity}
                onChange={(e) => setImportQuantity(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-900 placeholder-gray-400 font-medium text-base"
                placeholder="Enter quantity"
              />

              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleImport}
                  disabled={importQuantity <= 0 || importQuantity > product.availableQuantity || submitting}
                  className={`w-full sm:w-auto px-5 py-3 rounded-xl font-semibold transition text-white ${importQuantity <= 0 || importQuantity > product.availableQuantity || submitting ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-md"}`}
                >
                  {submitting ? "Importing..." : "Confirm"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default ProductDetails;
