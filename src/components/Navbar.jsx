import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="navbar bg-white shadow-md px-8 py-3 flex justify-between items-center sticky top-0 z-50">
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="Logo"
          className="w-10 h-10 object-contain rounded-full"
        />
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition"
        >
          Tech Gadget
        </Link>
      </div>

      {/* Middle: Navigation */}
      <div className="hidden md:flex gap-6 text-gray-700 font-medium">
        {["/", "/all-products", "/my-exports", "/my-imports", "/add-export"].map(
          (path, index) => {
            const names = ["Home", "All Products", "My Exports", "My Imports", "Add Export"];
            return (
              <NavLink
                key={index}
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                    : "hover:text-blue-600 transition"
                }
              >
                {names[index]}
              </NavLink>
            );
          }
        )}
      </div>

      {/* Right: Profile + Logout */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            {/* Profile Image */}
            <Link to="/profile">
              <img
                src={user.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                alt={user.displayName || "User"}
                className="w-10 h-10 rounded-full border-2 border-blue-500 cursor-pointer"
              />
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <div className="flex gap-2">
            <Link
              to="/login"
              className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 transition"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
