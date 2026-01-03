import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiPackage,
  FiImage,
  FiDollarSign,
  FiGlobe,
  FiStar,
  FiBox,
  FiPlusCircle,
} from "react-icons/fi";

const AddExport = () => {
  //const { theme } = useOutletContext();  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: "",
    image: "",
    price: "",
    originCountry: "",
    rating: "",
    availableQuantity: "",
  });

  const [loading, setLoading] = useState(false); // submit loader

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.productName ||
      !formData.image ||
      !formData.price ||
      !formData.originCountry ||
      !formData.rating ||
      !formData.availableQuantity
    ) {
      toast.error("⚠️ Please fill all fields!");
      return;
    }

    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await fetch("https://back-end-server-theta.vercel.app/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: formData.productName.trim(),
          image: formData.image.trim(),
          price: Number(formData.price),
          originCountry: formData.originCountry.trim(),
          rating: Number(formData.rating),
          availableQuantity: Number(formData.availableQuantity),
          userEmail: user?.email || "unknown",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add product");
      }

      toast.success("✅ Product added successfully!");
      
      // Reset form
      setFormData({
        productName: "",
        image: "",
        price: "",
        originCountry: "",
        rating: "",
        availableQuantity: "",
      });

      // Redirect after success
      setTimeout(() => navigate("/my-exports"), 2000);
    } catch (error) {
      console.error(error);
      toast.error("❌ " + (error.message || "Something went wrong!"));
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { label: "Product Name", name: "productName", icon: FiPackage, placeholder: "e.g. Wireless Earbuds Pro" },
    { label: "Image URL", name: "image", icon: FiImage, placeholder: "https://example.com/image.jpg" },
    { label: "Price ($)", name: "price", icon: FiDollarSign, type: "number", placeholder: "299" },
    { label: "Origin Country", name: "originCountry", icon: FiGlobe, placeholder: "e.g. Japan" },
    { label: "Rating (0-5)", name: "rating", icon: FiStar, type: "number", step: "0.1", min: "0", max: "5", placeholder: "4.8" },
    { label: "Available Quantity", name: "availableQuantity", icon: FiBox, type: "number", placeholder: "500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      {/* Header */}
      <div className="text-center mb-10">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-black mb-4"
        >
          <span className="text-gray-800 dark:text-white">Add New</span>{" "}
          <span className="text-transparent bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text">
            Export Product
          </span>
        </motion.h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          List a new tech gadget for export
        </p>
      </div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50 p-8 sm:p-10"
      >
        <form onSubmit={handleSubmit} className="space-y-7">
          {fields.map((field) => (
            <div key={field.name} className="relative">
              <label className="flex items-center gap-3 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <field.icon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                {field.label}
              </label>
              <input
                type={field.type || "text"}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                min={field.min}
                max={field.max}
                step={field.step}
                required
                className="w-full px-5 py-4 bg-gray-50/70 dark:bg-gray-700/70 border border-gray-300 dark:border-gray-600 rounded-2xl 
                  text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                  focus:outline-none focus:ring-4 focus:ring-blue-400/50 focus:border-blue-500 
                  transition-all duration-300 text-base"
              />
            </div>
          ))}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-green-600 
              hover:from-blue-700 hover:to-green-700 text-white py-5 rounded-2xl font-bold text-lg 
              shadow-xl hover:shadow-2xl transition-all duration-500 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-4 border-white border-t-transparent rounded-full"
                />
                Adding Product...
              </>
            ) : (
              <>
                <FiPlusCircle className="w-7 h-7" />
                Add Export Product
              </>
            )}
          </motion.button>
        </form>
      </motion.div>

      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        theme={theme === "dark" ? "dark" : "light"}
        toastClassName="font-medium"
      />
    </div>
  );
};

export default AddExport;