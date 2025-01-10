<<<<<<< HEAD
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
=======
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
>>>>>>> 6f6949f4938d86ba0e2c06119519abfba8adc3d1
} 