import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaGlobeAsia, FaHandshake, FaShieldAlt, FaTruck } from "react-icons/fa";
import { motion } from "framer-motion";
import videoFile from "../assets/video.mp4";

const Home = ({ theme }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const isDark = theme === "dark";

  return (
    <div className={`w-full font-sans ${isDark ? "bg-gray-900 text-gray-100" : "text-gray-700 bg-gradient-to-b from-gray-100 via-gray-50 to-white"}`}>

      {/* Hero Section */}
      <section className={`flex flex-col justify-center items-center min-h-[70vh] text-center px-6 md:px-12 relative overflow-hidden ${
        isDark ? "bg-gray-800" : "bg-gradient-to-b from-blue-50 to-white"
      }`}>
        <div className="absolute -top-20 -left-20 w-72 h-72 md:w-96 md:h-96 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-16 -right-16 w-72 h-72 md:w-96 md:h-96 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center max-w-3xl"
        >
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
            Welcome to <span className="text-blue-600">Tech Gadget Import Export Hub</span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className={`mb-8 max-w-xl sm:max-w-2xl text-base sm:text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            A modern global marketplace where technology meets opportunity. Import and export the latest tech gadgets with just one click.
          </motion.p>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
            <Link
              to="/all-products"
              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl shadow-lg font-semibold text-sm sm:text-base"
            >
              Browse Products
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Banner Section with Video */}
      <section className="h-[50vh] sm:h-[55vh] md:h-[60vh] flex items-center justify-center text-center relative overflow-hidden">
        <video
          src={videoFile}
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className={`absolute inset-0 ${isDark ? "bg-black/60" : "bg-black/40"}`}></div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className={`p-6 sm:p-10 rounded-2xl md:rounded-3xl max-w-xl sm:max-w-3xl z-10 backdrop-blur-sm ${
            isDark ? "bg-gray-900/60" : "bg-black/60"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">
            Connect Global Tech Markets 🌍
          </h2>
          <p className="text-gray-200 text-sm sm:text-base md:text-lg">
            Import cutting-edge gadgets, export innovation — all in one secure platform.
          </p>
        </motion.div>
      </section>

      {/* Latest Products Section */}
      <section className="max-w-6xl mx-auto py-16 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">
          <span className={isDark ? "text-white" : "text-black"}>Latest</span>{" "}
          <span className="text-blue-600">Tech Products</span>
        </h2>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : (
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
  {products.slice(0, 6).map((p) => {
    let flag = "";
    switch ((p.originCountry || "").toLowerCase()) {
      case "usa": flag = "🇺🇸"; break;
      case "germany": flag = "🇩🇪"; break;
      case "china": flag = "🇨🇳"; break;
      case "japan": flag = "🇯🇵"; break;
      case "south korea": flag = "🇰🇷"; break;
      case "india": flag = "🇮🇳"; break;
      case "malaysia": flag = "🇲🇾"; break;
      default: flag = "🌐";
    }

    return (
      <motion.div
        key={p._id}
        whileHover={{ rotateY: 5, rotateX: -3, scale: 1.05, y: -6 }}
        transition={{ type: "spring", stiffness: 150, damping: 10 }}
        className={`bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl 
          overflow-hidden transition-transform duration-500 relative group border border-gray-100 dark:border-gray-700 
          w-full max-w-sm sm:max-w-full mx-auto flex flex-col h-full`}
      >
        <div className="relative overflow-hidden h-48 sm:h-56 md:h-60">
          <img
            src={p.image}
            alt={p.name}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
          />
          <div className="absolute top-2 left-2 bg-yellow-400 px-2 py-1 rounded-full font-semibold text-xs sm:text-sm shadow">
            ⭐ {p.rating}
          </div>
        </div>

        <div className="p-4 sm:p-5 flex flex-col justify-between h-52 sm:h-56">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-1 text-gray-900 dark:text-gray-100">{p.name}</h3>
            <p className="font-semibold text-sm sm:text-base mb-1 text-gray-800 dark:text-gray-300">Price: ${p.price}</p>
            <p className="text-xs sm:text-sm flex items-center gap-1 mb-2 text-gray-600 dark:text-gray-400">{flag} {p.originCountry || "Unknown"}</p>
            <span className={`inline-block px-2 py-1 rounded-full font-semibold text-xs sm:text-sm ${
              p.availableQuantity > 50
                ? "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300"
                : p.availableQuantity > 20
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-300"
                : "bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-300"
            }`}>
              {p.availableQuantity} pcs Available
            </span>
          </div>
          <Link to={`/product/${p._id}`}>
            <button className="w-full mt-3 sm:mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 sm:py-2.5 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 text-sm sm:text-base">
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
      <section className={`py-16 sm:py-20 px-4 sm:px-6 ${
        isDark ? "bg-gray-800" : "bg-gradient-to-r from-blue-100 to-blue-50"
      }`}>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">
          Why Choose <span className={isDark ? "text-blue-400" : "text-blue-700"}>Tech Gadget Import Export Hub?</span>
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
          {[{ icon: <FaGlobeAsia size={40} className="text-blue-600" />, title: "Global Network", desc: "Connect with suppliers and buyers across 100+ countries." },
            { icon: <FaShieldAlt size={40} className="text-blue-600" />, title: "Secure Platform", desc: "Your deals and data are always protected with encryption." },
            { icon: <FaTruck size={40} className="text-blue-600" />, title: "Fast Logistics", desc: "Reliable and speedy delivery through verified partners." },
            { icon: <FaHandshake size={40} className="text-blue-600" />, title: "Trusted Partnership", desc: "Build long-term trade relationships with global exporters." }].map((item, idx) => (
            <motion.div key={idx} whileHover={{ y: -5, scale: 1.03 }} className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl text-center transition-all duration-300 ${isDark ? "bg-gray-900 text-gray-100" : "bg-gradient-to-br from-white to-blue-50"}`}>
              <div className="flex justify-center mb-3">{item.icon}</div>
              <h3 className="font-semibold text-lg sm:text-xl mb-2">{item.title}</h3>
              <p className="text-sm sm:text-base">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Global Partners Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10">
          <span className={isDark ? "text-white" : "text-black"}> Our</span>{" "}
          <span className="text-blue-600">Global Partners</span>
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-12 opacity-90">
          {[{ src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", alt: "Amazon" },
            { src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", alt: "Apple" },
            { src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", alt: "Microsoft" },
            { src: "https://upload.wikimedia.org/wikipedia/commons/8/88/Alibaba_Group_Logo.png", alt: "Alibaba" },
            { src: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg", alt: "Samsung" }].map((p, idx) => (
            <motion.img
              key={idx}
              src={p.src}
              alt={p.alt}
              className="h-10 sm:h-12 hover:scale-110 transition-transform duration-300"
              whileHover={{ scale: 1.1 }}
            />
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;
