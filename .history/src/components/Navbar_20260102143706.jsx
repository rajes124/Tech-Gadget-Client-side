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
      {["/", "/all-products"].map((path, i) => (
        <NavLink
          key={i}
          to={path}
          className={({ isActive }) =>
            `font-medium transition ${
              isActive
                ? "text-green-600 dark:text-green-400"
                : "text-gray-700 dark:text-gray-300 hover:text-green-500"
            }`
          }
        >
          {path === "/" ? "Home" : "All Products"}
        </NavLink>
      ))}

      {user && (
        <>
          {["my-exports", "my-imports", "add-export"].map((route) => (
            <NavLink
              key={route}
              to={`/${route}`}
              className={({ isActive }) =>
                `font-medium transition ${
                  isActive
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-green-500"
                }`
              }
            >
              {route.replace("-", " ").toUpperCase()}
            </NavLink>
          ))}
        </>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-white/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
          <span className="text-xl font-bold text-green-600 dark:text-green-400">
            Tech Gadget
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8">{links}</div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
          {/* ✅ FIXED Dark Mode Toggle */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="
              w-11 h-11 flex items-center justify-center
              rounded-full border
              border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-800
              hover:bg-gray-100 dark:hover:bg-gray-700
              transition shadow-sm
            "
            aria-label="Toggle Theme"
          >
            {theme === "light" ? (
              <Moon className="text-gray-800" size={22} />
            ) : (
              <Sun className="text-yellow-400" size={22} />
            )}
          </button>

          {user ? (
            <>
              <Link to="/profile">
                <img
                  src={user.photoURL || "https://i.ibb.co/2kzH8v1/user.png"}
                  className="w-9 h-9 rounded-full border border-green-500"
                />
              </Link>
              <button
                onClick={handleLogout}
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl text-gray-800 dark:text-gray-200"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="md:hidden bg-white dark:bg-gray-900 px-6 py-5 space-y-4"
        >
          {links}

          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="w-full flex justify-center items-center gap-2 py-3 rounded-lg bg-gray-100 dark:bg-gray-800"
          >
            {theme === "light" ? <Moon /> : <Sun />}
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
      )}

      <ToastContainer position="top-center" theme={theme} />
    </nav>
  );
};

export default Navbar;
