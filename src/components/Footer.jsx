import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        
        {/* Column 1: Logo + About */}
        <div className="text-center md:text-left">
          <div className="flex justify-center md:justify-start items-center gap-3 mb-3">
            <img
              src={logo}
              alt="Tech Gadget"
              className="w-10 h-10 object-contain rounded-full border border-gray-700"
            />
            <h2 className="text-xl font-bold text-white">Tech Gadget</h2>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Explore the latest and smartest gadgets from around the world. 
            We bring innovation right to your hands — your trusted tech partner.
          </p>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-start gap-4 mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition-all duration-300"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="bg-gray-800 p-2 rounded-full hover:bg-pink-600 transition-all duration-300"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="bg-gray-800 p-2 rounded-full hover:bg-blue-500 transition-all duration-300"
            >
              <FaLinkedinIn size={18} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="bg-gray-800 p-2 rounded-full hover:bg-red-600 transition-all duration-300"
            >
              <FaYoutube size={18} />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="text-center md:text-left">
          <h3 className="text-white text-lg font-semibold mb-3 border-b border-gray-700 pb-2 inline-block">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-blue-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/all-products" className="hover:text-blue-400 transition">
                All Products
              </Link>
            </li>
            <li>
              <Link to="/my-exports" className="hover:text-blue-400 transition">
                My Exports
              </Link>
            </li>
            <li>
              <Link to="/my-imports" className="hover:text-blue-400 transition">
                My Imports
              </Link>
            </li>
            <li>
              <Link to="/add-export" className="hover:text-blue-400 transition">
                Add Export
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div className="text-center md:text-left">
          <h3 className="text-white text-lg font-semibold mb-3 border-b border-gray-700 pb-2 inline-block">
            Contact Us
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Email: support@techgadget.com</li>
            <li>Phone: +880 1234 567 890</li>
            <li>Address: Dhaka, Bangladesh</li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="text-center text-gray-500 text-sm border-t border-gray-800 mt-10 pt-4">
        © {new Date().getFullYear()}{" "}
        <span className="text-blue-400 font-medium">Tech Gadget</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
