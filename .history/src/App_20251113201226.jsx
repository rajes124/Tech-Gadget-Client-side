// App.jsx
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div
      className={`flex flex-col min-h-screen transition-colors duration-300 
        ${theme === "dark" ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"}`}
    >
      {/* Navbar gets theme props */}
      <Navbar theme={theme} setTheme={setTheme} />

      {/* All Routed Pages */}
      <main className="flex-grow">
        <Outlet context={{ theme, setTheme }} />
      </main>

      <Footer theme={theme} />
    </div>
  );
};

export default App;
