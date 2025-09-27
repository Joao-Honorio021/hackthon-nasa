"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const schemasDeCores = {
  default: {
    primary: "from-indigo-950 via-purple-900 to-black",
    text: "text-white",
    accent: "text-cyan-300",
    background: "bg-gradient-to-br from-indigo-950 via-purple-900 to-black",
    menuBg: "bg-indigo-950/60",
    menuHover: "hover:from-purple-800/50 hover:to-cyan-800/50",
    menuActive: "from-purple-800/30 to-cyan-800/30",
    buttonGradient: "from-purple-700 to-cyan-600",
    highlight: "text-cyan-300",
    starColor: "bg-white",
    nebulaColors: ["#4C1D95", "#5B21B6", "#6D28D9", "#7C3AED", "#8B5CF6"],
  },
  deuteranopia: {
    primary: "from-slate-950 via-blue-900 to-black",
    text: "text-blue-100",
    accent: "text-yellow-300",
    background: "bg-gradient-to-br from-slate-950 via-blue-900 to-black",
    menuBg: "bg-slate-950/60",
    menuHover: "hover:from-blue-800/50 hover:to-yellow-800/50",
    menuActive: "from-blue-800/30 to-yellow-800/30",
    buttonGradient: "from-blue-700 to-yellow-600",
    highlight: "text-yellow-300",
    starColor: "bg-yellow-200",
    nebulaColors: ["#1E40AF", "#1D4ED8", "#2563EB", "#3B82F6", "#60A5FA"],
  },
  protanopia: {
    primary: "from-slate-950 via-blue-900 to-black",
    text: "text-blue-100",
    accent: "text-blue-300",
    background: "bg-gradient-to-br from-slate-950 via-blue-900 to-black",
    menuBg: "bg-slate-950/60",
    menuHover: "hover:from-blue-900/50 hover:to-blue-700/50",
    menuActive: "from-blue-900/30 to-blue-700/30",
    buttonGradient: "from-blue-800 to-blue-600",
    highlight: "text-blue-300",
    starColor: "bg-blue-200",
    nebulaColors: ["#1E3A8A", "#1E40AF", "#1D4ED8", "#2563EB", "#3B82F6"],
  },
  tritanopia: {
    primary: "from-slate-950 via-purple-900 to-black",
    text: "text-purple-100",
    accent: "text-purple-300",
    background: "bg-gradient-to-br from-slate-950 via-purple-900 to-black",
    menuBg: "bg-slate-950/60",
    menuHover: "hover:from-purple-800/50 hover:to-purple-600/50",
    menuActive: "from-purple-800/30 to-purple-600/30",
    buttonGradient: "from-purple-700 to-purple-500",
    highlight: "text-purple-300",
    starColor: "bg-purple-200",
    nebulaColors: ["#4C1D95", "#5B21B6", "#6D28D9", "#7C3AED", "#8B5CF6"],
  },
  acromatopsia: {
    primary: "from-gray-950 via-gray-900 to-black",
    text: "text-gray-300",
    accent: "text-gray-100",
    background: "bg-gradient-to-br from-gray-950 via-gray-900 to-black",
    menuBg: "bg-gray-950/60",
    menuHover: "hover:from-gray-800/50 hover:to-gray-700/50",
    menuActive: "from-gray-800/30 to-gray-700/30",
    buttonGradient: "from-gray-700 to-gray-600",
    highlight: "text-white",
    starColor: "bg-gray-200",
    nebulaColors: ["#111827", "#1F2937", "#374151", "#4B5563", "#6B7280"],
  },
};

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState("default");
  const [daltonico, setDaltonico] = useState(false);
  const [idade, setIdade] = useState("");

  const atualizarDoLocalStorage = () => {
    try {
      const savedTheme = localStorage.getItem("tipoDaltonismo");
      const isDaltonico = localStorage.getItem("daltonico") === "true";
      const savedIdade = localStorage.getItem("idade") || "";

      const temaAtual =
        isDaltonico && savedTheme && schemasDeCores[savedTheme]
          ? savedTheme
          : "default";

      setCurrentTheme(temaAtual);
      setDaltonico(isDaltonico);
      setIdade(savedIdade);
    } catch (error) {
      console.error("Erro ao atualizar tema:", error);
      setCurrentTheme("default");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      atualizarDoLocalStorage();
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "tipoDaltonismo" || e.key === "daltonico") {
        atualizarDoLocalStorage();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const cores = schemasDeCores[currentTheme] || schemasDeCores.default;

  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
        cores,
        daltonico,
        idade,
        atualizarTema: atualizarDoLocalStorage,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
  }
  return context;
}
// Lohan evite mexer aq pfv so mexa nos schemas.//
