import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // Demo Data (same as Home.jsx)
  const demoData = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1581092334539-0a8a8d6a4903?w=800",
      name: "Smartphone X Pro",
      price: "$950",
      country: "Japan",
      rating: 4.9,
      quantity: 25,
      description:
        "The Smartphone X Pro delivers cutting-edge performance with a triple-camera system and AI-enhanced processing. Perfect for photography lovers.",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800",
      name: "Drone Camera Ultra",
      price: "$799",
      country: "China",
      rating: 4.7,
      quantity: 40,
      description:
        "Experience ultra-stable 4K footage with Drone Camera Ultra, featuring GPS tracking, 3-axis gimbal, and 30-minute flight time.",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1606813902916-5d1b2f95f4f6?w=800",
      name: "Smart Laptop 15 Pro",
      price: "$1200",
      country: "USA",
      rating: 4.8,
      quantity: 10,
      description:
        "A professional-grade laptop with next-gen Intel processor, sleek metal design, and vibrant 4K display.",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
      name: "Gaming Console 5",
      price: "$650",
      country: "Korea",
      rating: 4.6,
      quantity: 15,
      description:
        "Enjoy next-gen gaming with ultra-realistic graphics, haptic feedback, and immersive sound.",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1593642634367-d91a135587b5?w=800",
      name: "Wireless Headphones",
      price: "$120",
      country: "Germany",
      rating: 4.5,
      quantity: 50,
      description:
        "Noise-cancelling wireless headphones with 30-hour battery life and crystal-clear audio.",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1580894732444-8ecdedc071cc?w=800",
      name: "Smart Speaker 360",
      price: "$199",
      country: "India",
      rating: 4.4,
      quantity: 35,
      description:
        "Voice-controlled smart speaker with 360° sound and multi-language assistant support.",
    },
  ];

  // Filter product by ID
  useEffect(() => {
    const found = demoData.find((p) => p.id === parseInt(id));
    setProduct(found);
  }, [id]);

  if (!product) {
    return (
      <div className="text-center mt-20 text-gray-600">
        <h2 className="text-3xl font-bold">Product Not Found 😢</h2>
        <Link to="/" className="text-blue-500 mt-4 inline-block hover:underline">
          Go Back Home
        </Link>
      </div>
    );
  }

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
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            {product.name}
          </h2>
          <p className="text-gray-600 mb-3">{product.description}</p>
          <p className="text-gray-700 mb-1">
            <strong>Price:</strong> {product.price}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Origin:</strong> {product.country}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Available:</strong> {product.quantity} pcs
          </p>
          <p className="text-gray-700 mb-3">
            <strong>Rating:</strong> ⭐ {product.rating}
          </p>
          <Link
            to="/"
            className="mt-5 inline-block bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetails;
