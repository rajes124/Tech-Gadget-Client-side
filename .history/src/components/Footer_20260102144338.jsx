import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import logo from "../assets/logo.png";

const Footer = ({ theme }) => {
  const isDark = theme === "dark";

  return (
    <footer className={`py-12 mt-20 border-t ${isDark ? "bg-gray-900/95 border-gray-800 text-gray-300" : "bg-white/95 border-gray-200 text-gray-700"} backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12"> {/* gap কমালাম */}
        {/* Logo & About */}
        <div className="text-center md:text-left">
          <div className="flex justify-center md:justify-start items-center gap-3 mb-5">
            <img src={logo} alt="Tech Gadget" className="w-12 h-12 object-contain rounded-full border-2 border-green-500/30 shadow-lg" />
            <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Tech Gadget</h2>
          </div>
          <p className={`text-sm leading-relaxed mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Your global marketplace for cutting-edge tech gadgets. Import innovation, export opportunity — secure, fast, and reliable.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            {[
              { icon: FaFacebookF, href: "https://facebook.com", color: "hover:bg-blue-600" },
              { icon: FaInstagram, href: "https://instagram.com", color: "hover:bg-pink-600" },
              { icon: FaLinkedinIn, href: "https://linkedin.com", color: "hover:bg-blue-700" },
              { icon: FaYoutube, href: "https://youtube.com", color: "hover:bg-red-600" },
            ].map(({ icon: Icon, href, color }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                className={`p-3 rounded-full transition-all duration-300 ${isDark ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"} ${color} hover:text-white shadow-md hover:scale-110`}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className={`text-lg font-bold mb-5 ${isDark ? "text-white" : "text-gray-900"}`}>Quick Links</h3>
          <ul className="space-y-3 text-sm">
            {["Home", "All Products", "My Exports", "My Imports", "Add Export"].map((label, i) => {
              const paths = ["/", "/all-products", "/my-exports", "/my-imports", "/add-export"];
              return (
                <li key={i}>
                  <Link to={paths[i]} className="hover:text-green-500 dark:hover:text-green-400 transition">
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className={`text-lg font-bold mb-5 ${isDark ? "text-white" : "text-gray-900"}`}>Contact Us</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3 justify-center md:justify-start">
              <FaEnvelope className="text-green-500" />
              <a href="mailto:support@techgadget.com" className="hover:text-green-500 dark:hover:text-green-400">
                support@techgadget.com
              </a>
            </li>
            <li className="flex items-center gap-3 justify-center md:justify-start">
              <FaPhone className="text-green-500" />
              <a href="tel:+8801234567890" className="hover:text-green-500 dark:hover:text-green-400">
                +880 1234 567 890
              </a>
            </li>
            <li className="flex items-center gap-3 justify-center md:justify-start">
              <FaMapMarkerAlt className="text-green-500" />
              <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="hover:text-green-500 dark:hover:text-green-400">
                Dhaka, Bangladesh
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className={`text-lg font-bold mb-5 ${isDark ? "text-white" : "text-gray-900"}`}>Newsletter</h3>
          <p className={`text-sm mb-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Get exclusive deals and new product updates
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email"
              className={`flex-1 px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                isDark ? "bg-gray-800 text-white placeholder-gray-500" : "bg-gray-100 text-gray-900 placeholder-gray-500"
              }`}
            />
            <button 
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition whitespace-nowrap" // whitespace-nowrap যোগ করে text কাটবে না
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className={`text-center text-xs mt-12 pt-8 border-t ${isDark ? "border-gray-800 text-gray-500" : "border-gray-200 text-gray-500"}`}>
        © {new Date().getFullYear()} <span className="text-green-500 font-medium">Tech Gadget Hub</span>. All rights reserved. 
        <span className="mx-4">|</span>
        <Link to="/terms" className="hover:text-green-500">Terms</Link>
        <span className="mx-2">•</span>
        <Link to="/privacy" className="hover:text-green-500">Privacy Policy</Link>
      </div>
    </footer>
  );
};

export default Footer;