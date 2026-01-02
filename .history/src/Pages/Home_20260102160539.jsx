import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaGlobeAsia, FaHandshake, FaShieldAlt, FaTruck, FaStar, FaUsers, FaChartLine, FaCheckCircle, FaComment, FaDownload } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import videoFile from "../assets/video.mp4";

const Home = ({ theme }) => {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({ totalProducts: 0, totalUsers: 0, totalExports: 0 });
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    // Fetch products
    fetch("https://back-end-server-theta.vercel.app/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });

    // Fetch stats
    fetch("https://back-end-server-theta.vercel.app/stats")
      .then(res => res.json())
      .then(setStats)
      .catch(() => setStats({ totalProducts: 1200, totalUsers: 45000, totalExports: 2500 }));

    // Sample testimonials (replace with backend API)
    setTestimonials([
      { name: "Rahim Khan", role: "Exporter, Dhaka", text: "Secured my first $50K export deal in 2 weeks!", rating: 5 },
      { name: "Ayesha Rahman", role: "Importer, Chittagong", text: "Best platform for tech gadgets. Fast delivery!", rating: 5 },
      { name: "Karim Uddin", role: "Supplier, Malaysia", text: "Global reach with zero hassle. 5⭐", rating: 5 }
    ]);
  }, []);

  const isDark = theme === "dark";

  // Skeleton Loader Component
  const SkeletonCard = () => (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg animate-pulse overflow-hidden border border-gray-100 dark:border-gray-700">
      <div className="h-48 sm:h-56 md:h-60 bg-gray-200 dark:bg-gray-700 rounded-t-3xl"></div>
      <div className="p-5 space-y-3">
        <div className="h-5 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-600 rounded-xl w-full"></div>
      </div>
    </div>
  );

  // Country Flag Mapping
  const getFlag = (country) => {
    const flags = {
      "usa": "🇺🇸", "germany": "🇩🇪", "china": "🇨🇳", "japan": "🇯🇵",
      "south korea": "🇰🇷", "india": "🇮🇳", "malaysia": "🇲🇾", "bangladesh": "🇧🇩"
    };
    return flags[(country || "").toLowerCase()] || "🌐";
  };

  // Auto testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className={`w-full font-sans ${isDark ? "bg-gray-900 text-gray-100" : "text-gray-700 bg-gradient-to-br from-gray-50 to-blue-50/30"} min-h-screen`}>
      
    {/* Hero Section - Fixed overlap issue */}
