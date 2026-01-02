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
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        {/* skeleton */}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        {/* not found */}
      </div>
    );
  }

  const images = [product.image, product.image, product.image];

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleImport = () => {
    // same as before
  };

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-black py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 dark:text-gray-400 mb-8">
            {/* same */}
          </nav>

          {/* Main Card */}
          <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white dark:bg-black rounded-3xl shadow-2xl overflow-hidden border border-gray-300 dark:border-gray-700">
            {/* Image */}
            <div className="relative bg-gray-50 dark:bg-gray-900">
              {/* image gallery same */}
            </div>

            {/* Info */}
            <div className="p-8 lg:p-12 flex flex-col justify-between">
              {/* info same */}
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
                    className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
                  >
                    <div className="bg-white dark:bg-gray-800 p-4"> {/* এটা যোগ করলাম যাতে image-এর নিচে white space থাকে light mode-এ */}
                      <img src={rel.image} alt={rel.name} className="w-full h-48 object-contain mx-auto" />
                    </div>
                    <div className="p-6 bg-white dark:bg-black">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white truncate">{rel.name}</h3>
                      <p className="text-indigo-600 dark:text-indigo-400 font-bold mt-3 text-xl">${rel.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Modal same */}
      <ToastContainer position="bottom-right" theme="colored" />
    </>
  );
};

export default ProductDetails;