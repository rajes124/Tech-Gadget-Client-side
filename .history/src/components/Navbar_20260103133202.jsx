import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { Sun, Moon } from "lucide-react";
import logo from "../assets/logo.png";

const Navbar = ({ theme, setTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Load user on mount & route change
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, [location]);

  // Listen to storage changes from other tabs
  useEffect(() => {
    const handleUserUpdate = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setUser(updatedUser);
    };
    window.addEventListener("storage", handleUserUpdate);
    return () => window.removeEventListener("storage", handleUserUpdate);
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully!");
    navigate("/login");
    setMenuOpen(false); // mobile menu close
  };

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-4 py-2 rounded-lg transition-all ${
            isActive
              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-bold"
              : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/all-products"
        className={({ isActive }) =>
          `px-4 py-2 rounded-lg transition-all ${
            isActive
              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-bold"
              : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
          }`
        }
      >
        All Products
      </NavLink>
      {user && (
        <>
          <NavLink
            to="/my-exports"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition-all ${
                isActive
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-bold"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`
            }
          >
            My Exports
          </NavLink>
          <NavLink
            to="/my-imports"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition-all ${
                isActive
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-bold"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`
            }
          >
            My Imports
          </NavLink>
          <NavLink
            to="/add-export"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition-all ${
                isActive
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-bold"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`
            }
          >
            Add Export
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <>
      <nav className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-800 shadow-lg sticky top-0 z-50 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logo}
                alt="Tech Gadget Logo"
                className="w-10 h-10 object-contain rounded-full ring-2 ring-green-500/20"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Tech Gadget
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-2">
              {links}
            </div>

            {/* Desktop Right Side */}
            <div className="hidden md:flex items-center gap-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="p-2.5 rounded-full bg-gray-200/70 dark:bg-gray-800/70 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300"
                aria-label="Toggle dark mode"
              >
                {theme === "light" ? (
                  <Moon size={20} className="text-gray-700" />
                ) : (
                  <Sun size={22} className="text-yellow-400 drop-shadow-md" />
                )}
              </button>

              {/* User Section */}
              {user ? (
                <div className="flex items-center gap-3">
                  <Link to="/profile">
                    <img
                      src={user.photoURL || "https://i.ibb.co/2kzH8v1/user.png"}
                      alt="Profile"
                      className="w-9 h-9 rounded-full ring-2 ring-green-500/30 hover:ring-green-500 transition-all"
                    />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-5 py-2 rounded-xl font-medium hover:from-red-600 hover:to-pink-700 transition-all shadow-md"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:from-green-600 hover:to-blue-700 transition-all shadow-md"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2"
            >
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            ref={menuRef}
            className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 py-4 px-6 space-y-3"
          >
            <div className="space-y-2">{links}</div>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="p-3 rounded-full bg-gray-200 dark:bg-gray-800"
              >
                {theme === "light" ? <Moon size={22} /> : <Sun size={24} className="text-yellow-400" />}
              </button>

              {user ? (
                <div className="flex items-center gap-3">
                  <Link to="/profile" className="text-sm font-medium">
                    <img
                      src={user.photoURL || "https://i.ibb.co/2kzH8v1/user.png"}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-green-500 text-white px-6 py-2 rounded-lg font-medium"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme={theme}
        className="mt-16"
      />
    </>
  );
};

export default Navbar;