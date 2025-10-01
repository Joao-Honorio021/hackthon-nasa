"use client";
import { useTheme } from "../contexts/ThemeContext";
import Stars from "./Stars.jsx";

const Card = ({
  title = "Livro Exemplo",
  description = "Uma breve descrição do livro que captura a essência da história.",
  image = "card.jpg",
  rating = 4.5,
  className = "",
}) => {
  const { cores } = useTheme();

  return (
    <div
      className={`
        w-full max-w-sm mx-auto relative overflow-hidden rounded-2xl 
        shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 
        backdrop-blur-sm ${className}
      `}
      style={{
        background: cores.background,
        border: `1px solid ${cores.accent}`,
      }}
    >
      {/* Efeito de fundo com gradiente nebuloso */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `linear-gradient(135deg, ${cores.nebulaColors[0]}, ${cores.nebulaColors[2]}, ${cores.nebulaColors[4]})`,
        }}
      />

      <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          src={image}
          alt={title}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x200/6366f1/white?text=Sem+Imagem";
          }}
        />

        {/* Overlay gradiente na imagem */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="relative p-3 sm:p-4 space-y-2 sm:space-y-3">
        <h3
          className="text-lg sm:text-xl font-bold line-clamp-2 transition-colors duration-200"
          style={{ color: cores.text }}
        >
          {title}
        </h3>

        <div className="flex items-center gap-2">
          <Stars rating={rating} />
          <span
            className="text-xs sm:text-sm font-medium"
            style={{ color: cores.menuActive }}
          >
            {rating}/5
          </span>
        </div>

        <p
          className="text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 leading-relaxed opacity-80"
          style={{ color: cores.text }}
        >
          {description}
        </p>

        <button
          className="w-full py-2 px-3 sm:px-4 rounded-lg text-sm font-medium 
                   transition-all duration-200 hover:shadow-md active:scale-95"
          style={{
            background: cores.buttonGradient,
            color: cores.text,
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
          }}
        >
          Ver Detalhes
        </button>
      </div>

      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 
                   hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(45deg, ${cores.highlight}, transparent, ${cores.accent})`,
          padding: "1px",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "subtract",
        }}
      />
    </div>
  );
};

export default Card;
