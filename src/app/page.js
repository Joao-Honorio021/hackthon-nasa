"use client";

import { useState } from "react";
import Link from "next/link";
import Menu from "./components/Menu.jsx";
import Stars from "./components/Stars.jsx";
import { useTheme } from "./contexts/ThemeContext";
import { IoMdThunderstorm } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import { GiSparkles } from "react-icons/gi";
import { BiSolidSun } from "react-icons/bi";
// Importe o novo componente
import SolarStoryLoader from "./components/SolarStoryLoading.jsx"; 

export default function Home() {
  const { cores } = useTheme();
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className={`min-h-screen ${cores.background}`}>
      <Stars count={150} />
      

      <main className="relative z-10 p-4 sm:p-6 md:p-8 md:ml-[300px] lg:ml-[320px]">
        <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-8 md:space-y-10 max-w-4xl mx-auto">
          
          {/* Ícone Principal com Sol de Fundo */}
          <div className="relative flex items-center justify-center">
            <BiSolidSun 
              className={`${cores.accent} absolute animate-spin opacity-20`}
              size={200}
              style={{ animationDuration: '30s' }}
            />
            
            <div className="relative z-10">
              <IoMdThunderstorm 
                className={`${cores.accent} animate-pulse`}
                size={120}
                style={{ 
                  filter: 'drop-shadow(0 0 40px currentColor)',
                  animationDuration: '2s'
                }}
              />
              <GiSparkles 
                className={`${cores.highlight} absolute -top-3 -right-3 animate-spin`}
                size={35}
                style={{ 
                  animationDuration: '3s',
                  filter: 'drop-shadow(0 0 15px currentColor)'
                }}
              />
            </div>
          </div>

          {/* Título Principal */}
          <div className="space-y-4">
            <h1 
              className={`text-4xl sm:text-6xl md:text-7xl font-black ${cores.text} leading-tight tracking-tight`}
              style={{ 
                textShadow: '0 8px 30px rgba(0,0,0,0.7)',
                letterSpacing: '-0.02em'
              }}
            >
              Storm
              <br />
              <span className={cores.accent}>Solar</span>
            </h1>
            <div className={`h-2 w-48 sm:w-64 mx-auto bg-gradient-to-r ${cores.buttonGradient} rounded-full shadow-lg`} />
          </div>

          {/* Descrição Principal */}
          <p 
            className={`text-xl sm:text-2xl md:text-3xl ${cores.text} font-bold max-w-3xl leading-snug px-4`}
            style={{ textShadow: '0 4px 15px rgba(0,0,0,0.5)' }}
          >
            Explore the power of the Sun!
            <span className="inline-block ml-2 text-3xl sm:text-4xl">☀️</span>
          </p>

     
          <p className={`text-lg sm:text-xl md:text-2xl ${cores.accent} font-semibold max-w-2xl px-4`}>
           Learn about the incredible geomagnetic storms that light up space! ✨🚀
          </p>

     
          <Link 
            href="/Pages/Catalogo" title="Catalogo"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={`
              group relative inline-flex items-center justify-center gap-4 sm:gap-5
              px-10 sm:px-14 md:px-16 py-5 sm:py-6 md:py-7
              text-2xl sm:text-3xl md:text-4xl font-black rounded-full
              bg-gradient-to-r ${cores.buttonGradient}
              ${cores.text} shadow-2xl
              transform transition-all duration-300
              hover:scale-110 active:scale-95
              animate-pulse
            `}
            style={{
              boxShadow: isHovering 
                ? '0 0 60px rgba(251, 191, 36, 0.8), 0 15px 50px rgba(0,0,0,0.5)' 
                : '0 15px 50px rgba(0,0,0,0.5)',
              animationDuration: '3s'
            }}
          >
            <FaPlay 
              size={35}
              className={`transition-all duration-300 ${isHovering ? 'translate-x-2 scale-110' : ''}`}
            />
            <span className="leading-none">WATCH VIDEOS!</span>
            
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
            <div className="absolute -inset-2 rounded-full border-4 border-white/20 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
          </Link>
        </div>

        <SolarStoryLoader  />
        
      </main>
      <Menu />
    </div>
  );

}