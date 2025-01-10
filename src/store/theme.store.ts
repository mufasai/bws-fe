import { createSignal } from "solid-js";

const [isDarkMode, setIsDarkMode] = createSignal(
  localStorage.getItem("theme") === "light"
);

export function useTheme() {
  const toggleTheme = () => {
    const newTheme = !isDarkMode();
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  return { isDarkMode, toggleTheme };
} 