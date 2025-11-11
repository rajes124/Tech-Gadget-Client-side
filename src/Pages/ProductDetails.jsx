import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [importQuantity, setImportQuantity] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4000/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  if (!product || !product._id) {
    return (
      <div className="text-center mt-20 text-gray-600">
        <h2 className="text-3xl font-bold">Product Not Found 😢</h2>
        <Link to="/" className="text-blue-500 mt-4 inline-block hover:underline">
          Go Back Home
        </Link>
      </div>
    );
  }

  // Flag logic
  let flag = "";
  switch ((product.originCountry || "").toLowerCase()) {
    case "usa":
      flag = "🇺🇸"; break;
    case "germany":
      flag = "🇩🇪"; break;
    case "china":
      flag = "🇨🇳"; break;
    case "japan":
      flag = "🇯🇵"; break;
    case "south korea":
      flag = "🇰🇷"; break;
    case "india":
      flag = "🇮🇳"; break;
    case "malaysia":
      flag = "🇲🇾"; break;
    default:
      flag = "🌐";
  }

  const handleImport = () => {
    if (importQuantity <= 0 || importQuantity > product.availableQuantity) return;
    setSubmitting(true);

    // Send request to backend to decrease availableQuantity
    fetch(`http://localhost:4000/products/import/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: importQuantity }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProduct(data); // update product state
        setShowModal(false);
        setImportQuantity(0);
        setSubmitting(false);
        alert("Product imported successfully!");
      })
      .catch((err) => {
        console.error(err);
        setSubmitting(false);
        alert("Failed to import product.");
      });
  };

  return (
    <div className="max-w-5xl mx-auto py-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="grid md:grid-cols-2 gap-10 items-center bg-white shadow-lg rounded-3xl p-8"
      >
        <img
          src={product.image}
          alt={product.name}
          className="rounded-2xl w-full object-cover h-80 shadow"
        />
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h2>
          <p className="text-gray-600 mb-3">{product.description}</p>

          <p className="text-gray-700 mb-1"><strong>Price:</strong> ${product.price}</p>

          <p className="text-gray-700 mb-1 flex items-center gap-2">
            <strong>Origin:</strong> {flag} {product.originCountry}
          </p>

          <p className="text-gray-700 mb-1">
            <strong>Available:</strong> {product.availableQuantity} pcs
          </p>

          <p className="text-gray-700 mb-3"><strong>Rating:</strong> ⭐ {product.rating}</p>

          <div className="flex gap-4 mt-5">
            <Link
              to="/"
              className="inline-block bg-gray-300 text-gray-800 px-6 py-2 rounded-xl hover:bg-gray-400 transition"
            >
              ← Back to Home
            </Link>

            <button
              onClick={() => setShowModal(true)}
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
            >
              Import Now
            </button>
          </div>
        </div>
      </motion.div>

      {/* Import Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl w-96 relative">
            <h3 className="text-2xl font-bold mb-4">Import Product</h3>
            <p className="mb-2">Available Quantity: {product.availableQuantity}</p>
            <input
              type="number"
              min="1"
              max={product.availableQuantity}
              value={importQuantity}
              onChange={(e) => setImportQuantity(Number(e.target.value))}
              className="w-full border p-2 rounded mb-4"
              placeholder="Enter quantity"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleImport}
                disabled={importQuantity <= 0 || importQuantity > product.availableQuantity || submitting}
                className={`px-4 py-2 rounded text-white transition ${
                  importQuantity <= 0 || importQuantity > product.availableQuantity || submitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {submitting ? "Importing..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
