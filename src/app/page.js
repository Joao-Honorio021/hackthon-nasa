"use client";

import Menu from "./components/Menu.jsx";
import Heading from "./components/heading.jsx";
import Stars from "./components/Stars.jsx";
import { useTheme } from "./contexts/ThemeContext";

export default function Home() {
  const { cores } = useTheme();

  return (
    <div className={`min-h-screen ${cores.background}`}>
      <Stars count={150} />
      <Menu />
      <Heading />
      <main className="p-4 relative z-10"></main>
    </div>
  );
}
