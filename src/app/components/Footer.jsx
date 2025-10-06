"use client";
import { useTheme } from "../contexts/ThemeContext";
import Link from "next/link";

const Footer = () => {
  const { cores, theme } = useTheme();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Catalog", href: "/Pages/Catalogo" },
    { name: "Settings", href: "/Pages/Configuracao" }
  ];

  return (
    <footer 
      className="w-full border-t"
      style={{
        backgroundColor: cores.background,
        borderColor: `${cores.border}30`,
        marginLeft: 'auto',
        width: '100%'
      }}
    >
      <div className="ml-0 md:ml-64 transition-all duration-300">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Brand */}
            <div className="text-center md:text-left">
              <h3 
                className="text-xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent"
              >
                AuroraQuest
              </h3>
              <p 
                className="text-xs mt-1"
                style={{ color: cores.text, opacity: 0.7 }}
              >
                Explore os climas espaciais com a gente!
              </p>
            </div>

            {/* Links */}
            <div className="flex space-x-6">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-sm transition-all duration-300 hover:underline"
                  style={{ 
                    color: cores.text,
                    opacity: 0.8
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p 
                className="text-xs"
                style={{ color: cores.text, opacity: 0.7 }}
              >
                &copy; {currentYear} AuroraQuest
              </p>
              <p 
                className="text-xs mt-1"
                style={{ color: cores.text, opacity: 0.6 }}
              >
                by Hackthon NASA 2025
              </p>
            </div>
          </div>

          {/* Theme Indicator */}
          <div className="text-center mt-4">
            <span 
              className="text-xs px-2 py-1 rounded-full border"
              style={{
                backgroundColor: `${cores.highlight}10`,
                borderColor: `${cores.highlight}20`,
                color: cores.highlight
              }}
            >
              {theme} theme
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;