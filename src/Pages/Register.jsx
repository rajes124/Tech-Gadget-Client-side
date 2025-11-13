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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photo,
      });

      const newUser = { name, email, image: photo };

      await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newUser),
      });

      localStorage.setItem("user", JSON.stringify(userCredential.user));

      toast.success("Successfully Registered!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogleRegister = async () => {
    if (loading) return;
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const newUser = { name: user.displayName, email: user.email, image: user.photoURL };
      await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newUser),
      });

      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Google Registration Successful!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      if (err.code !== "auth/cancelled-popup-request") toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-8 py-10"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl p-6 sm:p-8 md:p-10 border border-white/40 rounded-2xl shadow-xl flex flex-col gap-6 sm:gap-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">Register</h2>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 bg-white p-3 rounded-lg text-gray-800 placeholder-gray-500 text-base sm:text-sm md:text-base"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 bg-white p-3 rounded-lg text-gray-800 placeholder-gray-500 text-base sm:text-sm md:text-base"
          />
          <input
            type="text"
            placeholder="Photo URL"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            className="border border-gray-300 bg-white p-3 rounded-lg text-gray-800 placeholder-gray-500 text-base sm:text-sm md:text-base"
          />

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 bg-white p-3 rounded-lg text-gray-800 placeholder-gray-500 w-full text-base sm:text-sm md:text-base"
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3 text-xl text-gray-600 cursor-pointer"
            >
              {showPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>

          <ToastContainer position="top-right" autoClose={3000} theme="colored" />

          <Link to="/login" className="text-blue-600 text-sm sm:text-base font-medium">
            Already have an account? Login
          </Link>

          <button
            type="submit"
            className="bg-green-600 text-white py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-green-700 hover:shadow-lg hover:scale-[1.02] w-full sm:w-auto text-center"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="mb-3 text-gray-700 font-semibold text-sm sm:text-base">Or Register with:</p>

          <button
            onClick={handleGoogleRegister}
            disabled={loading}
            className={`w-full flex items-center justify-center gap-3 border border-gray-300 bg-white py-3 rounded-full transition-all duration-200 ${
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
            <span className="text-gray-700 font-medium text-sm sm:text-base">
              {loading ? "Please wait..." : "Continue with Google"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
