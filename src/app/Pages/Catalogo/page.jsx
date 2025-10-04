"use client";

import Stars from "@/app/components/Stars";
import { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

const { default: Card } = require("@/app/components/card");
const Heading = require("../../components/heading").default;
const Menu = require("../../components/Menu").default;
const { useTheme } = require("../../contexts/ThemeContext");

const Catalogo = () => {
  const { cores } = useTheme();
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);

  const livros = [
    {
      id: 1,
      titulo: "Star Wars: Uma Nova Esperança",
      descricao: "A jornada épica de Luke Skywalker contra o Império Galáctico",
      imagem: "/card.jpg"
    },
    {
      id: 2,
      titulo: "O Império Contra-Ataca",
      descricao: "A saga continua com batalhas épicas e revelações surpreendentes",
      imagem: "/card.jpg"
    },
    {
      id: 3,
      titulo: "O Retorno de Jedi",
      descricao: "O confronto final entre o bem e o mal na galáxia",
      imagem: "/card.jpg"
    },
    {
      id: 4,
      titulo: "A Ameaça Fantasma",
      descricao: "O início da saga mostra a ascensão de um herói improvável",
      imagem: "/card.jpg"
    }
  ];

  const livrosFiltrados = livros.filter(livro => 
    livro.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className={`min-h-screen ${cores.background}`}>
      <Stars count={250} />
      
      <Heading>Catálogo</Heading>
      <Menu />

      <button
        onClick={() => setModalAberto(true)}
        className="fixed top-6 right-6 z-30 p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all hover:scale-110 md:top-6 md:right-8"
        aria-label="Abrir busca"
      >
        <FiSearch size={24} />
      </button>

      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setModalAberto(false)}
          />
          
          <div className="relative w-full max-w-3xl bg-gradient-to-br from-purple-900/95 to-blue-900/95 rounded-2xl shadow-2xl border border-white/20 p-6 max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Buscar Livros</h2>
              <button
                onClick={() => setModalAberto(false)}
                className="p-2 rounded-full hover:bg-white/10 text-white transition-all"
                aria-label="Fechar busca"
              >
                <FiX size={24} />
              </button>
            </div>

            <input
              type="text"
              placeholder="Digite o título do livro..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              autoFocus
              className="w-full px-4 py-4 rounded-lg bg-white/10 border border-white/20 text-white text-lg placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all mb-4"
            />
            
            <p className="text-center text-white/70 text-sm mb-4">
              {livrosFiltrados.length} {livrosFiltrados.length === 1 ? 'livro encontrado' : 'livros encontrados'}
            </p>

            {busca && (
              <button
                onClick={() => setBusca("")}
                className="mb-4 w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 text-sm transition-all"
              >
                Limpar busca
              </button>
            )}

            <div className="flex-1 overflow-y-auto pr-2 space-y-3">
              {busca && livrosFiltrados.length > 0 ? (
                livrosFiltrados.map(livro => (
                  <div 
                    key={livro.id}
                    className="flex items-center gap-4 p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all cursor-pointer group"
                    onClick={() => setModalAberto(false)}
                  >
                    <img 
                      src={livro.imagem} 
                      alt={livro.titulo}
                      className="w-16 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg group-hover:text-blue-400 transition-colors">
                        {livro.titulo}
                      </h3>
                      <p className="text-white/60 text-sm line-clamp-2 mt-1">
                        {livro.descricao}
                      </p>
                    </div>
                  </div>
                ))
              ) : busca && livrosFiltrados.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-white/70 text-lg">Nenhum livro encontrado</p>
                  <p className="text-white/50 text-sm mt-2">Tente buscar por outro termo</p>
                </div>
              ) : (
                <div className="text-center py-8 text-white/50">
                  Digite algo para começar a buscar...
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <main className="pt-24 sm:pt-28 pb-16 px-4 md:px-8 md:ml-[280px] max-w-7xl">
        {livrosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {livrosFiltrados.map(livro => (
              <Card  
                key={livro.id}
                title={livro.titulo} 
                description={livro.descricao} 
                image={livro.imagem} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-20">
            <p className="text-xl sm:text-2xl text-white/80 mb-2">Nenhum livro encontrado</p>
            <p className="text-sm sm:text-base text-white/50">Tente buscar por outro termo</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Catalogo;