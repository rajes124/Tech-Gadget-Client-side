import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png"; // logo.png assets ফোল্ডারে রাখো

const Navbar = () => {
  const user = localStorage.getItem("user");

  return (
    <div className="navbar bg-white shadow-md px-8 py-3 flex justify-between items-center sticky top-0 z-50">
      {/* Left: Logo */}
<div className="flex items-center gap-3">
  <img
    src={logo}
    alt="Logo"
    className="w-10 h-10 object-contain rounded-full" // <-- এখানে rounded-full যোগ করা হলো
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
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
              : "hover:text-blue-600 transition"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/all-products"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
              : "hover:text-blue-600 transition"
          }
        >
          All Products
        </NavLink>

        <NavLink
          to="/my-exports"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
              : "hover:text-blue-600 transition"
          }
        >
          My Exports
        </NavLink>

        <NavLink
          to="/my-imports"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
              : "hover:text-blue-600 transition"
          }
        >
          My Imports
        </NavLink>

        <NavLink
          to="/add-export"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
              : "hover:text-blue-600 transition"
          }
        >
          Add Export
        </NavLink>
      </div>

      {/* Right: Login / Logout */}
      <div>
        {user ? (
          <button
            onClick={() => {
              localStorage.removeItem("user");
              window.location.reload();
            }}
            className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
