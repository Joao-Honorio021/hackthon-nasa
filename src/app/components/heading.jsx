"use client";
import { useTheme } from "../contexts/ThemeContext";

const Heading = () => {
  const { cores } = useTheme();

  return (
    <header
      className={`text-3xl p-4 text-center ml-56 sm:ml-64 md:ml-72 lg:ml-80 ${cores.text}`}
    >
      <h1 className={`text-center ${cores.accent}`}>NASA Hackathon</h1>
    </header>
  );
};

export default Heading;
