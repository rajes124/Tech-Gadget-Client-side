import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
} from "react-icons/fa";
import logo from "../assets/logo.png";

const Footer = ({ theme }) => {
  const isDark = theme === "dark";

  return (
    <footer
      className={`py-12 mt-20 border-t ${
        isDark
          ? "bg-gray-900/95 border-gray-800 text-gray-300"
          : "bg-white/95 border-gray-200 text-gray-700"
      } backdrop-blur-md`}
    >
      <div className="max-w-7xl mx-auto px-6 overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Logo & About */}
          <div className="text-center sm:text-left">
            <div className="flex justify-center sm:justify-start items-center gap-3 mb-5">
              <img
                src={logo}
                alt="Tech Gadget"
                className="w-12 h-12 rounded-full border-2 border-green-500/30 shadow-lg"
              />
              <h2
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Tech Gadget
              </h2>
            </div>

            <p
              className={`text-sm leading-relaxed mb-6 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Your global marketplace for cutting-edge tech gadgets. Import
              innovation, export opportunity — secure, fast, and reliable.
            </p>

            <div className="flex justify-center sm:justify-start gap-4">
              {[
                {
                  icon: FaFacebookF,
                  href: "https://facebook.com",
                  hover: "hover:bg-blue-600",
                },
                {
                  icon: FaInstagram,
                  href: "https://instagram.com",
                  hover: "hover:bg-pink-600",
                },
                {
                  icon: FaLinkedinIn,
                  href: "https://www.linkedin.com/in/rajes-rishi",
                  hover: "hover:bg-blue-700",
                },
                {
                  icon: FaGithub,
                  href: "https://github.com/rajes124",
                  hover: "hover:bg-gray-900",
                },
                {
                  icon: FaYoutube,
                  href: "https://youtube.com",
                  hover: "hover:bg-red-600",
                },
              ].map(({ icon: Icon, href, hover }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className={`p-3 rounded-full transition-all duration-300 ${
                    isDark
                      ? "bg-gray-800 text-gray-300"
                      : "bg-gray-100 text-gray-600"
                  } ${hover} hover:text-white shadow-md hover:scale-110`}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3
              className={`text-lg font-bold mb-5 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                ["/", "Home"],
                ["/all-products", "All Products"],
                ["/my-exports", "My Exports"],
                ["/my-imports", "My Imports"],
                ["/add-export", "Add Export"],
              ].map(([path, label], i) => (
                <li key={i}>
                  <Link
                    to={path}
                    className="hover:text-green-500 dark:hover:text-green-400 transition"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center sm:text-left">
            <h3
              className={`text-lg font-bold mb-5 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3 justify-center sm:justify-start">
                <FaEnvelope className="text-green-500" />
                <a
                  href="mailto:rajesray307@gmail.com"
                  className="hover:text-green-500"
                >
                  rajesray307@gmail.com
                </a>
              </li>

              <li className="flex items-center gap-3 justify-center sm:justify-start">
                <FaPhone className="text-green-500" />
                <a
                  href="tel:01407539879"
                  className="hover:text-green-500"
                >
                  01407539879
                </a>
              </li>

              <li className="flex items-center gap-3 justify-center sm:justify-start">
                <FaMapMarkerAlt className="text-green-500" />
                <span>Mymensingh, Netrakona, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="text-center sm:text-left">
            <h3
              className={`text-lg font-bold mb-5 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Newsletter
            </h3>
            <p
              className={`text-sm mb-4 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Get exclusive deals and new product updates
            </p>

            <form className="flex w-full max-w-sm mx-auto sm:mx-0 gap-2">
              <input
                type="email"
                placeholder="Your email"
                className={`flex-1 min-w-0 px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  isDark
                    ? "bg-gray-800 text-white placeholder-gray-500"
                    : "bg-gray-100 text-gray-900 placeholder-gray-500"
                }`}
              />
              <button
                type="submit"
                className="flex-shrink-0 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-lg font-medium transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div
          className={`text-center text-xs mt-12 pt-8 border-t ${
            isDark ? "border-gray-800 text-gray-500" : "border-gray-200 text-gray-500"
          }`}
        >
          © {new Date().getFullYear()}{" "}
          <span className="text-green-500 font-medium">
            Tech Gadget Hub
          </span>
          . All rights reserved.
          <span className="mx-4">|</span>
          <Link to="/terms" className="hover:text-green-500">
            Terms
          </Link>
          <span className="mx-2">•</span>
          <Link to="/privacy" className="hover:text-green-500">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
