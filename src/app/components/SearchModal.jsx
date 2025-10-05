"use client";

import { useEffect, useRef } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";

const SearchModal = ({ modalAberto, setModalAberto, busca, setBusca, livrosFiltrados }) => {
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (modalAberto) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [modalAberto]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setModalAberto(false);
      }
    };

    if (modalAberto) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [modalAberto, setModalAberto]);

  const handleCardClick = (detailsPath) => {
    router.push(detailsPath);
    setModalAberto(false);
    setBusca("");
  };

  if (!modalAberto) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm"
      onClick={() => setModalAberto(false)}
    >
      <div 
        className="w-full max-w-3xl mt-20 mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-4 shadow-2xl border border-white/20">
          <div className="flex items-center gap-3">
            <FiSearch className="text-white/60" size={24} />
            <input
              ref={inputRef}
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar livros..."
              className="flex-1 bg-transparent text-white text-lg outline-none placeholder-white/50"
            />
            <button
              onClick={() => setModalAberto(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Fechar busca"
            >
              <FiX className="text-white/60" size={24} />
            </button>
          </div>
        </div>

        {/* Results */}
        {busca && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/20 max-h-[60vh] overflow-y-auto">
            {livrosFiltrados.length > 0 ? (
              <div className="space-y-2">
                {livrosFiltrados.map((livro) => (
                  <button
                    key={livro.id}
                    onClick={() => handleCardClick(livro.detailsPath)}
                    className="w-full flex items-center gap-4 p-3 hover:bg-white/10 rounded-xl transition-colors text-left group"
                  >
                    <img
                      src={livro.imagem}
                      alt={livro.titulo}
                      className="w-16 h-20 object-cover rounded-lg shadow-md"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg group-hover:text-blue-300 transition-colors">
                        {livro.titulo}
                      </h3>
                      <p className="text-white/60 text-sm line-clamp-2">
                        {livro.descricao}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-white/80 text-lg">Nenhum resultado encontrado</p>
                <p className="text-white/50 text-sm mt-1">Tente buscar por outro termo</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;