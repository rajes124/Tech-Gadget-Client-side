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

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, [location]);

  useEffect(() => {
    const handleUserUpdate = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setUser(updatedUser);
    };
    window.addEventListener("storage", handleUserUpdate);
    return () => window.removeEventListener("storage", handleUserUpdate);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `transition font-medium ${
            isActive
              ? "text-green-600 dark:text-green-400 font-semibold"
              : "hover:text-green-500 dark:hover:text-green-400"
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/all-products"
        className={({ isActive }) =>
          `transition font-medium ${
            isActive
              ? "text-green-600 dark:text-green-400 font-semibold"
              : "hover:text-green-500 dark:hover:text-green-400"
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
              `transition font-medium ${
                isActive
                  ? "text-green-600 dark:text-green-400 font-semibold"
                  : "hover:text-green-500 dark:hover:text-green-400"
              }`
            }
          >
            My Exports
          </NavLink>
          <NavLink
            to="/my-imports"
            className={({ isActive }) =>
              `transition font-medium ${
                isActive
                  ? "text-green-600 dark:text-green-400 font-semibold"
                  : "hover:text-green-500 dark:hover:text-green-400"
              }`
            }
          >
            My Imports
          </NavLink>
          <NavLink
            to="/add-export"
            className={({ isActive }) =>
              `transition font-medium ${
                isActive
                  ? "text-green-600 dark:text-green-400 font-semibold"
                  : "hover:text-green-500 dark:hover:text-green-400"
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
    <nav className="backdrop-blur-xl bg-white/800 dark:bg-gray-900/90 shadow-lg sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Tech Gadget Logo"
            className="w-10 h-10 object-contain rounded-full border-2 border-green-500/30 shadow-md"
          />
          <span className="text-2xl font-bold text-green-600 dark:text-green-400">
            Tech Gadget
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex justify-center items-center flex-1 gap-8 text-base">
          {links}
        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-4">
          {/* Dark Mode Toggle - Visibility Fixed */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-3 rounded-full bg-gray-200/70 dark:bg-gray-800/70 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 shadow-md"
            aria-label="Toggle dark mode"
          >
            {theme === "light" ? (
              <Moon size={22} className="text-gray-700" />
            ) : (
              <Sun size={22} className="text-yellow-400 drop-shadow-lg" />
            )}
          </button>

          {/* User / Login */}
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/profile">
                <img
                  src={user.photoURL || "https://i.ibb.co/2kzH8v1/user.png"}
                  alt="User"
                  className="w-9 h-9 rounded-full border-2 border-green-500/50 shadow-md"
                />
              </Link>
              <button
                onClick={handleLogout}
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-medium shadow-md transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-md transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl text-gray-700 dark:text-gray-300"
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="md:hidden bg-white dark:bg-gray-900 px-6 py-5 space-y-4 border-t border-gray-200 dark:border-gray-800"
        >
          {links}
          <div className="flex flex-col gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="flex items-center gap-3 py-3 px-4 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {theme === "light" ? (
                <>
                  <Moon size={20} className="text-gray-700" />
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun size={20} className="text-yellow-400" />
                  <span>Light Mode</span>
                </>
              )}
            </button>

            {user ? (
              <div className="flex items-center justify-between">
                <Link to="/profile" className="flex items-center gap-3">
                  <img
                    src={user.photoURL || "https://i.ibb.co/2kzH8v1/user.png"}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-green-500/50"
                  />
                  <span className="font-medium">Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="block text-center bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}

      <ToastContainer position="top-center" theme={theme} />
    </nav>
  );
};

export default Navbar;