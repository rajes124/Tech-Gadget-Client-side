import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaGlobeAsia, FaHandshake, FaShieldAlt, FaTruck } from "react-icons/fa";
import { motion } from "framer-motion";
import videoFile from "../assets/video.mp4"; 

const Home = () => {
  const [products, setProducts] = useState([]);

  
useEffect(() => {
  fetch("http://localhost:4000/products") // <-- এখানে ঠিক করা
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    })
    .then((data) => setProducts(data))
    .catch((error) => console.error("Error fetching products:", error));
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
    <span className="text-black">Latest</span>{" "}
    <span className="text-blue-600">Tech Products</span>
  </h2>

  {products.length === 0 ? (
    <p className="text-center text-gray-500">Loading products...</p>
  ) : (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
      {products.slice(0, 6).map((p) => {  // <-- এখানে slice(0, 6) যোগ হয়েছে
        let flag = "";
        switch ((p.originCountry || "").toLowerCase()) {
          case "usa":
            flag = "🇺🇸";
            break;
          case "germany":
            flag = "🇩🇪";
            break;
          case "china":
            flag = "🇨🇳";
            break;
          case "japan":
            flag = "🇯🇵";
            break;
          case "south korea":
            flag = "🇰🇷";
            break;
          case "india":
            flag = "🇮🇳";
            break;
          case "malaysia":
            flag = "🇲🇾";
            break;
          default:
            flag = "🌐";
        }

        return (
          <motion.div
            key={p._id}
            whileHover={{ scale: 1.08, y: -10 }}
            className="bg-white rounded-3xl shadow-xl hover:shadow-2xl overflow-hidden transition-transform duration-500 relative group"
          >
            {/* Product Image */}
            <div className="relative overflow-hidden">
              <img
                src={p.image}
                alt={p.name}
                className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
              />
              {/* Rating */}
              <div className="absolute top-3 left-3 bg-yellow-400 px-3 py-1 rounded-full font-semibold text-sm shadow">
                ⭐ {p.rating}
              </div>
            </div>

            {/* Details */}
            <div className="p-5 flex flex-col justify-between h-56">
              <div className="mb-3">
                <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
                <p className="text-gray-800 font-semibold mb-1">
                  Price: ${p.price}
                </p>
                <p className="text-gray-600 mb-2 flex items-center gap-2">
                  {flag} {p.originCountry || "Unknown"}
                </p>
                <span
                  className={`inline-block px-3 py-1 rounded-full font-semibold text-sm 
                    ${p.availableQuantity > 50
                      ? "bg-green-100 text-green-800"
                      : p.availableQuantity > 20
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"}`}
                >
                  {p.availableQuantity} pcs Available
                </span>
              </div>

              <Link to={`/product/${p._id}`}>
                <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300">
                  See Details
                </button>
              </Link>
            </div>
          </motion.div>
        );
      })}
    </div>
  )}
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
