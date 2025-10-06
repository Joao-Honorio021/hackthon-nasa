"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiMenuBurger, CiHome, CiGrid41, CiSettings } from "react-icons/ci";
import {
  IoSettingsOutline,
  IoHomeOutline,
  IoGridOutline,
  IoCloseOutline,
} from "react-icons/io5";
import { useTheme } from "../contexts/ThemeContext";

const Menu = () => {
  const { cores, daltonico, theme } = useTheme();
  const [itemHover, setItemHover] = useState(null);
  const [menuAberto, setMenuAberto] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
    setMenuAberto(!mobile);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setMenuAberto(!mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mounted]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobile &&
        menuAberto &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuAberto(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, menuAberto]);

  useEffect(() => {
    if (isMobile) {
      setMenuAberto(false);
    }
  }, [pathname, isMobile]);

  const itensMenuPrincipal = [
    {
      nome: "Home",
      href: "/",
      icone: <IoHomeOutline className="text-xl" />,
    },
    {
      nome: "Catalog",
      href: "/Pages/Catalogo",
      icone: <IoGridOutline className="text-xl" />,
    },
  ];

  const itemConfiguracao = {
    nome: "Settings",
    href: "/Pages/Configuracao",
    icone: <IoSettingsOutline className="text-xl" />,
  };

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const getMenuBackground = () => {
    return `${cores.menuBg} backdrop-blur-lg border-r ${
      daltonico ? "border-opacity-20" : "border-opacity-30"
    }`;
  };

  const getHoverClasses = (isActive) => {
    if (isActive) {
      return `${cores.menuActive} border ${
        daltonico ? "border-opacity-40" : "border-opacity-50"
      } scale-105`;
    }
    return `hover:${cores.menuHover} border border-transparent hover:border-opacity-30`;
  };

  const getTextColor = (isActive) => {
    return isActive ? cores.highlight : cores.text;
  };

  const isItemActive = (href) => {
    return pathname === href;
  };

  if (!mounted) {
    return (
      <>
        {isMobile && (
          <button
            className="fixed top-4 left-4 z-50 p-3 rounded-lg backdrop-blur-md border transition-all duration-300"
            style={{
              backgroundColor: `${cores.text}15`,
              borderColor: `${cores.text}30`,
              color: cores.text,
            }}
            aria-label="Abrir menu"
          >
            <CiMenuBurger className="text-2xl" />
          </button>
        )}
      </>
    );
  }

  return (
    <>
      {isMobile && (
        <button
          onClick={toggleMenu}
          className="fixed top-4 left-4 z-50 p-3 rounded-lg backdrop-blur-md transition-all duration-300 hover:scale-105 border"
          style={{
            backgroundColor: `${cores.text}15`,
            borderColor: `${cores.text}30`,
            color: cores.text,
          }}
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuAberto}
        >
          {menuAberto ? (
            <IoCloseOutline className="text-2xl" />
          ) : (
            <CiMenuBurger className="text-2xl" />
          )}
        </button>
      )}

      <aside
        ref={menuRef}
        className={`fixed top-0 left-0 h-full z-40 flex flex-col transition-all duration-300 ease-in-out
                    ${getMenuBackground()}
                    ${
                      menuAberto
                        ? "w-64 translate-x-0"
                        : "w-0 -translate-x-full"
                    } 
                    ${isMobile ? "" : "w-64 translate-x-0"}`}
        style={{ height: "100vh" }}
        aria-hidden={!menuAberto}
      >
        {menuAberto && (
          <>
            <div
              className="p-6 border-b flex-shrink-0"
              style={{ borderColor: `${cores.text}${daltonico ? "20" : "30"}` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  
                  <h2
                    className="text-2xl text-center font-bold whitespace-nowrap bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x"
                    style={{
                      backgroundSize: "200% 200%",
                      animation: "gradientShift 3s ease infinite",
                    }}
                  >
                    AuroraQuest
                  </h2>
                </div>
                {isMobile && (
                  <button
                    onClick={toggleMenu}
                    className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
                    style={{
                      backgroundColor: `${cores.text}15`,
                      color: cores.text,
                    }}
                    aria-label="Fechar menu"
                  >
                    <IoCloseOutline className="text-xl" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 py-6 overflow-y-auto">
              <nav className="space-y-2 px-4" aria-label="Navegação principal">
                {itensMenuPrincipal.map((item, index) => {
                  const isHovered = itemHover === index;
                  const isActive = isItemActive(item.href);

                  return (
                    <Link
                      key={index}
                      href={item.href}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group ${
                        isActive
                          ? `${cores.menuActive} border ${
                              daltonico
                                ? "border-opacity-40"
                                : "border-opacity-50"
                            }`
                          : isHovered
                          ? getHoverClasses(true)
                          : getHoverClasses(false)
                      }`}
                      style={{
                        backgroundColor: isActive
                          ? `${cores.highlight}20`
                          : isHovered
                          ? `${cores.text}20`
                          : "transparent",
                        color: isActive
                          ? cores.highlight
                          : getTextColor(isHovered),
                        borderColor: isActive
                          ? `${cores.highlight}40`
                          : "transparent",
                      }}
                      onMouseEnter={() => setItemHover(index)}
                      onMouseLeave={() => setItemHover(null)}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <div
                        className={`transition-transform duration-200 ${
                          isActive
                            ? "scale-110"
                            : isHovered
                            ? "scale-110 rotate-12"
                            : ""
                        }`}
                        style={{
                          color: isActive ? cores.highlight : cores.text,
                        }}
                      >
                        {item.icone}
                      </div>
                      <span className="font-medium whitespace-nowrap">
                        {item.nome}
                      </span>

                      {(isActive || isHovered) && (
                        <div
                          className="ml-auto w-2 h-2 rounded-full animate-pulse"
                          style={{ backgroundColor: cores.highlight }}
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="px-4 flex-shrink-0">
              <div
                className="border-t"
                style={{
                  borderColor: `${cores.text}${daltonico ? "20" : "30"}`,
                }}
              />
            </div>

            <div className="p-6 flex-shrink-0">
              <Link
                href={itemConfiguracao.href}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group ${
                  isItemActive(itemConfiguracao.href)
                    ? `${cores.menuActive} border ${
                        daltonico ? "border-opacity-40" : "border-opacity-50"
                      }`
                    : itemHover === "configuracao"
                    ? getHoverClasses(true)
                    : getHoverClasses(false)
                }`}
                style={{
                  backgroundColor: isItemActive(itemConfiguracao.href)
                    ? `${cores.highlight}20`
                    : itemHover === "configuracao"
                    ? `${cores.text}20`
                    : "transparent",
                  color: isItemActive(itemConfiguracao.href)
                    ? cores.highlight
                    : getTextColor(itemHover === "configuracao"),
                  borderColor: isItemActive(itemConfiguracao.href)
                    ? `${cores.highlight}40`
                    : "transparent",
                }}
                onMouseEnter={() => setItemHover("configuracao")}
                onMouseLeave={() => setItemHover(null)}
                aria-current={
                  isItemActive(itemConfiguracao.href) ? "page" : undefined
                }
              >
                <div
                  className={`transition-transform duration-200 ${
                    isItemActive(itemConfiguracao.href)
                      ? "scale-110"
                      : itemHover === "configuracao"
                      ? "scale-110 rotate-12"
                      : ""
                  }`}
                  style={{
                    color: isItemActive(itemConfiguracao.href)
                      ? cores.highlight
                      : cores.text,
                  }}
                >
                  {itemConfiguracao.icone}
                </div>
                <span className="font-medium whitespace-nowrap">
                  {itemConfiguracao.nome}
                </span>

                {(isItemActive(itemConfiguracao.href) ||
                  itemHover === "configuracao") && (
                  <div
                    className="ml-auto w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: cores.highlight }}
                  />
                )}
              </Link>
            </div>

            <div className="px-4 pb-4 flex-shrink-0">
              <div
                className="text-xs px-3 py-1 rounded-full text-center border font-medium"
                style={{
                  backgroundColor: `${cores.highlight}15`,
                  borderColor: `${cores.highlight}30`,
                  color: cores.highlight,
                }}
              >
                Theme: <span style={{ color: cores.highlight }}>{theme}</span>
              </div>
            </div>
          </>
        )}
      </aside>

      {menuAberto && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 transition-opacity duration-300"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}

      <div
        className={`min-h-screen relative z-10 transition-all duration-300 ${
          menuAberto && !isMobile ? "ml-64" : "ml-0"
        }`}
      ></div>
    </>
  );
};

export default Menu;
