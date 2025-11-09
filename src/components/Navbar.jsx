import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ route পরিবর্তন ট্র্যাক করার জন্য
  const [user, setUser] = useState(null);
  const [showProfileBox, setShowProfileBox] = useState(false);
  const profileRef = useRef(null);

  // ✅ route change হলেই user আবার load হবে
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, [location]);

  // Click outside to close profile box
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
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    // ✅ logout এর পর navigate করলে Navbar rerender হবে কারণ route change হচ্ছে
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <>
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
              const names = [
                "Home",
                "All Products",
                "My Exports",
                "My Imports",
                "Add Export",
              ];
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
        <div className="flex items-center gap-4 relative" ref={profileRef}>
          {user ? (
            <>
              {/* Profile Image (Toggle Dropdown) */}
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

                {/* Dropdown Box */}
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

              {/* Logout Button */}
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

      {/* Toast Message Container */}
      <ToastContainer />
    </>
  );
};

export default Navbar;
