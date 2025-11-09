import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("user", "true");
    navigate("/");
  };

  return (
    <div className="text-center mt-20">
      <h2 className="text-2xl mb-4">Login</h2>
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-6 py-2 rounded"
      >
        Login Now
      </button>
    </div>
  );
};

export default Login;
