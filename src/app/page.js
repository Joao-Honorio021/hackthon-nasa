"use client";

import Menu from "./components/Menu.jsx";
import Heading from "./components/heading.jsx";
import Stars from "./components/Stars.jsx";
import { useTheme } from "./contexts/ThemeContext";
import Card from "./components/card.jsx";
export default function Home() {
  const { cores } = useTheme();

  return (
    <div className={`min-h-screen ${cores.background}`}>
      <Stars count={150} />
      <Menu />
      <Heading />

      <main
        className="p-4 relative z-10 top-20 transition-all duration-500
             md:ml-[300px] lg:ml-[320px]
             sm:p-6 md:p-8"
      >
        <Card />
      </main>
    </div>
  );
}
