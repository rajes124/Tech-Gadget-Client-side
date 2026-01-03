import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  const [theme, setTheme] = useState(() => {
    // System preference + localStorage check (better UX)
    if (localStorage.getItem("theme") === "dark" || 
        (!localStorage.getItem("theme") && 
         window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      return "dark";
    }
    return "light";
  });

  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
      document.body.classList.add("dark"); // body-তেও add করো
    } else {
      html.classList.remove("dark");
      document.body.classList.remove("dark"); // body থেকে remove করো
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-500"> {/* gray-50 better light bg */}
      <Navbar theme={theme} setTheme={setTheme} />
      <main className="flex-grow">
        <Outlet context={{ theme, setTheme }} />
      </main>
      <Footer theme={theme} />
    </div>
  );
};

export default App;