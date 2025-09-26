'use client';
import { useState } from 'react';

const Menu = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  // 1. Separe o item "configuração" dos itens principais do menu
  const mainMenuItems = [
    { name: 'Home', href: '#' },
    { name: 'Qualquer coisa', href: '#' },
    { name: 'blaba', href: '#' },
    { name: 'vlabla', href: '#' },
    { name: 'blabla', href: '#' },
  ];
  const settingsItem = { name: "configuração", href: "#" };

  return (
    // 2. Adicione `flex flex-col` para criar um layout de coluna flexível
    <aside className="block fixed top-0 left-0 h-screen
                      w-56 sm:w-54 md:w-52 lg:w-60
                      bg-slate-900/60 backdrop-blur-md
                      p-6 text-white overflow-hidden z-50
                      flex flex-col"> {/* <-- MUDANÇA AQUI */}

      {/* Estrelas e Bolinhas (código original mantido) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.8 + 0.2
            }}
          />
        ))}
      </div>
      <div className="absolute top-10 right-4 w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full opacity-60 animate-bounce" style={{ animationDuration: '3s' }} />
      <div className="absolute top-32 left-2 w-6 h-6 bg-gradient-to-r from-red-400 to-orange-300 rounded-full opacity-50 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }} />
      <div className="absolute bottom-20 right-2 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-300 rounded-full opacity-70 animate-bounce" style={{ animationDuration: '5s', animationDelay: '2s' }} />

      {/* Container para o conteúdo do topo (logo e menu principal) */}
      <div className="relative z-10">
        <div className="block mb-12 text-center">
          <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
            Nome Projeto
          </h2>
        </div>

        {/* Menu Principal */}
        <nav>
          <ul className="space-y-4">
            {mainMenuItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className={`group flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 transform
                    hover:scale-105 hover:bg-gradient-to-r hover:from-purple-800/50 hover:to-cyan-800/50
                    hover:shadow-lg hover:shadow-cyan-500/25 ${
                      hoveredItem === index ? 'bg-gradient-to-r from-purple-800/30 to-cyan-800/30' : ''
                    }`}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <span
                    className={`text-lg font-medium transition-all duration-300 ${
                      hoveredItem === index ? 'text-cyan-300 translate-x-1' : 'text-gray-200'
                    }`}
                  >
                    {item.name}
                  </span>
                  {hoveredItem === index && (
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

      {/* 3. Crie um container para o item de rodapé. `mt-auto` o empurra para baixo */}
      <div className="mt-auto relative z-10"> {/* <-- MUDANÇA AQUI */}
        <nav>
          <ul>
            {/* Item de Configuração */}
            <li>
              <a
                href={settingsItem.href}
                className={`group flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 transform
                  hover:scale-105 hover:bg-gradient-to-r hover:from-purple-800/50 hover:to-cyan-800/50
                  hover:shadow-lg hover:shadow-cyan-500/25 ${
                    hoveredItem === 'settings' ? 'bg-gradient-to-r from-purple-800/30 to-cyan-800/30' : ''
                  }`}
                onMouseEnter={() => setHoveredItem('settings')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <span
                  className={`text-lg font-medium transition-all duration-300 ${
                    hoveredItem === 'settings' ? 'text-cyan-300 translate-x-1' : 'text-gray-200'
                  }`}
                >
                  {settingsItem.name}
                </span>
                {hoveredItem === 'settings' && (
                  <div className="ml-auto">
                    <div className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse" />
                  </div>
                )}
              </a>
            </li>
          </ul>
        </nav>
      </div>

    </aside>
  );
};

export default Menu;