<section className={`flex flex-col justify-center items-center min-h-screen pt-20 pb-12 text-center px-6 md:px-12 relative overflow-hidden ${
  isDark ? "bg-gradient-to-br from-gray-800 to-gray-900" : "bg-gradient-to-br from-blue-50 via-white to-blue-100/50"
}`}>
  <div className="absolute inset-0">
    <div className="absolute -top-20 -left-20 w-72 h-72 md:w-96 md:h-96 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
    <div className="absolute -bottom-20 -right-20 w-72 h-72 md:w-96 md:h-96 bg-green-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
    <div className="absolute top-20 right-10 w-40 h-40 md:w-60 md:h-60 bg-blue-300/20 rounded-full blur-lg animate-bounce"></div>
  </div>

  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.2, ease: "easeOut" }}
    className="relative z-10 flex flex-col items-center max-w-4xl mx-auto"
  >
    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: "spring" }}>
      <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold mb-6">
        <FaGlobeAsia className="mr-2" /> Global Tech Marketplace
      </div>
    </motion.div>
    
    <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight ${
      isDark ? "text-white drop-shadow-2xl" : "bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent drop-shadow-lg"
    }`}>
      Tech Gadget <span className="text-transparent bg-gradient-to-r from-blue-600 via-green-500 to-blue-600 bg-clip-text">Import Export</span> Hub
    </h1>
    
    <motion.p
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 1 }}
      className="text-xl sm:text-2xl max-w-2xl mb-10 leading-relaxed opacity-90 text-gray-700 dark:text-gray-300"
    >
      Connect with 50K+ global suppliers. Import cutting-edge gadgets, export innovation. Secure. Fast. Profitable.
    </motion.p>
    
    <motion.div 
      className="flex flex-col sm:flex-row gap-4 items-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
    >
      <Link
        to="/all-products"
        className="group relative bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
      >
        <span>🚀 Browse 1,200+ Products</span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
      </Link>
      <Link
        to="/about"
        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold py-3 px-6 border-2 border-blue-200 dark:border-blue-800/50 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
      >
        Learn More <FaChartLine />
      </Link>
    </motion.div>
  </motion.div>

  {/* Scroll hint */}
  <motion.div 
    animate={{ y: [0, 8, 0] }}
    transition={{ repeat: Infinity, duration: 2 }}
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-60"
  >
    <div className="w-6 h-10 border-2 border-blue-400 rounded-full flex justify-center">
      <div className="w-1 h-3 bg-blue-400 rounded-full mt-2 animate-bounce"></div>
    </div>
  </motion.div>
</section>

      {/* 2. Video Banner Section */}
      <section className="relative h-[50vh] sm:h-[55vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <video
          src={videoFile}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className={`absolute inset-0 ${isDark ? "bg-gradient-to-t from-gray-900/80 to-black/60" : "bg-gradient-to-t from-blue-900/60 via-black/40 to-transparent"}`}></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-center text-white px-6 md:px-12 max-w-5xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 drop-shadow-2xl bg-gradient-to-r from-blue-300 via-white to-green-300 bg-clip-text text-transparent">
            🌍 Connect Global Tech Markets
          </h2>
          <div className="text-xl sm:text-2xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            <span>Import from Japan 🇯🇵, Germany 🇩🇪, USA 🇺🇸</span>
            <span className="block sm:inline ml-4">Export to 100+ countries. 24/7 support.</span>
          </div>
        </motion.div>
      </section>

{/* 3. Stats Section - Clean & Visible in Both Modes */}
<section className="
  py-20 sm:py-24 px-6 md:px-12
  bg-gradient-to-b
  from-slate-50 via-white to-slate-100
  dark:from-gray-800 dark:via-gray-900 dark:to-gray-800
">
  <div className="max-w-6xl mx-auto text-center">
    <motion.h2 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"
    >
      Trusted by 45K+ Businesses
    </motion.h2>

    <p className="text-xl text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto">
      Join the world's largest tech import-export network
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
      {[
        { icon: FaStar, value: stats.totalProducts.toLocaleString() || "1,200", label: "Products", color: "text-blue-600 dark:text-blue-400" },
        { icon: FaUsers, value: stats.totalUsers.toLocaleString() || "45,000", label: "Active Users", color: "text-green-600 dark:text-green-400" },
        { icon: FaTruck, value: `$${(stats.totalExports || 2500).toLocaleString()}K`, label: "Total Exports", color: "text-purple-600 dark:text-purple-400" }
      ].map((stat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.2 }}
          className="
            group
            bg-white dark:bg-gray-800/80
            rounded-3xl p-10
            shadow-xl hover:shadow-2xl
            border border-gray-200 dark:border-gray-700
            transition-all duration-500
            hover:-translate-y-4
          "
        >
          <div className={`text-6xl md:text-7xl mb-6 ${stat.color} group-hover:scale-110 transition-transform duration-500`}>
            <stat.icon className="mx-auto" />
          </div>

          <div className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-3">
            {stat.value}
          </div>

          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>


{/* 4. Latest Products - With Skeleton Loader */}
<section className="py-20 sm:py-24 px-6 md:px-12 max-w-7xl mx-auto">
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
      <span className={isDark ? "text-white" : "text-gray-900"}>Latest</span>{" "}
      <span className="text-transparent bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text">Tech Products</span>
    </h2>
  <p className="text-lg md:text-xl font-medium text-gray-400 dark:text-gray-500 max-w-2xl mx-auto">
    Fresh arrivals from Japan, Germany, USA and more
  </p>
  </motion.div>

  {loading ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
      {Array(8).fill().map((_, idx) => <SkeletonCard key={idx} />)}
    </div>
  ) : products.length === 0 ? (
    <div className="text-center py-20">
      <FaTruck className="text-6xl text-gray-400 mx-auto mb-6" />
      <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-2">No products available</h3>
      <p className="text-lg text-gray-500 dark:text-gray-500">Check back soon for new arrivals</p>
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
      <AnimatePresence>
        {products.slice(0, 8).map((p, idx) => (
          <motion.div
            key={p._id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ 
              y: -12, 
              scale: 1.02, 
              rotateX: -5, 
              rotateY: 5,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            }}
            className="group bg-white/70 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-3xl 
              overflow-hidden transition-all duration-500 border border-white/50 dark:border-gray-700/50 
              hover:border-blue-200/50 dark:hover:border-blue-400/30 flex flex-col"
          >
            {/* Image Section */}
            <div className="relative overflow-hidden h-40 sm:h-44 md:h-48 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-700 dark:to-gray-800">
              <img
                src={p.image || "https://i.ibb.co/2kzH8v1/no-image.png"}
                alt={p.name}
                className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                onError={(e) => { e.target.src = "https://i.ibb.co/2kzH8v1/no-image.png"; }}
              />

              {/* Rating Badge - Top-left */}
              <div className="absolute top-2 left-2">
                <div className="bg-gradient-to-r from-yellow-400 to-amber-500 dark:from-yellow-500 dark:to-amber-600 text-black dark:text-white px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-md backdrop-blur-sm">
                  <svg className="w-3 h-3 fill-current text-yellow-600 dark:text-yellow-300" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span>{p.rating || 4.8}</span>
                  <span className="font-normal opacity-80">({Math.floor(Math.random() * 1000) + 100})</span>
                </div>
              </div>

              {/* TOP / HOT Badge - Top-right */}
              <div className="absolute top-2 right-2">
                <div className={`px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-md backdrop-blur-sm text-white ${
                  p.availableQuantity > 100 
                    ? "bg-gradient-to-r from-purple-500 to-pink-600 dark:from-purple-600 dark:to-pink-700" 
                    : "bg-gradient-to-r from-red-500 to-orange-600 dark:from-red-600 dark:to-orange-700"
                }`}>
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                    {p.availableQuantity > 100 ? (
                      // Trophy Icon for TOP
                      <path d="M18 2H6v2h-.5A2.5 2.5 0 003 6.5V8a3 3 0 002.5 2.95A4.99 4.99 0 009 15.9V22h6v-6.1a4.99 4.99 0 003.5-4.95A3 3 0 0021 8v-1.5A2.5 2.5 0 0018.5 4H18V2zM19 8a1 1 0 01-2 0V6h-2v2a1 1 0 01-2 0V6H9v2a1 1 0 01-2 0V6H5v1.5A.5.5 0 015.5 8h13a.5.5 0 01.5.5V8z"/>
                    ) : (
                      // Fire Icon for HOT
                      <path d="M12 23a1.5 1.5 0 01-1.5-1.5v-9.46a6.98 6.98 0 013-1.35 6.98 6.98 0 013 1.35V21.5A1.5 1.5 0 0115 23h-3zM12 0c-3.87 0-7 2.69-7 6 0 2.29 1.39 4.29 3.5 5.48V13h7v-1.52C17.61 10.29 19 8.29 19 6c0-3.31-3.13-6-7-6z"/>
                    )}
                  </svg>
                  <span>{p.availableQuantity > 100 ? "TOP" : "HOT"}</span>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-bold line-clamp-2 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {p.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400">
                    ${p.price?.toLocaleString() || "1,299"}
                  </span>
                  <span className="text-xs bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 px-2 py-0.5 rounded-full font-semibold">
                    Save 15%
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                  {getFlag(p.originCountry)} {p.originCountry || "Global Origin"}
                </div>
              </div>
              
              <div className="space-y-2 mt-4">
                <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M20 7h-3V4a1 1 0 00-1-1H8a1 1 0 00-1 1v3H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM9 5h6v2H9V5zm11 13H4V9h3v2h10V9h3v9z"/>
                    </svg>
                    {p.availableQuantity || 0} pcs left
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17v-2h2v2h-2zm1-3.5c-2.76 0-5-2.24-5-5h2c0 1.65 1.35 3 3 3s3-1.35 3-3-1.35-3-3-3v-1.5c2.76 0 5 2.24 5 5s-2.24 5-5 5z"/>
                    </svg>
                    Ships worldwide
                  </span>
                </div>

                <Link 
                  to={`/product/${p._id}`}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-2.5 px-4 rounded-2xl font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaDownload className="text-xs" /> View Details
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )}

  {!loading && products.length > 0 && (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-center mt-16"
    >
      <Link
        to="/all-products"
        className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300"
      >
        View All Products
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </motion.div>
  )}
</section>


     {/* 5. Why Choose Us */}
<section className={`py-20 sm:py-24 px-6 md:px-12 ${
  isDark ? "bg-gradient-to-b from-gray-900 to-black" : "bg-gradient-to-r from-blue-50 to-emerald-50"
}`}>
  <div className="max-w-6xl mx-auto text-center mb-16">
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">
      Why Choose <span className="text-transparent bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text">TechGadget Hub</span>?
    </h2>
    
    {/* Subtitle - Fixed visibility & contrast */}
    <p className="text-lg md:text-xl font-medium text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
      Trusted by 45K+ businesses worldwide
    </p>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
    {[
      { icon: FaGlobeAsia, title: "Global Network", desc: "100+ countries, 50K+ verified suppliers & buyers", color: "from-blue-500 to-blue-600" },
      { icon: FaShieldAlt, title: "Secure Platform", desc: "End-to-end encryption, fraud protection guarantee", color: "from-green-500 to-emerald-600" },
      { icon: FaTruck, title: "Fast Logistics", desc: "DHL, FedEx partners. 3-7 day delivery worldwide", color: "from-purple-500 to-indigo-600" },
      { icon: FaHandshake, title: "Trusted Partners", desc: "Amazon, Apple, Samsung verified suppliers", color: "from-orange-500 to-yellow-600" }
    ].map((feature, idx) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.1 }}
        whileHover={{ y: -10, scale: 1.05 }}
        className="group relative bg-white dark:bg-gray-800 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-xl hover:shadow-3xl border border-gray-200 dark:border-gray-700 transition-all duration-500 overflow-hidden h-full"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
        
        {/* Icon with gradient background */}
        <div className={`p-4 rounded-2xl bg-gradient-to-r ${feature.color} text-white shadow-2xl mb-6 w-fit mx-auto group-hover:scale-110 transition-all duration-500`}>
          <feature.icon size={32} />
        </div>
        
        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {feature.title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {feature.desc}
        </p>
        
        {/* Optional hover checkmark */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <FaCheckCircle className="text-green-500 text-2xl animate-ping" />
        </div>
      </motion.div>
    ))}
  </div>
</section>

      {/* 6. Testimonials Carousel */}
      <section className="py-20 sm:py-24 px-6 md:px-12 bg-gradient-to-b from-white via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent dark:from-white dark:to-blue-400">
            What Our Traders Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">45K+ satisfied customers</p>
        </div>
        
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-10 sm:p-12 md:p-16 shadow-2xl border border-white/50 dark:border-gray-700/50 relative"
            >
              <div className="flex items-center justify-center mb-8">
                {[...Array(testimonials[currentTestimonial]?.rating || 5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-2xl mx-0.5 fill-current" />
                ))}
              </div>
              <blockquote className="text-xl sm:text-2xl md:text-2xl font-medium text-gray-900 dark:text-gray-100 italic mb-8 leading-relaxed">
                "{testimonials[currentTestimonial]?.text}"
              </blockquote>
              <div className="flex items-center gap-4">
                <img 
                  src={`https://i.pravatar.cc/60?img=${currentTestimonial + 1}`} 
                  alt={testimonials[currentTestimonial]?.name}
                  className="w-16 h-16 rounded-2xl border-4 border-white shadow-lg"
                />
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">{testimonials[currentTestimonial]?.name}</h4>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold">{testimonials[currentTestimonial]?.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Testimonial Indicators */}
          <div className="flex gap-2 justify-center mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentTestimonial(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === currentTestimonial 
                    ? "bg-gradient-to-r from-blue-600 to-green-600 w-8 scale-125 shadow-lg" 
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-blue-400"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Categories Section */}
      <section className="py-20 sm:py-24 px-6 md:px-12 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">
            <span className={isDark ? "text-white" : "text-gray-900"}>Explore by</span> <span className="text-transparent bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text">Category</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {[
            { name: "Smartphones", icon: "📱", color: "from-blue-500 to-blue-600", href: "/category/smartphones" },
            { name: "Laptops", icon: "💻", color: "from-green-500 to-emerald-600", href: "/category/laptops" },
            { name: "Accessories", icon: "🎧", color: "from-purple-500 to-indigo-600", href: "/category/accessories" },
            { name: "Drones", icon: "🚁", color: "from-orange-500 to-red-600", href: "/category/drones" },
            { name: "Cameras", icon: "📷", color: "from-pink-500 to-rose-600", href: "/category/cameras" },
            { name: "Gaming", icon: "🎮", color: "from-indigo-500 to-violet-600", href: "/category/gaming" }
          ].map((cat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.08, y: -8 }}
              className="group relative bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-400 overflow-hidden aspect-square flex flex-col items-center justify-center text-center"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-10 blur-sm transition-opacity duration-500`}></div>
              <div className={`text-4xl sm:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 p-3 rounded-2xl bg-gradient-to-br ${cat.color} shadow-2xl`}>
                {cat.icon}
              </div>
              <h3 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors z-10">
                {cat.name}
              </h3>
              <Link to={cat.href} className="absolute inset-0" aria-hidden="true" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 8. Global Partners */}
      <section className="py-20 sm:py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">
            <span className={isDark ? "text-white" : "text-gray-900"}>Our</span>{" "}
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text">Global Partners</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">Proudly working with industry leaders</p>
        </motion.div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 sm:gap-12 items-center justify-items-center opacity-80 hover:opacity-100 transition-opacity">
          {[
            { src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", alt: "Amazon", width: 120 },
            { src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", alt: "Apple", width: 80 },
            { src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", alt: "Microsoft", width: 100 },
            { src: "https://upload.wikimedia.org/wikipedia/commons/8/88/Alibaba_Group_Logo.png", alt: "Alibaba", width: 110 },
            { src: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg", alt: "Samsung", width: 90 }
          ].map((partner, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.15, y: -5, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group p-4 sm:p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl border border-white/50 dark:border-gray-700/50 transition-all duration-300"
            >
              <img
                src={partner.src}
                alt={partner.alt}
                className="h-12 sm:h-14 md:h-16 max-w-full filter grayscale group-hover:grayscale-0 transition-all duration-500 mx-auto"
                style={{ width: partner.width, height: partner.width * 0.4 }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 9. CTA Newsletter Section */}
      <section className={`py-20 sm:py-24 px-6 md:px-12 ${
        isDark 
          ? "bg-gradient-to-b from-gray-800 via-gray-900 to-black" 
          : "bg-gradient-to-r from-blue-600 via-green-600 to-blue-700"
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white/20 dark:bg-white/10 backdrop-blur-xl rounded-3xl p-12 sm:p-16 md:p-20 shadow-2xl border border-white/30">
            <FaDownload className="text-6xl sm:text-7xl md:text-8xl text-white/90 mx-auto mb-8 opacity-80" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 text-white drop-shadow-2xl">
              Ready to Start Trading?
            </h2>
            <p className="text-xl sm:text-2xl text-blue-100/90 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
              Join 45K+ traders. Get exclusive deals on latest tech gadgets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Link
                to="/all-products"
                className="flex-1 bg-white text-blue-600 dark:text-blue-700 font-bold py-4 px-8 rounded-2xl text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 hover:bg-blue-50"
              >
                🚀 Start Browsing
              </Link>
              <Link
                to="/register"
                className="flex-1 border-2 border-white text-white font-bold py-4 px-8 rounded-2xl text-lg hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                📝 Sign Up Free
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 10. FAQ Section */}
      <section className="py-20 sm:py-24 px-6 md:px-12 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-center mb-6 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent dark:from-white"
          >
            Frequently Asked Questions
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-6 mt-16">
            {[
              { q: "How fast is delivery?", a: "3-7 days worldwide via DHL/FedEx partners." },
              { q: "Is the platform secure?", a: "100% secure with end-to-end encryption & fraud protection." },
              { q: "What payment methods?", a: "PayPal, Stripe, Bank Transfer, Crypto (BTC/ETH)." },
              { q: "Can I export from Bangladesh?", a: "Yes! Export to 100+ countries hassle-free." }
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-400 cursor-pointer hover:-translate-y-2"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {faq.q}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;