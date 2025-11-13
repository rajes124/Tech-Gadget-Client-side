import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [showProfileBox, setShowProfileBox] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const profileRef = useRef(null);

  // ✅ route change হলে user reload হবে
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, [location]);

  // ✅ click outside to close profile box
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileBox(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logout Successful ✅", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
    setTimeout(() => navigate("/login"), 1500);
  };

  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/all-products", label: "All Products" },
    { path: "/my-exports", label: "My Exports" },
    { path: "/my-imports", label: "My Imports" },
    { path: "/add-export", label: "Add Export" },
  ];

  return (
    <>
      <nav className="bg-white shadow-md px-5 sm:px-8 py-3 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Logo"
              className="w-10 h-10 object-contain rounded-full"
            />
            <Link
              to="/"
              className="text-xl sm:text-2xl font-bold text-blue-600 hover:text-blue-700 transition"
            >
              Tech Gadget
            </Link>
          </div>

          {/* Hamburger (mobile only) */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 text-2xl focus:outline-none"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Middle: Menu Links */}
          <div
            className={`${
              menuOpen
                ? "flex flex-col absolute top-16 left-0 w-full bg-white shadow-md border-t border-gray-100 py-4 z-40"
                : "hidden"
            } md:flex md:flex-row md:static md:w-auto md:shadow-none md:py-0 transition-all duration-300`}
          >
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-gray-700 font-medium text-center md:text-left">
              {menuItems.map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                      : "hover:text-blue-600 transition"
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right: Profile or Login/Register */}
          <div className="hidden md:flex items-center gap-4 relative" ref={profileRef}>
            {user ? (
              <>
                <div className="relative">
                  <img
                    src={
                      user.photoURL ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt={user.displayName || "User"}
                    className="w-10 h-10 rounded-full border-2 border-blue-500 cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => setShowProfileBox(!showProfileBox)}
                  />

                  {showProfileBox && (
                    <div className="absolute right-0 mt-3 w-52 bg-white shadow-lg rounded-xl border border-gray-100 py-3 px-4 flex flex-col gap-2 z-50 animate-fadeIn">
                      <div className="flex items-center gap-3 border-b pb-2">
                        <img
                          src={
                            user.photoURL ||
                            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                          }
                          alt="User"
                          className="w-10 h-10 rounded-full border border-gray-200"
                        />
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">
                            {user.displayName || "User"}
                          </p>
                          <p className="text-gray-500 text-xs">{user.email}</p>
                        </div>
                      </div>

                      <Link
                        to="/profile"
                        onClick={() => setShowProfileBox(false)}
                        className="mt-2 bg-blue-600 text-white py-1.5 rounded-md text-center font-medium hover:bg-blue-700 transition"
                      >
                        View Profile
                      </Link>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-1.5 rounded-md hover:bg-red-600 transition shadow-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="bg-blue-500 text-white px-4 py-1.5 rounded-md hover:bg-blue-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-500 text-white px-4 py-1.5 rounded-md hover:bg-green-600 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile: Profile/Login Below Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col items-center gap-3 mt-3 pb-3 border-t pt-3">
            {user ? (
              <>
                <div className="flex items-center gap-3">
                  <img
                    src={
                      user.photoURL ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt="User"
                    className="w-10 h-10 rounded-full border border-blue-500"
                  />
                  <div className="text-left">
                    <p className="text-sm font-semibold">{user.displayName}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-5 py-1.5 rounded-md hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="bg-blue-500 text-white px-4 py-1.5 rounded-md hover:bg-blue-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="bg-green-500 text-white px-4 py-1.5 rounded-md hover:bg-green-600 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>

      <ToastContainer />
    </>
  );
};

export default Navbar;
