import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";



import { AuthProvider } from "@/contexts/AuthContext";

import "./index.css";



// Apply initial theme synchronously to avoid flash
const saved = localStorage.getItem("theme");
const prefersDark = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
const initial = (saved === "light" || saved === "dark") ? saved : (prefersDark ? "dark" : "light");
if (initial === "dark") {
	document.documentElement.classList.add("dark");
	document.documentElement.classList.remove("light");
} else {
	document.documentElement.classList.add("light");
	document.documentElement.classList.remove("dark");
}

createRoot(document.getElementById("root")!).render(


  <AuthProvider>
    <App />
  </AuthProvider>

);

