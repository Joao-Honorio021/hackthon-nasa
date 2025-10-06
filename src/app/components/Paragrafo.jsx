import { useTheme } from "../contexts/ThemeContext";

const Paragrafo = ({ 
  children, 
  className = "",
  align = "left", // "left", "center", "right", "justify"
  size = "base", // "sm", "base", "lg", "xl"
  weight = "normal", // "light", "normal", "medium", "semibold", "bold"
  spacing = "normal", // "tight", "normal", "relaxed", "loose"
  style = {}
}) => {
  const { cores } = useTheme();

  // Mapeamento de tamanhos
  const tamanhos = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl"
  };

  // Mapeamento de pesos
  const pesos = {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold"
  };

  // Mapeamento de espaçamento entre linhas
  const espacamentos = {
    tight: "leading-tight",
    normal: "leading-normal",
    relaxed: "leading-relaxed",
    loose: "leading-loose"
  };

  // Mapeamento de alinhamento
  const alinhamentos = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
    justify: "text-justify"
  };

  return (
    <p
      className={`
        ${tamanhos[size]}
        ${pesos[weight]}
        ${espacamentos[spacing]}
        ${alinhamentos[align]}
        mb-4
        transition-colors duration-200
        ${className}
      `}
      style={{
        color: cores.text,
        opacity: 0.9,
        ...style
      }}
    >
      {children}
    </p>
  );
};

export default Paragrafo;