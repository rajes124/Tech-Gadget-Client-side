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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("user", JSON.stringify(userCredential.user));
      toast.success("Login Successful!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      toast.error(err.message);
    }
  };

  // ✅ Google Login with safe DB check
  const handleGoogleLogin = async () => {
    if (loading) return;
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // -------------------------------
      // DB তে ইউজার চেক + তৈরি
      // -------------------------------
      await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        }),
      });

      // LocalStorage এ সেভ
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Google Login Successful!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      if (err.code !== "auth/cancelled-popup-request") toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 sm:p-6 md:p-12"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white/80 backdrop-blur-xl p-6 sm:p-8 md:p-10 border border-white/40 rounded-2xl shadow-xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center text-gray-900">
          Login
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4 sm:gap-5 relative">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 bg-white p-3 sm:p-3.5 rounded-lg text-gray-800 placeholder-gray-500 text-sm sm:text-base"
          />

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 bg-white p-3 sm:p-3.5 rounded-lg text-gray-800 placeholder-gray-500 w-full text-sm sm:text-base"
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3 sm:top-3.5 text-xl text-gray-600 cursor-pointer"
            >
              {showPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>

          <ToastContainer position="top-right" autoClose={3000} theme="colored" />

          <Link
            to="/register"
            className="text-blue-600 text-xs sm:text-sm font-medium"
          >
            Don't have an account? Register
          </Link>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base
                       transition-all duration-200 hover:bg-blue-700 hover:shadow-lg hover:scale-[1.02]"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="mb-3 text-gray-700 font-semibold text-sm sm:text-base">Or Login with:</p>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className={`w-full flex items-center justify-center gap-3 border border-gray-300 bg-white py-2.5 sm:py-3
                       rounded-full transition-all duration-200 ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-gray-100 hover:shadow-md hover:scale-[1.02]"}`}
          >
            <img
              src="https://www.gstatic.com/images/branding/product/1x/gsa_64dp.png"
              alt="Google"
              className="w-4 sm:w-5"
            />
            <span className="text-gray-700 font-medium text-sm sm:text-base">
              {loading ? "Please wait..." : "Continue with Google"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
