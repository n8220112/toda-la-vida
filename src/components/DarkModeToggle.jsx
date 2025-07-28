import React, {useState, useEffect} from "react";
import {IoMoon} from "react-icons/io5";

const DarkModeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <button onClick={toggleTheme}>
      <IoMoon />
    </button>
  );
};

export default DarkModeToggle;
