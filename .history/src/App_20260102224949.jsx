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
    <div className="flex flex-col min-h-screen transition-colors duration-300">
      {/* Navbar */}
      <Navbar theme={theme} setTheme={setTheme} />

      {/* Pages - background প্রত্যেক পেজ নিজে কন্ট্রোল করবে */}
      <main className="flex-grow">
        <Outlet context={{ theme, setTheme }} />
      </main>

      {/* Footer */}
      <Footer theme={theme} />
    </div>
  );
};

export default App;