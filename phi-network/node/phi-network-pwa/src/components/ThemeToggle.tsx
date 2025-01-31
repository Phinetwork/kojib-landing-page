// src/components/ThemeToggle.tsx
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 bg-opacity-60 hover:bg-opacity-80 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
      aria-label="Toggle Dark Mode"
    >
      {isDark ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-200" />}
    </button>
  );
};

export default ThemeToggle;
