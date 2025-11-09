import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaGlobeAsia, FaHandshake, FaShieldAlt, FaTruck } from "react-icons/fa";
import { motion } from "framer-motion";
import videoFile from "../assets/video.mp4"; 

const Home = () => {
  const [products, setProducts] = useState([]);

  // Demo data (will be replaced with MongoDB data later)
  useEffect(() => {
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
      },
    ];
    setProducts(demoData);
  }, []);

  return (
    <div className="w-full font-sans text-gray-700 bg-gradient-to-b from-gray-100 via-gray-50 to-white">

      {/* Hero Section */}
     <section className="flex flex-col justify-center items-center min-h-[80vh] text-center px-6 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
  {/* Animated background circles */}
  <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
  <div className="absolute -bottom-16 -right-16 w-96 h-96 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>

  {/* Motion container for smooth entry */}
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.2, ease: "easeOut" }}
    className="flex flex-col items-center"
  >
    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-gray-900">
      Welcome to{" "}
      <span className="text-blue-600">Tech Gadget Import Export Hub</span>
    </h1>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 1 }}
      className="text-gray-600 mb-8 max-w-2xl text-lg"
    >
      A modern global marketplace where technology meets opportunity. Import
      and export the latest tech gadgets with just one click.
    </motion.p>
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link
        to="/all-products"
        className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-3 rounded-xl shadow-lg font-semibold"
      >
        Browse Products
      </Link>
    </motion.div>
  </motion.div>
</section>

      {/* Banner Section */}
    <section className="h-[60vh] flex items-center justify-center text-center relative overflow-hidden">
  {/* Video Background */}
  <video
    src={videoFile}
    autoPlay
    loop
    muted
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* Motion container with 3D/video-like animation */}
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.98, rotateX: 2 }}
    animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
    transition={{ duration: 1.2, ease: "easeOut" }}
    className="bg-black/60 p-10 rounded-3xl max-w-3xl z-10 backdrop-blur-sm"
  >
    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
      Connect Global Tech Markets 🌍
    </h2>
    <p className="text-gray-200 text-lg">
      Import cutting-edge gadgets, export innovation — all in one secure platform.
    </p>
  </motion.div>

  {/* Subtle floating animation for depth */}
  <motion.div
    className="absolute inset-0"
    animate={{ scale: [1, 1.02, 1], rotate: [0, 1, 0, -1, 0] }}
    transition={{
      duration: 15,
      repeat: Infinity,
      repeatType: "loop",
      ease: "linear",
    }}
  />
</section>

      {/* Latest Products Section */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
           <span  className="text-black">Latest</span> <span className="text-blue-600">Tech Products</span>
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {products.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ scale: 1.05, y: -5 }}
              className="border rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden bg-white transition-transform duration-300"
            >
              <div className="relative group">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-white/80 px-2 py-1 rounded-full text-sm font-semibold text-gray-800 shadow">
                  ⭐ {p.rating}
                </div>
              </div>
              <div className="p-5 text-left">
                <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
                <p className="text-gray-600 mb-1">Price: {p.price}</p>
                <p className="text-gray-600 mb-1">Origin: {p.country}</p>
                <p className="text-gray-600 mb-3">Available: {p.quantity} pcs</p>
                <Link
                  to={`/product/${p.id}`}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  See Details &rarr;
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gradient-to-r from-blue-100 to-blue-50 py-20 px-6">
  <h2 className="text-3xl font-bold text-center mb-16">
    Why Choose{" "}
    <span className="text-blue-700">Tech Gadget Import Export Hub?</span>
  </h2>
  <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-10">
    {[
      {
        icon: <FaGlobeAsia size={40} className="text-blue-600" />,
        title: "Global Network",
        desc: "Connect with suppliers and buyers across 100+ countries.",
      },
      {
        icon: <FaShieldAlt size={40} className="text-blue-600" />,
        title: "Secure Platform",
        desc: "Your deals and data are always protected with encryption.",
      },
      {
        icon: <FaTruck size={40} className="text-blue-600" />,
        title: "Fast Logistics",
        desc: "Reliable and speedy delivery through verified partners.",
      },
      {
        icon: <FaHandshake size={40} className="text-blue-600" />,
        title: "Trusted Partnership",
        desc: "Build long-term trade relationships with global exporters.",
      },
    ].map((item, idx) => (
      <motion.div
        key={idx}
        whileHover={{ y: -8, scale: 1.03 }}
        className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl text-center transition-all duration-300"
      >
        <div className="flex justify-center mb-4">{item.icon}</div>
        <h3 className="font-semibold text-lg mb-2 text-gray-800">{item.title}</h3>
        <p className="text-gray-600">{item.desc}</p>
      </motion.div>
    ))}
  </div>
</section>

      {/* Global Partners Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">
         <span className="text-black"> Our</span> <span className="text-blue-600">Global Partners</span>
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-90">
          {[
            { src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", alt: "Amazon" },
            { src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", alt: "Apple" },
            { src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", alt: "Microsoft" },
            { src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Alibaba_Group_logo.svg", alt: "Alibaba" },
            { src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Samsung_logo.svg", alt: "Samsung" },
          ].map((p, idx) => (
            <motion.img
              key={idx}
              src={p.src}
              alt={p.alt}
              className="h-12 hover:scale-110 transition-transform duration-300"
              whileHover={{ scale: 1.1 }}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
