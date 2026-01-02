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

  // Load user when page changes
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, [location]);

  // Sync with updated user
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
  };

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Menu Links
  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `transition ${
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
          `transition ${
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
              `transition ${
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
              `transition ${
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
              `transition ${
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
    <nav
      className="backdrop-blur-xl bg-gradient-to-r from-white/70 via-white/50 to-white/70 
      dark:from-gray-900/80 dark:via-gray-900/60 dark:to-gray-900/80 
      text-gray-800 dark:text-gray-100 
      shadow-[0_4px_20px_rgba(0,0,0,0.05)] 
      sticky top-0 z-50 
      border-b border-white/40 dark:border-gray-800 
      transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Tech Gadget Logo"
            className="w-10 h-10 object-contain rounded-full border border-gray-300 dark:border-gray-600"
          />
          <span className="text-2xl font-bold text-green-600 dark:text-green-400">
            Tech Gadget
          </span>
        </Link>

        {/* Desktop Menu: সব লিঙ্ক center */}
        <div className="hidden md:flex justify-center items-center flex-1 gap-6">
          {links}
        </div>

        {/* Desktop Right: Dark mode + Profile/Login */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Toggle dark mode"
          >
            {theme === "light" ? (
              <Moon
                size={20}
                className="text-gray-800 hover:text-green-500 transition"
              />
            ) : (
              <Sun
                size={20}
                className="text-yellow-300 drop-shadow hover:text-green-400 transition"
              />
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/profile">
                <img
                  src={user.photoURL || "https://i.ibb.co/2kzH8v1/user.png"}
                  alt="User"
                  className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600"
                />
              </Link>
              <button
                onClick={handleLogout}
                className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl"
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="md:hidden bg-white/90 dark:bg-gray-900/90 dark:text-gray-100 px-4 py-3 space-y-2 shadow-md border-t border-gray-200 dark:border-gray-700"
        >
          {links}
          <div className="flex justify-between items-center mt-3">
            {/* Dark mode toggle for mobile */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {theme === "light" ? (
                <Moon size={20} className="text-gray-800" />
              ) : (
                <Sun size={20} className="text-yellow-400 drop-shadow" />
              )}
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                <Link to="/profile">
                  <img
                    src={user.photoURL || "https://i.ibb.co/2kzH8v1/user.png"}
                    alt="User"
                    className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600"
                  />
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
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
