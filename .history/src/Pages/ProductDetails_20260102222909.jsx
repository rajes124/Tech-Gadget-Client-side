import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  DollarSign,
  Globe,
  Package,
  Star,
  ArrowLeft,
  Truck,
  ChevronLeft,
  ChevronRight,
  Shield,
} from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [importQuantity, setImportQuantity] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://back-end-server-theta.vercel.app/products/${id}`);
        const data = await res.json();
        setProduct(data);

        const relatedRes = await fetch(`https://back-end-server-theta.vercel.app/products`);
        const allProducts = await relatedRes.json();
        const filtered = allProducts.filter(p => p._id !== id).slice(0, 4);
        setRelatedProducts(filtered);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center transition-colors">
        <div className="space-y-4 w-full max-w-6xl mx-auto px-6">
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/3 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse" />
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center transition-colors">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100">Product Not Found</h2>
          <Link to="/" className="mt-6 inline-block text-indigo-600 dark:text-indigo-400 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const images = [product.image, product.image, product.image];
  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleImport = () => {
    if (!user) {
      toast.error("Please login first!");
      navigate("/login");
      return;
    }
    if (importQuantity < 1 || importQuantity > product.availableQuantity) {
      toast.warn("Please enter a valid quantity!");
      return;
    }

    setSubmitting(true);
    fetch(`https://back-end-server-theta.vercel.app/products/import/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: importQuantity, userId: user.uid }),
    })
      .then(res => res.json())
      .then(() => {
        toast.success("Product imported successfully!");
        setShowModal(false);
        setImportQuantity(1);
        navigate("/my-imports");
      })
      .catch(() => {
        toast.error("Import failed. Try again.");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-gray-950 py-12 px-6 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 dark:text-gray-400 mb-8">
            <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-indigo-600 dark:hover:text-indigo-400">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 dark:text-gray-100">{product.name}</span>
          </nav>

          {/* Main Product Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white dark:bg-black rounded-3xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800 transition-colors"
          >
            {/* Image Gallery */}
            <div className="relative bg-gray-50 dark:bg-gray-900">
              <motion.img
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={images[currentImageIndex]}
                alt={product.name}
                className="w-full h-96 lg:h-full object-cover"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-900/90 p-3 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-900 dark:text-gray-200" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-900/90 p-3 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-900 dark:text-gray-200" />
                  </button>
                </>
              )}
              <div className="flex gap-2 p-4 justify-center bg-white dark:bg-black">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-3 transition ${
                      idx === currentImageIndex
                        ? "border-indigo-600 dark:border-indigo-500"
                        : "border-gray-300 dark:border-gray-700"
                    }`}
                  >
                    <img src={images[idx]} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="p-8 lg:p-12 flex flex-col justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {product.name}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  {product.description}
                </p>

                <div className="grid grid-cols-2 gap-6 mb-10">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${product.price?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Package className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Available Stock</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {product.availableQuantity} pcs
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Origin</p>
                      <p className="text-xl font-semibold text-gray-900 dark:text-white">
                        {product.originCountry}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="w-6 h-6 text-yellow-500 dark:text-yellow-400 fill-current" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Rating</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {product.rating} / 5
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Link
                  to="/"
                  className="flex-1 flex items-center justify-center gap-2 py-4 px-6 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Home
                </Link>
                <button
                  onClick={() => setShowModal(true)}
                  className="flex-1 flex items-center justify-center gap-3 py-4 px-8 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:from-indigo-700 hover:to-blue-700 transition"
                >
                  <Truck className="w-6 h-6" />
                  Import Product
                </button>
              </div>
            </div>
          </motion.div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-20">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((rel) => (
                  <Link
                    key={rel._id}
                    to={`/product/${rel._id}`}
                    className="bg-white dark:bg-black rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition border border-gray-200 dark:border-gray-800"
                  >
                    <img src={rel.image} alt={rel.name} className="w-full h-48 object-cover" />
                    <div className="p-5">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white truncate">{rel.name}</h3>
                      <p className="text-indigo-600 dark:text-indigo-400 font-bold mt-2">${rel.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Import Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white dark:bg-black rounded-3xl p-8 w-full max-w-md shadow-2xl border border-gray-200 dark:border-gray-800"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <Truck className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                Confirm Import
              </h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Quantity (Max: {product.availableQuantity})
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={product.availableQuantity}
                    value={importQuantity}
                    onChange={(e) => setImportQuantity(Math.max(1, Math.min(product.availableQuantity, Number(e.target.value))))}
                    className="w-full px-5 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="pt-4 flex gap-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-3 px-6 border border-gray-300 dark:border-gray-700 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-800 dark:text-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleImport}
                    disabled={submitting}
                    className="flex-1 py-3 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2"
                  >
                    {submitting ? "Processing..." : (
                      <>
                        <Shield className="w-5 h-5" />
                        Confirm Import
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer position="bottom-right" theme="colored" />
    </>
  );
};

export default ProductDetails;