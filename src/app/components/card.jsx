// app/components/card.jsx
"use client";
import { useState } from "react";

const Card = ({ title, description, image, videoUrl, tipo }) => {
  const [modalAberto, setModalAberto] = useState(false);

  // Extrai o ID do vídeo da URL do YouTube
  const getYouTubeId = (url) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  const videoId = videoUrl ? getYouTubeId(videoUrl) : null;

  const handleAssistir = () => {
    if (tipo === "youtube" && videoUrl) {
      // Abre o vídeo do YouTube em uma nova aba
      window.open(videoUrl, "_blank");
    }
  };

  return (
    <>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
        <p className="text-white/70 text-sm mb-4">{description}</p>
        
        <div className="flex gap-2">
          {/* Botão para abrir em nova aba */}
          <button
            onClick={handleAssistir}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white text-center py-2 px-4 rounded transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
            </svg>
            YouTube
          </button>

          {/* Botão para abrir modal */}
          <button
            onClick={() => setModalAberto(true)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded transition-colors text-sm"
          >
            Assistir
          </button>
        </div>
      </div>

      {/* Modal para exibir o vídeo embedado */}
      {modalAberto && videoId && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setModalAberto(false)}
        >
          <div 
            className="bg-white rounded-lg w-full max-w-4xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalAberto(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 text-2xl z-10"
            >
              ✕
            </button>
            <div className="p-1">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title={title}
                  className="w-full h-96 rounded-t-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="p-4 border-t">
              <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
              <p className="text-gray-600 mt-2">{description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;