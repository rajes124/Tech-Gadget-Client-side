import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import logo from "../assets/logo.png";

const Footer = ({ theme }) => {
  return (
    <footer
      className={`backdrop-blur-md transition-all duration-300 border-t ${
        theme === "dark"
          ? "bg-gradient-to-t from-gray-950 via-gray-900 to-gray-800 border-gray-700 text-gray-300"
          : "bg-gradient-to-t from-gray-100 via-white to-gray-50 border-gray-200 text-gray-700"
      } py-10 mt-16`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {/* Column 1: Logo + About */}
        <div className="text-center md:text-left">
          <div className="flex justify-center md:justify-start items-center gap-3 mb-3">
            <img
              src={logo}
              alt="Tech Gadget"
              className={`w-10 h-10 object-contain rounded-full border ${
                theme === "dark" ? "border-gray-700" : "border-gray-300"
              }`}
            />
            <h2
              className={`text-xl font-bold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Tech Gadget
            </h2>
          </div>
          <p
            className={`text-sm leading-relaxed ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Explore the latest and smartest gadgets from around the world.
            We bring innovation right to your hands — your trusted tech partner.
          </p>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-start gap-4 mt-4">
            {[
              {
                icon: <FaFacebookF size={18} />,
                href: "https://www.facebook.com/techgadget",
                hover: "hover:bg-blue-600",
              },
              {
                icon: <FaInstagram size={18} />,
                href: "https://www.instagram.com/techgadget",
                hover: "hover:bg-pink-600",
              },
              {
                icon: <FaLinkedinIn size={18} />,
                href: "https://www.linkedin.com/company/techgadget",
                hover: "hover:bg-blue-500",
              },
              {
                icon: <FaYoutube size={18} />,
                href: "https://www.youtube.com/@techgadget",
                hover: "hover:bg-red-600",
              },
            ].map(({ icon, href, hover }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                className={`p-2 rounded-full transition-all duration-300 ${
                  theme === "dark"
                    ? `bg-gray-800 ${hover}`
                    : `bg-gray-200 ${hover.replace("bg-", "text-")}`
                }`}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="text-center md:text-left">
          <h3
            className={`text-lg font-semibold mb-3 border-b pb-2 inline-block ${
              theme === "dark"
                ? "text-white border-gray-700"
                : "text-gray-900 border-gray-300"
            }`}
          >
            Quick Links
          </h3>
          <ul
            className={`space-y-2 text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {[
              { label: "Home", to: "/" },
              { label: "All Products", to: "/all-products" },
              { label: "My Exports", to: "/my-exports" },
              { label: "My Imports", to: "/my-imports" },
              { label: "Add Export", to: "/add-export" },
            ].map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="hover:text-green-500 dark:hover:text-green-400 transition"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div className="text-center md:text-left">
          <h3
            className={`text-lg font-semibold mb-3 border-b pb-2 inline-block ${
              theme === "dark"
                ? "text-white border-gray-700"
                : "text-gray-900 border-gray-300"
            }`}
          >
            Contact Us
          </h3>
          <ul
            className={`space-y-2 text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <li>
              Email:{" "}
              <a
                href="mailto:support@techgadget.com"
                className="hover:text-green-500 dark:hover:text-green-400"
              >
                support@techgadget.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a
                href="tel:+8801234567890"
                className="hover:text-green-500 dark:hover:text-green-400"
              >
                +880 1234 567 890
              </a>
            </li>
            <li>
              Address:{" "}
              <a
                href="https://goo.gl/maps/Dhaka"
                target="_blank"
                rel="noreferrer"
                className="hover:text-green-500 dark:hover:text-green-400"
              >
                Dhaka, Bangladesh
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div
        className={`text-center text-sm border-t mt-10 pt-4 flex flex-col md:flex-row justify-center items-center gap-2 ${
          theme === "dark"
            ? "border-gray-700 text-gray-500"
            : "border-gray-300 text-gray-500"
        }`}
      >
        <span>
          © {new Date().getFullYear()}{" "}
          <span className="text-green-500 dark:text-green-400 font-medium">
            Tech Gadget
          </span>
          . All rights reserved.
        </span>
        <span className="flex gap-3">
          <Link
            to="/terms"
            className="hover:text-green-500 dark:hover:text-green-400"
          >
            Terms
          </Link>{" "}
          |{" "}
          <Link
            to="/privacy"
            className="hover:text-green-500 dark:hover:text-green-400"
          >
            Privacy
          </Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
