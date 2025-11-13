import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Productcard = ({ product }) => {
  // Country Flag Selector
  let flag = "";
  switch ((product.originCountry || "").toLowerCase()) {
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
      whileHover={{
        rotateY: 6,
        rotateX: -4,
        scale: 1.07,
        y: -8,
      }}
      transition={{
        type: "spring",
        stiffness: 160,
        damping: 10,
      }}
      className="bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden 
                 w-full sm:w-[260px] md:w-[300px] lg:w-[330px] 
                 h-[450px] sm:h-[430px] md:h-[460px] flex flex-col justify-between transform-gpu transition-all duration-300 border border-gray-100 mx-auto"
    >
      {/* Product Image */}
      <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Rating */}
        <div className="absolute top-3 left-3 bg-yellow-400 text-sm px-3 py-1 rounded-full font-semibold shadow">
          ⭐ {product.rating}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
        <div>
          {/* Product Name */}
          <h3 className="text-lg sm:text-xl md:text-xl font-bold text-gray-900 mb-2 line-clamp-1">
            {product.name}
          </h3>

          {/* Price */}
          <p className="text-gray-700 font-semibold mb-1 text-sm sm:text-base">
            💰 Price: ${product.price}
          </p>

          {/* Origin Country */}
          <p className="text-gray-600 text-xs sm:text-sm flex items-center gap-2 mb-2">
            {flag} {product.originCountry || "Unknown"}
          </p>

          {/* Available Quantity */}
          <span
            className={`inline-block px-2 sm:px-3 py-1 rounded-full font-semibold text-xs sm:text-sm ${
              product.availableQuantity > 50
                ? "bg-green-100 text-green-800"
                : product.availableQuantity > 20
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {product.availableQuantity} pcs Available
          </span>
        </div>

        {/* See Details Button */}
        <Link to={`/product/${product._id}`} className="mt-4 sm:mt-5">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 
                       text-white py-2.5 sm:py-3 rounded-xl font-semibold shadow-lg 
                       hover:shadow-blue-300 transition-all text-sm sm:text-base"
          >
            See Details
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default Productcard;
