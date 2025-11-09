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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Successful!");

      // ✅ Delay navigation so toast is visible
      setTimeout(() => {
        navigate("/");
      }, 1000); // 1 second
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        toast.error("No account found with this email!");
      } else if (err.code === "auth/wrong-password") {
        toast.error("Incorrect password!");
      } else {
        toast.error(err.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Google Login Successful!");

      setTimeout(() => {
        navigate("/");
      }, 1000); // 1 second
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="max-w-md w-full bg-white/80 backdrop-blur-xl p-8 border border-white/40 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Login</h2>

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

          {/* ✅ Toast container above the button */}
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />

          <div className="flex justify-between text-sm">
            <Link className="text-blue-600 font-medium">Forget Password?</Link>
            <Link to="/register" className="text-blue-600 font-medium">Register</Link>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-lg font-semibold
                       transition-all duration-200 hover:bg-blue-700 hover:shadow-lg hover:scale-[1.02]"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="mb-3 text-gray-700 font-semibold">Or login with:</p>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-white py-3
                       rounded-full transition-all duration-200 hover:bg-gray-100 hover:shadow-md hover:scale-[1.02]"
          >
            <img
              src="https://www.gstatic.com/images/branding/product/1x/gsa_64dp.png"
              alt="Google"
              className="w-5"
            />
            <span className="text-gray-700 font-medium">Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
