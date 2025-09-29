"use client";
import { useTheme } from "../contexts/ThemeContext";

const Heading = () => {
  const { cores } = useTheme();

  return (
    <header
      className={`fixed top-0 right-0 left-0 text-2xl sm:text-3xl p-4 text-center
                 transition-all duration-500
                 md:pl-[320px] md:pr-8
                 ${cores.text} z-20`}
    >
      <h1 className={`text-center ${cores.accent}`}>NASA Hackathon</h1>
    </header>
  );
};

export default Heading;
