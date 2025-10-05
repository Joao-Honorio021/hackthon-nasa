"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { DiAptana } from "react-icons/di";
import { useTheme } from "../contexts/ThemeContext";
import { CiMenuBurger } from "react-icons/ci";

const Menu = () => {
  const { cores } = useTheme();
  const [itemHover, definirItemHover] = useState(null);
  const [menuAberto, setMenuAberto] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
    setMenuAberto(!mobile);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setMenuAberto(true);
      if (mobile && menuAberto) setMenuAberto(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuAberto, mounted]);

  const itensMenuPrincipal = [
    { nome: "Início", href: "/" },
    { nome: "Catalogo", href: "/Pages/Catalogo" },
    { nome: "blaba", href: "#" },
   
  ];
  const itemConfiguracao = { nome: "Configuração", href: "/Pages/Configuracao" };

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <>
      {isMobile && mounted && (
        <button
          onClick={toggleMenu}
          className={`fixed top-4 left-4 z-50 p-3 rounded-lg
                     transition-all duration-300 transform
                     hover:scale-105 active:scale-95
                     ${
                       menuAberto
                         ? "bg-transparent hover:bg-slate-800/20"
                         : "bg-slate-900/80 backdrop-blur-md hover:bg-slate-800/80 shadow-lg"
                     }`}
          aria-label="Toggle menu"
          style={{ color: cores.text }}
        >
          <CiMenuBurger
            className={`text-2xl transform transition-all duration-300 ${
              menuAberto ? "rotate-180 scale-110" : ""
            }`}
          />
        </button>
      )}

      <aside
        className={`fixed top-0 left-0 h-screen bg-slate-900/60 backdrop-blur-md
                    p-6 overflow-hidden z-50 flex flex-col transition-all duration-500
                    ${
                      menuAberto
                        ? "w-56 sm:w-54 md:w-52 lg:w-60 translate-x-0"
                        : "w-0 -translate-x-full"
                    }`}
        style={{ color: cores.text }}
      >
        {/* Estrelas e Bolinhas  */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => {
            // Usando valores determinísticos baseados no índice
            const left = `${((Math.sin(i * 0.7) + 1) * 50).toFixed(2)}%`;
            const top = `${((Math.cos(i * 0.5) + 1) * 50).toFixed(2)}%`;
            const delay = `${((i * 0.1) % 3).toFixed(2)}s`;
            const opacity = (((Math.sin(i) + 1) / 2) * 0.8 + 0.2).toFixed(2);

            return (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={{
                  left,
                  top,
                  animationDelay: delay,
                  opacity,
                }}
              />
            );
          })}
        </div>

        <div
          className="absolute top-10 right-4 w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full opacity-60 animate-bounce"
          style={{ animationDuration: "3s" }}
        />
        <div
          className="absolute top-32 left-2 w-6 h-6 bg-gradient-to-r from-red-400 to-orange-300 rounded-full opacity-50 animate-bounce"
          style={{ animationDuration: "4s", animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-20 right-2 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-300 rounded-full opacity-70 animate-bounce"
          style={{ animationDuration: "5s", animationDelay: "2s" }}
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-12">
            <h2 className={`text-xl font-bold ${cores.accent}`}>
              Nome Projeto
            </h2>

            {isMobile && (
              <button
                onClick={toggleMenu}
                className="p-2 hover:bg-slate-800/50 rounded-lg
                           transition-all duration-300
                           hover:scale-110 active:scale-95"
                aria-label="Close menu"
              >
                <CiMenuBurger
                  className={`text-2xl transition-all duration-300
                             ${cores.text} hover:${cores.accent}`}
                />
              </button>
            )}
          </div>

          <nav
            className={`transition-opacity duration-300 ${
              menuAberto ? "opacity-100" : "opacity-0"
            }`}
          >
            <ul className="space-y-4">
              {itensMenuPrincipal.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className={`group flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 transform
                      hover:scale-105 hover:bg-gradient-to-r hover:from-purple-800/50 hover:to-cyan-800/50
                      hover:shadow-lg hover:shadow-cyan-500/25 ${
                        itemHover === index
                          ? "bg-gradient-to-r from-purple-800/30 to-cyan-800/30"
                          : ""
                      }`}
                    onMouseEnter={() => definirItemHover(index)}
                    onMouseLeave={() => definirItemHover(null)}
                  >
                    <span
                      className={`text-lg font-medium transition-all duration-300 ${
                        itemHover === index
                          ? "text-cyan-300 translate-x-1"
                          : "text-gray-200"
                      }`}
                    >
                      {item.nome}
                    </span>
                    {itemHover === index && (
                      <div className="ml-auto">
                        <div className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse" />
                      </div>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div
          className={`mt-auto relative z-10 transition-opacity duration-300 ${
            menuAberto ? "opacity-100" : "opacity-0"
          }`}
        >
          <nav>
            <ul>
              <li>
                <Link
                  href={itemConfiguracao.href}
                  className={`group flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 transform 
                    hover:scale-105 hover:bg-gradient-to-r hover:from-purple-800/50 hover:to-cyan-800/50 
                    hover:shadow-lg hover:shadow-cyan-500/25 ${
                      itemHover === "configuracao"
                        ? "bg-gradient-to-r from-purple-800/30 to-cyan-800/30"
                        : ""
                    }`}
                  onMouseEnter={() => definirItemHover("configuracao")}
                  onMouseLeave={() => definirItemHover(null)}
                >
                  <span className="text-xl text-gray-200 group-hover:text-cyan-300 transition-colors duration-300">
                    <DiAptana />
                  </span>

                  <span
                    className={`text-lg font-medium transition-all duration-300 ${
                      itemHover === "configuracao"
                        ? "text-cyan-300 translate-x-1"
                        : "text-gray-200"
                    }`}
                  >
                    {itemConfiguracao.nome}
                  </span>

                  {itemHover === "configuracao" && (
                    <div className="ml-auto">
                      <div className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse" />
                    </div>
                  )}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {menuAberto && isMobile && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40
                     transition-opacity duration-500 ease-in-out"
          onClick={toggleMenu}
        />
      )}
    </>
  );
};

export default Menu;
