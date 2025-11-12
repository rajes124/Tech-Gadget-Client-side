import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase.config";
import bgImg from "../assets/background.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Email-Password Register Function
  const handleRegister = async (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 6 characters, with uppercase & lowercase letters."
      );
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photo,
      });

      // ✅ MongoDB তে নতুন user save হবে
      const newUser = {
        name: name,
        email: email,
        image: photo,
      };

      await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      // ✅ localStorage এ রাখো যাতে Navbar সাথে সাথে আপডেট হয়
      localStorage.setItem("user", JSON.stringify(userCredential.user));

      toast.success("Successfully Registered!");
      setTimeout(() => {
        navigate("/"); // Register শেষে Home এ যাবে
      }, 1000);
    } catch (err) {
      toast.error(err.message);
    }
  };

  // ✅ Google Register Function (Fixed)
  const handleGoogleRegister = async () => {
    if (loading) return;
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // ✅ Google user MongoDB তে save হবে
      const newUser = {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      };

      await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      // ✅ এখনই user-কে localStorage-এ রাখো
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Google Registration Successful!");

      setTimeout(() => {
        navigate("/"); // Home page এ redirect
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
          Register
        </h2>

        <form onSubmit={handleRegister} className="flex flex-col gap-5 relative">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 bg-white p-3 rounded-lg text-gray-800 placeholder-gray-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 bg-white p-3 rounded-lg text-gray-800 placeholder-gray-500"
          />

          <input
            type="text"
            placeholder="Photo URL"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
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

          <Link to="/login" className="text-blue-600 text-sm font-medium">
            Already have an account? Login
          </Link>

          <button
            type="submit"
            className="bg-green-600 text-white py-3 rounded-lg font-semibold
                       transition-all duration-200 hover:bg-green-700 hover:shadow-lg hover:scale-[1.02]"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="mb-3 text-gray-700 font-semibold">Or Register with:</p>

          <button
            onClick={handleGoogleRegister}
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

export default Register;
