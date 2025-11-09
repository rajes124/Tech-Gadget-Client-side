import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase.config";
import bgImg from "../assets/background.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Normal Email Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // ✅ User info save in localStorage
      localStorage.setItem("user", JSON.stringify(userCredential.user));

      toast.success("Login Successful!");
      setTimeout(() => {
        navigate("/"); // Login হলে সরাসরি Home পেজে যাবে
      }, 1000);
    } catch (err) {
      toast.error(err.message);
    }
  };

  // ✅ Google Login (updated)
  const handleGoogleLogin = async () => {
    if (loading) return;
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);

      // ✅ Google user info save in localStorage
      localStorage.setItem("user", JSON.stringify(result.user));

      toast.success("Google Login Successful!");
      setTimeout(() => {
        navigate("/"); // এখন Google Login করলে Home পেজে যাবে
      }, 1000);
    } catch (err) {
      if (err.code !== "auth/cancelled-popup-request") {
        toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="max-w-md w-full bg-white/80 backdrop-blur-xl p-8 border border-white/40 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Login
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-5 relative">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 bg-white p-3 rounded-lg text-gray-800 placeholder-gray-500"
          />

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 bg-white p-3 rounded-lg text-gray-800 placeholder-gray-500 w-full"
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3 text-xl text-gray-600 cursor-pointer"
            >
              {showPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>

          <ToastContainer position="top-right" autoClose={3000} theme="colored" />

          <Link to="/register" className="text-blue-600 text-sm font-medium">
            Don't have an account? Register
          </Link>

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-lg font-semibold
                       transition-all duration-200 hover:bg-blue-700 hover:shadow-lg hover:scale-[1.02]"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="mb-3 text-gray-700 font-semibold">Or Login with:</p>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className={`w-full flex items-center justify-center gap-3 border border-gray-300 bg-white py-3
                       rounded-full transition-all duration-200 ${
                         loading
                           ? "opacity-60 cursor-not-allowed"
                           : "hover:bg-gray-100 hover:shadow-md hover:scale-[1.02]"
                       }`}
          >
            <img
              src="https://www.gstatic.com/images/branding/product/1x/gsa_64dp.png"
              alt="Google"
              className="w-5"
            />
            <span className="text-gray-700 font-medium">
              {loading ? "Please wait..." : "Continue with Google"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
