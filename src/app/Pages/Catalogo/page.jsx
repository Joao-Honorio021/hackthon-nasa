"use client";

import Stars from "@/app/components/Stars";
import SearchModal from "@/app/components/SearchModal";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

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
      titulo: "Parte 1",
      descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imagem: "/card.jpg",
      detailsPath: "./Video"
    },
    {
      id: 2,
      titulo: "Parte 2",
      descricao: "consectetur adipiscing elit. ",
      imagem: "/card.jpg",
      detailsPath: "/livro/2"
    },
    {
      id: 3,
      titulo: "Parte 3",
      descricao: "ryrhrhfhfh",
      imagem: "/card.jpg",
      detailsPath: "/livro/3"
    },
    {
      id: 4,
      titulo: "Parte 4",
      descricao: "O início da saga mostra a ascensão de um herói improvável",
      imagem: "/card.jpg",
      detailsPath: "/livro/4"
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

      <SearchModal
        modalAberto={modalAberto}
        setModalAberto={setModalAberto}
        busca={busca}
        setBusca={setBusca}
        livrosFiltrados={livrosFiltrados}
      />

      <main className="pt-24 sm:pt-28 pb-16 px-4 md:px-8 md:ml-[280px] max-w-7xl">
        {livrosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {livrosFiltrados.map(livro => (
              <Card  
                key={livro.id}
                title={livro.titulo} 
                description={livro.descricao} 
                image={livro.imagem}
                detailsPath={livro.detailsPath}
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