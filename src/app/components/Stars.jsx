"use client";
import { useTheme } from "../contexts/ThemeContext";
import { useEffect, useState } from "react";

const Stars = ({ count = 100 }) => {
  const { theme } = useTheme();
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: `${Math.sin(i * 0.5) * 50 + 50}%`,
        y: `${Math.cos(i * 0.7) * 50 + 50}%`,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 3,
        duration: Math.random() * 3 + 2,
        opacity: Math.random() * 0.5 + 0.5,
      }));
    };

    setStars(generateStars());
  }, [count]);

  const getStarColor = () => {
    switch (theme) {
      case "deuteranopia":
        return "bg-yellow-200";
      case "protanopia":
        return "bg-blue-200";
      case "tritanopia":
        return "bg-purple-200";
      case "acromatopsia":
        return "bg-gray-200";
      default:
        return "bg-white";
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Estrelas pequenas */}
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full ${getStarColor()} animate-twinkle`}
          style={{
            left: star.x,
            top: star.y,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}

      {/* Nebulosas e galáxias distantes */}
      <div className="absolute inset-0">
        <div className="absolute w-full h-full opacity-30 mix-blend-screen">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full blur-3xl animate-pulse`}
              style={{
                left: `${Math.sin(i * 72) * 30 + 50}%`,
                top: `${Math.cos(i * 72) * 30 + 50}%`,
                width: "150px",
                height: "150px",
                background: getNebulaGradient(theme, i),
                opacity: 0.15,
                animationDelay: `${i * 0.5}s`,
                animationDuration: "4s",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Função para gerar gradientes de nebulosa baseados no tema
const getNebulaGradient = (theme, index) => {
  const gradients = {
    default: [
      "radial-gradient(circle, #4c1d95 0%, #1e1b4b 100%)",
      "radial-gradient(circle, #5b21b6 0%, #1e1b4b 100%)",
      "radial-gradient(circle, #6d28d9 0%, #1e1b4b 100%)",
      "radial-gradient(circle, #7c3aed 0%, #1e1b4b 100%)",
      "radial-gradient(circle, #8b5cf6 0%, #1e1b4b 100%)",
    ],
    deuteranopia: [
      "radial-gradient(circle, #854d0e 0%, #1e1b4b 100%)",
      "radial-gradient(circle, #a16207 0%, #1e1b4b 100%)",
      "radial-gradient(circle, #ca8a04 0%, #1e1b4b 100%)",
      "radial-gradient(circle, #eab308 0%, #1e1b4b 100%)",
      "radial-gradient(circle, #facc15 0%, #1e1b4b 100%)",
    ],
    protanopia: [
      "radial-gradient(circle, #1e40af 0%, #1e1b4b 100%)",
      "radial-gradient(circle, #1d4ed8 0%, #1e1b4b 100%)",
      "radial-gradient(circle, #2563eb 0%, #1e1b4b 100%)",
      "radial-gradient(circle, #3b82f6 0%, #1e1b4b 100%)",
      "radial-gradient(circle, #60a5fa 0%, #1e1b4b 100%)",
    ],
    tritanopia: [
      "radial-gradient(circle, #9f1239 0%, #1e1b4b 100%)",
      "radial-gradient(circle, #be123c 0%, #1e1b4b 100%)",
      "radial-gradient(circle, #e11d48 0%, #1e1b4b 100%)",
      "radial-gradient(circle, #f43f5e 0%, #1e1b4b 100%)",
      "radial-gradient(circle, #fb7185 0%, #1e1b4b 100%)",
    ],
    acromatopsia: [
      "radial-gradient(circle, #374151 0%, #1f2937 100%)",
      "radial-gradient(circle, #4b5563 0%, #1f2937 100%)",
      "radial-gradient(circle, #6b7280 0%, #1f2937 100%)",
      "radial-gradient(circle, #9ca3af 0%, #1f2937 100%)",
      "radial-gradient(circle, #d1d5db 0%, #1f2937 100%)",
    ],
  };

  return gradients[theme]?.[index] || gradients.default[index];
};

export default Stars;
