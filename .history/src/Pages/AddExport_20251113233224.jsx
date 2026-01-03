import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const AddExport = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: "",
    image: "",
    price: "",
    originCountry: "",
    rating: "",
    availableQuantity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.productName ||
      !formData.image ||
      !formData.price ||
      !formData.originCountry ||
      !formData.rating ||
      !formData.availableQuantity
    ) {
      toast.error("Please fill all fields!");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await fetch("https://back-end-server-theta.vercel.app/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: formData.productName,
          image: formData.image,
          price: Number(formData.price),
          originCountry: formData.originCountry,
          rating: Number(formData.rating),
          availableQuantity: Number(formData.availableQuantity),
          userEmail: user?.email || "unknown",
        }),
      });

      if (!response.ok) throw new Error("Failed to add product");

      toast.success("Product added successfully!");
      setFormData({
        productName: "",
        image: "",
        price: "",
        originCountry: "",
        rating: "",
        availableQuantity: "",
      });

      setTimeout(() => navigate("/all-products"), 1500);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong, try again!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 relative overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Background shapes */}
      <motion.div
        className="absolute w-56 sm:w-72 md:w-80 h-56 sm:h-72 md:h-80 bg-purple-300 rounded-full -top-20 -left-20 opacity-30"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      />
      <motion.div
        className="absolute w-72 sm:w-96 h-72 sm:h-96 bg-pink-200 rounded-full -bottom-24 -right-24 opacity-20"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 w-full max-w-sm sm:max-w-md md:max-w-lg z-10"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800">
          Add Export / Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          {[
            { label: "Product Name", name: "productName", type: "text", placeholder: "Enter product name" },
            { label: "Image URL", name: "image", type: "text", placeholder: "Enter image URL" },
            { label: "Price ($)", name: "price", type: "number", placeholder: "Enter price" },
            { label: "Origin Country", name: "originCountry", type: "text", placeholder: "Enter origin country" },
            { label: "Rating (0-5)", name: "rating", type: "number", placeholder: "Enter rating", min: 0, max: 5, step: 0.1 },
            { label: "Available Quantity", name: "availableQuantity", type: "number", placeholder: "Enter quantity" },
          ].map((field) => (
            <div key={field.name} className="relative w-full">
              <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                min={field.min}
                max={field.max}
                step={field.step}
                className="w-full p-2.5 sm:p-3 border border-gray-300 text-green-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm sm:text-base"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2.5 sm:py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 text-sm sm:text-base"
          >
            Add Product
          </button>
        </form>
      </motion.div>

      <ToastContainer position="bottom-center" autoClose={2000} />
    </div>
  );
};

export default AddExport;
